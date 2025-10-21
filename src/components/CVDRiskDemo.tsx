import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ========= 可配置特征（按你给的 XGBoost 重要性，并补充 RHR/HRV） ========= */
type VarType = "range" | "switch" | "select";
type Option = { label: string; value: number | string; effect?: number };

type Feature = {
  key: string;
  label: string;
  type: VarType;
  weight: number;                 // 重要性权重
  direction?: "up" | "down";      // up: 值↑→风险↑；down: 值↑→风险↓
  min?: number; max?: number; step?: number; default?: number;
  baseline?: number;              // 用于贡献可视化中心点
  options?: Option[];             // select 用
};

const FEATURES: Feature[] = [
  { key: "drug",     label: "Drug Abuse",                      type: "switch", weight: 0.3134, direction: "up" },
  { key: "age",      label: "Age (years)",                     type: "range",  weight: 0.1577, min: 20,  max: 80,  step: 1,   default: 45, baseline: 40, direction: "up" },
  { key: "sleep",    label: "Sleep Efficiency (%)",            type: "range",  weight: 0.1288, min: 60,  max: 100, step: 1,   default: 82, baseline: 85, direction: "down" },
  { key: "bmi",      label: "Body Mass Index (BMI)",           type: "range",  weight: 0.1026, min: 18,  max: 40,  step: 0.1, default: 24, baseline: 23, direction: "up" },
  { key: "alcohol",  label: "Alcohol Abuse",                   type: "switch", weight: 0.0863, direction: "up" },
  { key: "depress",  label: "Depression",                      type: "switch", weight: 0.0735, direction: "up" },
  { key: "sedentary",label: "Minutes Sedentary (per day)",     type: "range",  weight: 0.0595, min: 0,   max: 1000,step: 10,  default: 480,baseline: 420, direction: "up" },
  { key: "active",   label: "Minutes Active (per day)",        type: "range",  weight: 0.0404, min: 0,   max: 300, step: 5,   default: 90, baseline: 150, direction: "down" },
  { key: "sex",      label: "Sex Assigned at Birth",           type: "select", weight: 0.0378,
    options: [
      { label: "Female", value: "F", effect: 0 },
      { label: "Male",   value: "M", effect: 0.02 }, // 男性略高风险（仅展示用途）
    ],
  },
  // 可穿戴扩展（你要求的）
  { key: "rhr",      label: "Resting Heart Rate (bpm)",        type: "range",  weight: 0.10,   min: 50,  max: 110, step: 1, default: 72, baseline: 60, direction: "up" },
  { key: "hrv",      label: "Heart Rate Variability (ms)",     type: "range",  weight: 0.08,   min: 20,  max: 120, step: 1, default: 55, baseline: 70, direction: "down" },
];

/** ========= 工具 ========= */
const clamp = (x: number, lo = 0, hi = 100) => Math.min(Math.max(x, lo), hi);
const norm = (v: number, a: number, b: number) => (v - a) / (b - a);

function initialState() {
  const s: Record<string, any> = {};
  for (const f of FEATURES) {
    if (f.type === "range") s[f.key] = f.default ?? (f.min! + f.max!) / 2;
    else if (f.type === "switch") s[f.key] = false;
    else if (f.type === "select") s[f.key] = f.options?.[0]?.value ?? "";
  }
  return s;
}

/** ========= 主组件 ========= */
export default function CVDRiskFromWearables() {
  const [vals, setVals] = useState<Record<string, any>>(initialState());

  const set = (k: string, v: any) => setVals((p) => ({ ...p, [k]: v }));

  const { riskPct, parts, topDrivers, summary, advice } = useMemo(() => {
    const totalW = FEATURES.reduce((a, b) => a + b.weight, 0);
    let score = 0;
    const contributions: { label: string; value: number }[] = [];

    for (const f of FEATURES) {
      let contrib = 0;
      if (f.type === "range") {
        const v = Number(vals[f.key]);
        const v01 = norm(v, f.min!, f.max!);
        const base01 = norm(f.baseline ?? v, f.min!, f.max!);
        // 方向：up=高值更危险；down=高值更保护
        const riskShare = (f.direction ?? "up") === "up" ? v01 : 1 - v01;
        score += riskShare * f.weight;

        // 贡献(相对baseline，正=提风险，负=降风险)
        const signed = (f.direction ?? "up") === "up"
          ? (v01 - base01) * f.weight
          : (base01 - v01) * f.weight;
        contrib = signed;
      } else if (f.type === "switch") {
        const on = Boolean(vals[f.key]);
        const v = on ? 1 : 0;
        score += v * f.weight;
        contrib = (on ? 1 : 0) * f.weight;
      } else if (f.type === "select" && f.options) {
        const chosen = f.options.find((o) => o.value === vals[f.key]);
        const eff = chosen?.effect ?? 0;
        // 让 effect 以权重大致缩放，保持整体量纲
        score += (eff + 0.0) * f.weight;
        contrib = (eff + 0.0) * f.weight;
      }
      contributions.push({ label: f.label, value: contrib });
    }

    const risk = clamp((score / totalW) * 100, 1, 99);

    // 排名前 2 的驱动因素（绝对贡献）
    const drivers = [...contributions]
      .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
      .slice(0, 2);

    // Summary 与建议（根据主要驱动生成）
    const toText = (c: { label: string; value: number }) =>
      `${c.label} ${c.value >= 0 ? "increases" : "reduces"} risk (${c.value >= 0 ? "+" : ""}${c.value.toFixed(2)})`;

    const summary =
      risk > 70
        ? `Your wearable/lifestyle pattern suggests **high cardiovascular risk**. Key drivers: ${toText(drivers[0])}${drivers[1] ? `, ${toText(drivers[1])}` : ""}.`
        : risk > 30
        ? `Your pattern indicates **moderate risk**. Influenced mainly by ${toText(drivers[0])}${drivers[1] ? ` and ${toText(drivers[1])}` : ""}.`
        : `Your current profile suggests **low risk**. Protective factors include ${toText(drivers[0])}${drivers[1] ? ` and ${toText(drivers[1])}` : ""}.`;

    const adviceList: string[] = [];
    if (vals.rhr >= 75) adviceList.push("Gradually improve cardiorespiratory fitness to lower resting HR (e.g., 150–300 min/week moderate activity).");
    if (vals.hrv <= 50) adviceList.push("Increase HRV via sleep hygiene, stress reduction, and regular light-to-moderate exercise.");
    if (vals.sleep <= 80) adviceList.push("Aim for consistent bed/wake schedule and improve sleep efficiency.");
    if (vals.active <= 90) adviceList.push("Add more active minutes; micro-bouts (5–10 min) across the day help.");
    if (vals.sedentary >= 600) adviceList.push("Break up long sitting time—stand or walk 2–3 minutes every 30–60 minutes.");
    if (vals.alcohol) adviceList.push("Reduce alcohol intake to low-risk levels.");
    if (vals.drug) adviceList.push("Seek professional support to stop substance use.");
    if (vals.bmi >= 27) adviceList.push("Consider nutrition planning to reach a healthy BMI range.");

    return {
      riskPct: risk,
      parts: contributions,
      topDrivers: drivers,
      summary,
      advice: adviceList,
    };
  }, [vals]);

  // 风格：Apple Health 蓝调
  const gaugeColor =
    riskPct > 70 ? "from-red-500 to-orange-400" : riskPct > 30 ? "from-amber-400 to-yellow-400" : "from-sky-500 to-emerald-400";

  return (
    <section className="w-full">
      {/* 布局：上窄下宽（移动端）；md 以上左右分栏 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* 左侧：交互 + 仪表盘 */}
        <div className="space-y-6">
          {/* 仪表盘 */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-100">Cardiovascular Risk</h3>

            <div className="flex items-center justify-center py-4">
              {/* 简洁 SVG 半圆仪表盘 */}
              <div className="relative w-64 h-36">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  {/* 背景弧 */}
                  <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
                  {/* 彩色弧 */}
                  <defs>
                    <linearGradient id="gauge" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor={riskPct > 70 ? "#f97316" : riskPct > 30 ? "#f59e0b" : "#10b981"} />
                    </linearGradient>
                  </defs>
                  {/* 根据风险百分比映射 0-180度 → 0-π 弧长 */}
                  {(() => {
                    const angle = Math.PI * (riskPct / 100);
                    const r = 40, cx = 50, cy = 50;
                    const x = cx + r * Math.cos(Math.PI - angle);
                    const y = cy - r * Math.sin(Math.PI - angle);
                    const largeArc = riskPct > 50 ? 1 : 0;
                    const d = `M${cx - r},${cy} A${r},${r} 0 ${largeArc},1 ${x},${y}`;
                    return <path d={d} fill="none" stroke="url(#gauge)" strokeWidth="8" strokeLinecap="round" />;
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={riskPct}
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className={`bg-gradient-to-r ${gaugeColor} text-white rounded-xl px-4 py-2 text-2xl font-bold shadow`}
                    >
                      {riskPct.toFixed(0)}%
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Based on wearable & lifestyle patterns. Educational prototype — not clinical advice.
            </p>
          </div>

          {/* 交互控件（分组：行为/生理） */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-3">Adjust Wearable & Lifestyle Factors</h4>
            <div className="grid grid-cols-1 gap-5">
              {FEATURES.map((f) => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">{f.label}</label>
                    {f.type === "range" && (
                      <span className="text-xs text-slate-500">{String(vals[f.key])}</span>
                    )}
                  </div>

                  {f.type === "range" && (
                    <input
                      type="range"
                      min={f.min}
                      max={f.max}
                      step={f.step}
                      value={Number(vals[f.key])}
                      onChange={(e) => set(f.key, Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  )}

                  {f.type === "switch" && (
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(vals[f.key])}
                        onChange={(e) => set(f.key, e.target.checked)}
                      />
                      <span className="text-slate-600 dark:text-slate-300">{Boolean(vals[f.key]) ? "Yes" : "No"}</span>
                    </label>
                  )}

                  {f.type === "select" && (
                    <select
                      value={String(vals[f.key])}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                    >
                      {f.options?.map((o) => (
                        <option key={String(o.value)} value={String(o.value)}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：解释图 + 文本总结 */}
        <div className="space-y-6">
          {/* SHAP-like 条形图（对称，蓝=保护，橙红=增加风险） */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-4">Feature Contributions</h4>

            <div className="space-y-3">
              {parts.map((c) => {
                const abs = Math.abs(c.value);
                const w = Math.min(260, abs * 480); // 视觉缩放
                const isPos = c.value >= 0;
                return (
                  <motion.div key={c.label} layout className="flex items-center gap-3">
                    <div className="w-48 text-sm text-slate-700 dark:text-slate-300">{c.label}</div>
                    <div className="relative flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      {/* 中线 */}
                      <div className="absolute left-1/2 top-0 w-px h-full bg-slate-400/60" />
                      {/* 动态条 */}
                      <motion.div
                        className={`absolute top-0 h-full rounded-full ${isPos ? "bg-gradient-to-r from-amber-300 to-red-500" : "bg-gradient-to-r from-sky-400 to-blue-600"}`}
                        style={{ width: `${w}px`, left: isPos ? "50%" : `calc(50% - ${w}px)` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className={`w-14 text-right text-xs ${isPos ? "text-red-600" : "text-sky-600"}`}>
                      {c.value >= 0 ? "+" : ""}{c.value.toFixed(2)}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-center text-slate-500">
              Blue bars indicate protective factors; orange/red increase risk relative to a baseline.
            </p>
          </div>

          {/* Summary & 建议 */}
          <div className="rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-2">Personalized Summary</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {summary}
            </p>

            {advice.length > 0 && (
              <>
                <h5 className="text-sm font-semibold mt-4 mb-2">Actionable Suggestions</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                  {advice.map((a, i) => (<li key={i}>{a}</li>))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
