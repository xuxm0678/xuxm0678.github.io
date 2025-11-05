import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RiskTrendChart from "./RiskTrendChart";
import HeartModelCard from "./HeartModelCard";

/* ---------- 类型 ---------- */
type VarType = "range" | "switch" | "select";
type Option = { label: string; value: number | string; effect?: number };

type Feature = {
  key: string;
  label: string;
  type: VarType;
  weight: number;
  direction?: "up" | "down";
  min?: number;
  max?: number;
  step?: number;
  default?: number;
  baseline?: number;
  options?: Option[];
};

/* ---------- 特征配置（与你之前一致） ---------- */
const FEATURES: Feature[] = [
  {
    key: "sex", label: "Sex Assigned at Birth", type: "select", weight: 0.0378,
    options: [
      { label: "Female", value: "F", effect: 0 },
      { label: "Male", value: "M", effect: 0.02 },
    ],
  },
  { key: "age", label: "Age (years)", type: "range", weight: 0.1577, min: 20, max: 80, step: 1, default: 45, baseline: 40, direction: "up" },
  { key: "sleep", label: "Sleep Efficiency (%)", type: "range", weight: 0.1288, min: 60, max: 100, step: 1, default: 82, baseline: 85, direction: "down" },
  { key: "bmi", label: "Body Mass Index (BMI)", type: "range", weight: 0.1026, min: 18, max: 40, step: 0.1, default: 24, baseline: 23, direction: "up" },
  { key: "sedentary", label: "Minutes Sedentary (per day)", type: "range", weight: 0.0595, min: 0, max: 1000, step: 10, default: 480, baseline: 420, direction: "up" },
  { key: "active", label: "Minutes Active (per day)", type: "range", weight: 0.0404, min: 0, max: 300, step: 5, default: 90, baseline: 150, direction: "down" },
  { key: "rhr", label: "Resting Heart Rate (bpm)", type: "range", weight: 0.10, min: 50, max: 110, step: 1, default: 72, baseline: 60, direction: "up" },
  { key: "hrv", label: "Heart Rate Variability (ms)", type: "range", weight: 0.08, min: 20, max: 120, step: 1, default: 55, baseline: 70, direction: "down" },
  { key: "drug", label: "Drug Abuse", type: "switch", weight: 0.3134, direction: "up" },
  { key: "alcohol", label: "Alcohol Abuse", type: "switch", weight: 0.0863, direction: "up" },
  { key: "depress", label: "Depression", type: "switch", weight: 0.0735, direction: "up" },
];

/* ---------- 工具函数 ---------- */
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
export default function CVDRiskFromWearablesV3() {
  const [vals, setVals] = useState<Record<string, any>>(initialState());
  const [riskHistory, setRiskHistory] = useState<number[]>([]);

  const set = (k: string, v: any) => setVals((p) => ({ ...p, [k]: v }));

  const { riskPct, parts, summary, advice } = useMemo(() => {
    const totalW = FEATURES.reduce((a, b) => a + b.weight, 0);
    let score = 0;
    const contributions: { label: string; value: number }[] = [];

    for (const f of FEATURES) {
      let contrib = 0;
      if (f.type === "range") {
        const v = Number(vals[f.key]);
        const v01 = norm(v, f.min!, f.max!);
        const base01 = norm(f.baseline ?? v, f.min!, f.max!);
        const riskShare = (f.direction ?? "up") === "up" ? v01 : 1 - v01;
        score += riskShare * f.weight;
        const signed =
          (f.direction ?? "up") === "up"
            ? (v01 - base01) * f.weight
            : (base01 - v01) * f.weight;
        contrib = signed;
      } else if (f.type === "switch") {
        const on = Boolean(vals[f.key]) ? 1 : 0;
        score += on * f.weight;
        contrib = on * f.weight;
      } else if (f.type === "select" && f.options) {
        const chosen = f.options.find((o) => o.value === vals[f.key]);
        const eff = chosen?.effect ?? 0;
        score += eff * f.weight;
        contrib = eff * f.weight;
      }
      contributions.push({ label: f.label, value: contrib });
    }

    const risk = clamp((score / totalW) * 100, 1, 99);

    const toText = (c: { label: string; value: number }) =>
      `${c.label} ${c.value >= 0 ? "increases" : "reduces"} risk (${
        c.value >= 0 ? "+" : ""
      }${c.value.toFixed(2)})`;

    const driversUp = contributions.filter((c) => c.value > 0).sort((a,b)=>Math.abs(b.value)-Math.abs(a.value)).slice(0,2);
    const driversDown = contributions.filter((c) => c.value < 0).sort((a,b)=>Math.abs(b.value)-Math.abs(a.value)).slice(0,2);

    const summary =
      risk > 70
        ? `Your wearable/lifestyle pattern suggests **high cardiovascular risk**. Main drivers: ${driversUp.map(toText).join(", ")}.`
        : risk > 30
        ? `Your pattern indicates **moderate cardiovascular risk**, mainly influenced by ${driversUp.slice(0,1).map(toText)}.`
        : `Your profile suggests **low risk**. Protective factors include ${driversDown.slice(0,1).map(toText)}.`;

    const adviceList: string[] = [];
    if (vals.rhr >= 75) adviceList.push("Lower resting HR with regular aerobic activity.");
    if (vals.hrv <= 50) adviceList.push("Increase HRV via stress reduction & sleep consistency.");
    if (vals.sleep <= 80) adviceList.push("Aim for 7.5+ hours sleep w/ >85% efficiency.");
    if (vals.active <= 90) adviceList.push("Add short active periods across the day.");
    if (vals.sedentary >= 600) adviceList.push("Stand or move every 45–60 minutes.");
    if (vals.alcohol) adviceList.push("Reduce alcohol intake to low-risk levels.");
    if (vals.drug) adviceList.push("Seek care to address drug use risk factor.");
    if (vals.bmi >= 27) adviceList.push("Maintain balanced nutrition to reduce BMI.");

    return { riskPct: risk, parts: contributions, summary, advice: adviceList };
  }, [vals]);

  /* ✅ 每次 risk 更新时推入历史数组（用于折线图） */
  React.useEffect(() => {
    setRiskHistory((p) =>
      p.length > 25 ? [...p.slice(1), riskPct] : [...p, riskPct]
    );
  }, [riskPct]);


  return (
    <section className="w-full max-w-7xl mx-auto py-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ✅ 左侧：控制输入面板 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Adjust Lifestyle & Physiological Factors
            </h4>

            <div className="grid grid-cols-1 gap-5">
              {FEATURES.map((f) => (
                <div key={f.key} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <label>{f.label}</label>
                    {f.type === "range" && (
                      <span className="text-xs text-gray-500">
                        {String(vals[f.key])}
                      </span>
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
                        className="accent-sky-500"
                      />
                      <span className="text-gray-600">
                        {Boolean(vals[f.key]) ? "Yes" : "No"}
                      </span>
                    </label>
                  )}

                  {f.type === "select" && (
                    <select
                      value={String(vals[f.key])}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
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
        {/* ✅ 右侧：结果展示区 */}
        <div className="lg:col-span-3 space-y-8">

          {/* ✅ 风险总览卡片 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Risk Overview</h3>

            {/* ----- 半圆仪表盘 + 数字百分比 ----- */}
            <div className="relative w-60 h-32 mx-auto mb-4">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <defs>
                  <linearGradient id="gaugeColor" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                {/* 背景弧 */}
                <path
                  d="M20,100 A80,80 0 0,1 180,100"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* 动态风险弧 */}
                {(() => {
                  const angle = Math.PI * (riskPct / 100);
                  const r = 80;
                  const cx = 100;
                  const cy = 100;
                  const startX = cx - r;
                  const startY = cy;
                  const endX = cx - r * Math.cos(angle);
                  const endY = cy - r * Math.sin(angle);
                  const largeArc = riskPct > 50 ? 1 : 0;
                  const d = `M${startX},${startY} A${r},${r} 0 ${largeArc},1 ${endX},${endY}`;

                  return (
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="url(#gaugeColor)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9 }}
                    />
                  );
                })()}
              </svg>

              {/* 百分比数字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
                  {riskPct.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* 风险等级 Badge */}
            <div
              className={`inline-block px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm ${
                riskPct > 70
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : riskPct > 30
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {riskPct > 70 ? "High Risk" : riskPct > 30 ? "Moderate Risk" : "Low Risk"}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Based on wearable + lifestyle inputs (prototype model).
            </p>
          </div>



          {/* ✅ 风险变化折线图 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-4 text-gray-800 flex justify-between">
              Risk Trend (last 30 updates)
            </h4>

            <div className="h-40">
              <Line
                data={{
                  labels: riskHistory.map((_, i) => i + 1),
                  datasets: [
                    {
                      label: "Risk %",
                      data: riskHistory,
                      borderWidth: 3,
                      fill: false,
                      tension: 0.3,
                      borderColor: (ctx) => {
                        const v = ctx?.raw ?? 0;
                        return v > 70
                          ? "#ef4444"
                          : v > 30
                          ? "#facc15"
                          : "#22c55e";
                      },
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  animation: false,
                  scales: {
                    y: { min: 0, max: 100, ticks: { stepSize: 20 } },
                  },
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>



          {/* ✅ 特征贡献 (SHAP 类似条形图) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-4 text-gray-800">
              Feature Contributions
            </h4>

            <div className="space-y-3">
              {parts.map((c) => {
                const abs = Math.abs(c.value);
                const w = Math.min(240, abs * 480);
                const isPos = c.value >= 0;
                return (
                  <motion.div key={c.label} layout className="flex items-center gap-3">
                    <div className="w-44 text-sm text-gray-700">{c.label}</div>
                    <div className="relative flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="absolute left-1/2 top-0 w-px h-full bg-gray-300" />
                      <motion.div
                        className={`absolute top-0 h-full rounded-full ${
                          isPos
                            ? "bg-gradient-to-r from-amber-300 to-red-500"
                            : "bg-gradient-to-r from-sky-400 to-blue-600"
                        }`}
                        style={{
                          width: `${w}px`,
                          left: isPos ? "50%" : `calc(50% - ${w}px)`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div
                      className={`w-12 text-right text-xs ${
                        isPos ? "text-red-600" : "text-sky-600"
                      }`}
                    >
                      {isPos ? "+" : ""}
                      {c.value.toFixed(2)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* ✅ Summary & Lifestyle Advice */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="text-base font-semibold mb-3 text-gray-800">
              Personalized Summary
            </h4>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">{summary}</p>

            {advice.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {advice.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}
          </div>

          {/* ✅ Health Importance Card */}
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-rose-50 to-orange-50 p-6 shadow-sm flex items-center gap-5">
            {/* 心脏图标 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="58"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e11d48"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>

            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">
                Why Cardiovascular Prevention Matters
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                >80% of premature CVD is preventable through lifestyle, wearable-guided monitoring,
                and early behavior feedback. Small changes made today compound into a healthier
                decade ahead.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
