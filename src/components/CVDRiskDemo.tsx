import React, { useMemo, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// 通用特征定义
type VarType = "range" | "switch" | "select";
type Option = { value: string | number; label: string; effect?: number };

type FeatureDef = {
  key: string;
  label: string;
  type: VarType;
  min?: number;
  max?: number;
  step?: number;
  default: number | boolean | string;
  options?: Option[];
  baseline?: number;
  weight?: number;
  effectIfTrue?: number;
};

// 这里替换为你的 PDF 模型 + SHAP 变量
const FEATURES: FeatureDef[] = [
  { key: "resting_hr", label: "Resting Heart Rate (0–1 normalized)", type: "range", min: 0, max: 1, step: 0.01, default: 0.6, baseline: 0.5, weight: 0.3 },
  { key: "chf", label: "Congestive Heart Failure (CHF)", type: "switch", default: false, effectIfTrue: 0.4 },
  { key: "diabetes", label: "Diabetes", type: "switch", default: false, effectIfTrue: 0.2 },
  { key: "hypertension", label: "Hypertension", type: "switch", default: false, effectIfTrue: 0.1 },
  { key: "alcohol", label: "Alcohol Abuse", type: "switch", default: false, effectIfTrue: 0.25 },
  { key: "obesity", label: "Obesity", type: "switch", default: false, effectIfTrue: 0.15 },
  { key: "age", label: "Age (years)", type: "range", min: 18, max: 90, step: 1, default: 45, baseline: 45, weight: -0.002 },
];

// clamp 辅助函数
const clamp = (x: number, lo = 1, hi = 99) => Math.min(Math.max(x, lo), hi);

function initialStateFromFeatures(defs: FeatureDef[]) {
  const obj: Record<string, any> = {};
  defs.forEach((f) => (obj[f.key] = f.default));
  return obj;
}

export default function CVDRiskDemoPro() {
  const [values, setValues] = useState<Record<string, any>>(initialStateFromFeatures(FEATURES));
  const setValue = (key: string, v: any) => setValues((prev) => ({ ...prev, [key]: v }));

  const { risk, contributions } = useMemo(() => {
    const parts: { label: string; value: number }[] = [];
    let sum = 5;
    for (const f of FEATURES) {
      let c = 0;
      if (f.type === "range") {
        const v = Number(values[f.key]);
        const base = f.baseline ?? v;
        c = (f.weight ?? 0) * (v - base);
      } else if (f.type === "switch") {
        c = Boolean(values[f.key]) ? (f.effectIfTrue ?? 0) : 0;
      } else if (f.type === "select" && f.options) {
        const chosen = f.options.find((o) => o.value === values[f.key]);
        c = chosen?.effect ?? 0;
      }
      parts.push({ label: f.label, value: c });
      sum += c;
    }
    return { risk: clamp(sum * 20), contributions: parts };
  }, [values]);

  const riskLabel = risk > 70 ? "High Risk" : risk > 30 ? "Moderate Risk" : "Low Risk";
  const riskColor =
    risk > 70
      ? "from-red-500 to-orange-400"
      : risk > 30
      ? "from-yellow-400 to-amber-500"
      : "from-emerald-400 to-sky-500";

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 rounded-2xl">
      <h3 className="text-2xl font-semibold text-center mb-2">
        Cardiovascular Risk Interactive Dashboard
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">
        Adjust variables to explore how physiological and lifestyle factors affect cardiovascular risk.
      </p>

      <CardContent className="space-y-8">
        {/* 🧩 动态输入控件 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.key}>
              <label className="block font-medium mb-1">{f.label}</label>

              {f.type === "range" && (
                <>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={Number(values[f.key])}
                    onChange={(e) => setValue(f.key, Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">{String(values[f.key])}</div>
                </>
              )}

              {f.type === "switch" && (
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(values[f.key])}
                    onChange={(e) => setValue(f.key, e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Yes / No</span>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* 🧮 动态风险展示 */}
        <div className="text-center space-y-2 pt-4">
          <div className="text-gray-500 text-sm">Estimated Risk Probability</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={risk}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-gradient-to-r ${riskColor} inline-block px-8 py-3 rounded-2xl text-4xl font-bold text-white shadow-md`}
            >
              {risk.toFixed(0)}%
            </motion.div>
          </AnimatePresence>
          <div className="font-semibold text-sm">{riskLabel}</div>
        </div>

        {/* 📊 动态解释条形图 */}
        <div className="pt-10">
          <h4 className="text-lg font-semibold mb-4 text-center">Feature Contributions (SHAP-like)</h4>
          <div className="space-y-3">
            {contributions.map((c, idx) => {
              const abs = Math.abs(c.value);
              const w = Math.min(abs * 120, 240);
              const isPos = c.value > 0;
              const barColor = isPos
                ? "bg-gradient-to-r from-orange-300 to-red-500"
                : "bg-gradient-to-r from-sky-400 to-blue-600";

              return (
                <motion.div
                  key={c.label}
                  layout
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="w-40 text-sm text-gray-700 dark:text-gray-300">{c.label}</div>
                  <div className="flex-1 relative h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute top-0 h-full rounded-full ${barColor}`}
                      style={{
                        width: `${w}px`,
                        left: isPos ? "50%" : `calc(50% - ${w}px)`,
                      }}
                      animate={{ width: `${w}px` }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-400 opacity-50"></div>
                  </div>
                  <div
                    className={`w-12 text-right text-xs ${
                      isPos ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {c.value >= 0 ? "+" : ""}
                    {c.value.toFixed(2)}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Blue bars indicate protective factors; red/orange indicate risk-increasing factors.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
