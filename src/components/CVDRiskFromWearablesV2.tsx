import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------
   🔍 FEATURE CONFIG (Same logic as before)
------------------------------------------- */
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
  { key: "sedentary", label: "Sedentary Minutes / day", type: "range", weight: 0.0595, min: 0, max: 1000, step: 10, default: 480, baseline: 420, direction: "up" },
  { key: "active", label: "Active Minutes / day", type: "range", weight: 0.0404, min: 0, max: 300, step: 5, default: 90, baseline: 150, direction: "down" },
  { key: "rhr", label: "Resting Heart Rate (bpm)", type: "range", weight: 0.10, min: 50, max: 110, step: 1, default: 72, baseline: 60, direction: "up" },
  { key: "hrv", label: "HRV (ms)", type: "range", weight: 0.08, min: 20, max: 120, step: 1, default: 55, baseline: 70, direction: "down" },
  { key: "drug", label: "Drug Abuse", type: "switch", weight: 0.3134, direction: "up" },
  { key: "alcohol", label: "Alcohol Abuse", type: "switch", weight: 0.0863, direction: "up" },
  { key: "depress", label: "Depression", type: "switch", weight: 0.0735, direction: "up" },
];

/* ---------- UTIL ---------- */
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

/* ------------------------------------------
   ✅  NEW PREMIUM UI IMPLEMENTATION
------------------------------------------- */
export default function CVDRiskFromWearablesV2() {
  const [vals, setVals] = useState<Record<string, any>>(initialState());
  const [panelOpen, setPanelOpen] = useState(false);

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
        ? `Your wearable/lifestyle pattern suggests **high risk**. Key drivers: ${driversUp.map(toText).join(", ")}.`
        : risk > 30
        ? `Your pattern indicates **moderate risk**. Influenced mainly by ${driversUp.slice(0,1).map(toText)}.`
        : `Your profile suggests **low risk**. Protective factors include ${driversDown.slice(0,1).map(toText)}.`;

    const adviceList: string[] = [];
    if (vals.rhr >= 75) adviceList.push("Lower resting HR with regular aerobic activity.");
    if (vals.hrv <= 50) adviceList.push("Increase HRV via deep sleep + stress reduction.");
    if (vals.sleep <= 80) adviceList.push("Aim for sleep efficiency >85% with better schedule.");
    if (vals.active <= 90) adviceList.push("Increase active minutes to reduce inflammation load.");
    if (vals.sedentary >= 600) adviceList.push("Break up long sitting every 30–60 minutes.");
    if (vals.alcohol) adviceList.push("Reduce alcohol intake to low-risk levels.");
    if (vals.drug) adviceList.push("Seek professional support to stop substance use.");
    if (vals.bmi >= 27) adviceList.push("Optimize nutrition toward a healthy BMI.");

    return { riskPct: risk, parts: contributions, summary, advice: adviceList };
  }, [vals]);

  const riskColor =
    riskPct > 70 ? "red" : riskPct > 30 ? "yellow" : "green";

  /* ------------------------------------------
      ✅ UI
  ------------------------------------------- */
  return (
    <div className="relative w-full flex flex-col items-center">

      {/* ========================= */}
      {/*  MAIN RISK DIAL DISPLAY   */}
      {/* ========================= */}
      <div className="mb-10 flex flex-col items-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* bg circle */}
            <circle cx="100" cy="100" r="85" stroke="#e5e7eb" strokeWidth="12" fill="none" />
            {/* dynamic arc */}
            <motion.circle
              cx="100"
              cy="100"
              r="85"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              stroke={`url(#grad-${riskColor})`}
              strokeDasharray={540}
              strokeDashoffset={540 - (540 * riskPct) / 100}
              transition={{ duration: 0.8 }}
            />
            <defs>
              <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>

          {/* number */}
          <motion.div
            key={riskPct}
            className="absolute text-5xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {riskPct.toFixed(0)}%
          </motion.div>
        </div>

        {/* level tag */}
        <div
          className={`mt-3 px-4 py-1.5 text-sm font-semibold rounded-lg border shadow-sm ${
            riskPct > 70
              ? "bg-red-50 text-red-700 border-red-200"
              : riskPct > 30
              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
          {riskPct > 70 ? "High Risk" : riskPct > 30 ? "Moderate Risk" : "Low Risk"}
        </div>
      </div>

      {/* ========================= */}
      {/*   KEY DRIVER CONTRIBUTIONS */}
      {/* ========================= */}
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Key Drivers</h3>

        <div className="space-y-3">
          {parts.slice(0, 6).map((c) => {
            const abs = Math.abs(c.value);
            const width = Math.min(240, abs * 480);
            const pos = c.value >= 0;

            return (
              <div key={c.label} className="flex items-center gap-3">
                <div className="w-36 text-sm text-gray-600">{c.label}</div>
                <div className="relative flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute top-0 h-full rounded-full ${
                      pos ? "bg-gradient-to-r from-yellow-300 to-red-500" : "bg-gradient-to-r from-sky-400 to-blue-600"
                    }`}
                    style={{
                      width: `${width}px`,
                      left: pos ? "0%" : `calc(100% - ${width}px)`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className={`w-12 text-right text-xs ${pos ? "text-red-600" : "text-sky-600"}`}>
                  {pos ? "+" : ""}
                  {c.value.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================= */}
      {/*   AI SUMMARY + ADVICE CARD */}
      {/* ========================= */}
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-16">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">AI-Generated Summary</h3>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />

        {advice.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {advice.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ========================= */}
      {/*  FLOATING CONTROL BUTTON  */}
      {/* ========================= */}
      <button
        onClick={() => setPanelOpen(true)}
        className="fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg bg-white border border-gray-300 text-sm font-semibold hover:shadow-xl transition"
      >
        ⚙️ Adjust Factors
      </button>

      {/* ========================= */}
      {/*   SLIDEOVER CONTROL PANEL  */}
      {/* ========================= */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 w-[360px] h-full bg-white border-l border-gray-200 shadow-xl p-6 overflow-y-auto z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Adjust Inputs</h3>
              <button onClick={() => setPanelOpen(false)} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {FEATURES.map((f) => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">{f.label}</label>
                    {f.type === "range" && (
                      <span className="text-xs text-gray-500">{String(vals[f.key])}</span>
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
                      <span className="text-gray-600">{Boolean(vals[f.key]) ? "Yes" : "No"}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
