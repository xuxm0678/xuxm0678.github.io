import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BCNEJCVl.mjs';
import 'kleur/colors';
import { b as $$PageLayout } from '../../../chunks/PageLayout_D97eilMe.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
export { renderers } from '../../../renderers.mjs';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);
const zoneBackgroundPlugin = {
  id: "riskZones",
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;
    const y = scales["y"];
    const x0 = chartArea.left;
    const x1 = chartArea.right;
    ctx.save();
    ctx.fillStyle = "rgba(239, 68, 68, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(100), x1 - x0, y.getPixelForValue(70) - y.getPixelForValue(100));
    ctx.fillStyle = "rgba(250, 204, 21, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(70), x1 - x0, y.getPixelForValue(30) - y.getPixelForValue(70));
    ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(30), x1 - x0, y.getPixelForValue(0) - y.getPixelForValue(30));
    ctx.restore();
  }
};
Chart.register(zoneBackgroundPlugin);
const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function simulateWeek(risk) {
  let v = Math.max(0, Math.min(100, risk));
  const arr = [];
  for (let i = 0; i < 7; i++) {
    const drift = v >= 70 ? 1.3 : v >= 30 ? 0.2 : -0.4;
    const noise = (Math.random() - 0.5) * 1.2;
    v = Math.max(0, Math.min(100, v + drift + noise));
    arr.push(Math.round(v));
  }
  return arr;
}
function RiskTrendChart({ riskPct, showCaption = true }) {
  const dataPoints = useMemo(() => simulateWeek(riskPct), [riskPct]);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    animations: { tension: { duration: 900, easing: "easeOutQuart", from: 0.5, to: 0.35, loop: false } },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (v) => `${v}%`,
          stepSize: 20,
          color: "#6b7280"
        },
        grid: { color: "rgba(0,0,0,0.05)" },
        title: { display: true, text: "Risk (%)", font: { weight: "600" }, color: "#374151" }
      },
      x: { ticks: { color: "#6b7280" }, grid: { display: false } }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` Risk: ${ctx.parsed.y}%` }
      }
    },
    elements: {
      point: { radius: 0, hoverRadius: 4 },
      line: {
        borderWidth: 3,
        tension: 0.35,
        segment: {
          // ❌ 不再引 ScriptableContext；交给 TS 自动推断
          borderColor: (ctx) => {
            const y = ctx.p1?.parsed?.y ?? ctx.p0?.parsed?.y ?? 0;
            return y > 70 ? "#ef4444" : y > 30 ? "#f59e0b" : "#10b981";
          }
        }
      }
    }
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Risk %",
        data: dataPoints,
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        borderColor: "#10b981"
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(Line, { data, options }) }),
    showCaption && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-gray-500", children: "Simulated projection based on current inputs (for demo only)." }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-xs mt-2 text-gray-600", children: [
      /* @__PURE__ */ jsx("span", { children: "🟢 Low (0–30)" }),
      /* @__PURE__ */ jsx("span", { children: "🟡 Moderate (30–70)" }),
      /* @__PURE__ */ jsx("span", { children: "🔴 High (70–100)" })
    ] })
  ] });
}

function SemicircleGauge({ pct }) {
  const p = Math.min(Math.max(pct, 0), 100) / 100;
  const r = 80;
  const cx = 100;
  const cy = 100;
  const d = `M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`;
  const ref = React.useRef(null);
  const [len, setLen] = React.useState(0);
  React.useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, []);
  const offset = len * (1 - p);
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 200 120", className: "w-60 h-32 mx-auto", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "gaugeColor", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#38bdf8" }),
      /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#facc15" }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#ef4444" })
    ] }) }),
    /* @__PURE__ */ jsx(
      "path",
      {
        d,
        fill: "none",
        stroke: "#E5E7EB",
        strokeWidth: "12",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        ref,
        d,
        fill: "none",
        stroke: "url(#gaugeColor)",
        strokeWidth: "12",
        strokeLinecap: "round",
        style: {
          strokeDasharray: len || 1,
          strokeDashoffset: len ? offset : 0,
          transition: "stroke-dashoffset .6s ease"
        }
      }
    )
  ] });
}
const FEATURES = [
  {
    key: "sex",
    label: "Sex Assigned at Birth",
    type: "select",
    weight: 0.0378,
    options: [
      { label: "Female", value: "F", effect: 0 },
      { label: "Male", value: "M", effect: 0.02 }
    ]
  },
  { key: "age", label: "Age (years)", type: "range", weight: 0.1577, min: 20, max: 80, step: 1, default: 45, baseline: 40, direction: "up" },
  { key: "sleep", label: "Sleep Efficiency (%)", type: "range", weight: 0.1288, min: 60, max: 100, step: 1, default: 82, baseline: 85, direction: "down" },
  { key: "bmi", label: "Body Mass Index (BMI)", type: "range", weight: 0.1026, min: 18, max: 40, step: 0.1, default: 24, baseline: 23, direction: "up" },
  { key: "sedentary", label: "Minutes Sedentary (per day)", type: "range", weight: 0.0595, min: 0, max: 1e3, step: 10, default: 480, baseline: 420, direction: "up" },
  { key: "active", label: "Minutes Active (per day)", type: "range", weight: 0.0404, min: 0, max: 300, step: 5, default: 90, baseline: 150, direction: "down" },
  { key: "rhr", label: "Resting Heart Rate (bpm)", type: "range", weight: 0.1, min: 50, max: 110, step: 1, default: 72, baseline: 60, direction: "up" },
  { key: "hrv", label: "Heart Rate Variability (ms)", type: "range", weight: 0.08, min: 20, max: 120, step: 1, default: 55, baseline: 70, direction: "down" },
  { key: "drug", label: "Drug Abuse", type: "switch", weight: 0.3134, direction: "up" },
  { key: "alcohol", label: "Alcohol Abuse", type: "switch", weight: 0.0863, direction: "up" },
  { key: "depress", label: "Depression", type: "switch", weight: 0.0735, direction: "up" }
];
const clamp = (x, lo = 0, hi = 100) => Math.min(Math.max(x, lo), hi);
const norm = (v, a, b) => (v - a) / (b - a);
function initialState() {
  const s = {};
  for (const f of FEATURES) {
    if (f.type === "range") s[f.key] = f.default ?? (f.min + f.max) / 2;
    else if (f.type === "switch") s[f.key] = false;
    else if (f.type === "select") s[f.key] = f.options?.[0]?.value ?? "";
  }
  return s;
}
function CVDRiskFromWearablesV3() {
  const [vals, setVals] = useState(initialState());
  const [riskHistory, setRiskHistory] = useState([]);
  const set = (k, v) => setVals((p) => ({ ...p, [k]: v }));
  const { riskPct, parts, summary, advice } = useMemo(() => {
    const totalW = FEATURES.reduce((a, b) => a + b.weight, 0);
    let score = 0;
    const contributions = [];
    for (const f of FEATURES) {
      let contrib = 0;
      if (f.type === "range") {
        const v = Number(vals[f.key]);
        const v01 = norm(v, f.min, f.max);
        const base01 = norm(f.baseline ?? v, f.min, f.max);
        const riskShare = (f.direction ?? "up") === "up" ? v01 : 1 - v01;
        score += riskShare * f.weight;
        const signed = (f.direction ?? "up") === "up" ? (v01 - base01) * f.weight : (base01 - v01) * f.weight;
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
    const risk = clamp(score / totalW * 100, 1, 99);
    const toText = (c) => `${c.label} ${c.value >= 0 ? "increases" : "reduces"} risk (${c.value >= 0 ? "+" : ""}${c.value.toFixed(2)})`;
    const driversUp = contributions.filter((c) => c.value > 0).sort((a, b) => Math.abs(b.value) - Math.abs(a.value)).slice(0, 2);
    const driversDown = contributions.filter((c) => c.value < 0).sort((a, b) => Math.abs(b.value) - Math.abs(a.value)).slice(0, 2);
    const summary2 = risk > 70 ? `Your wearable/lifestyle pattern suggests **high cardiovascular risk**. Main drivers: ${driversUp.map(toText).join(", ")}.` : risk > 30 ? `Your pattern indicates **moderate cardiovascular risk**, mainly influenced by ${driversUp.slice(0, 1).map(toText)}.` : `Your profile suggests **low risk**. Protective factors include ${driversDown.slice(0, 1).map(toText)}.`;
    const adviceList = [];
    if (vals.rhr >= 75) adviceList.push("Lower resting HR with regular aerobic activity.");
    if (vals.hrv <= 50) adviceList.push("Increase HRV via stress reduction & sleep consistency.");
    if (vals.sleep <= 80) adviceList.push("Aim for 7.5+ hours sleep w/ >85% efficiency.");
    if (vals.active <= 90) adviceList.push("Add short active periods across the day.");
    if (vals.sedentary >= 600) adviceList.push("Stand or move every 45–60 minutes.");
    if (vals.alcohol) adviceList.push("Reduce alcohol intake to low-risk levels.");
    if (vals.drug) adviceList.push("Seek care to address drug use risk factor.");
    if (vals.bmi >= 27) adviceList.push("Maintain balanced nutrition to reduce BMI.");
    return { riskPct: risk, parts: contributions, summary: summary2, advice: adviceList };
  }, [vals]);
  React.useEffect(() => {
    setRiskHistory(
      (p) => p.length > 25 ? [...p.slice(1), riskPct] : [...p, riskPct]
    );
  }, [riskPct]);
  return /* @__PURE__ */ jsx("section", { className: "w-full max-w-7xl mx-auto py-10 space-y-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4 text-gray-800", children: "Adjust Lifestyle & Physiological Factors" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-5", children: FEATURES.map((f) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm font-medium text-gray-700", children: [
          /* @__PURE__ */ jsx("label", { children: f.label }),
          f.type === "range" && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: String(vals[f.key]) })
        ] }),
        f.type === "range" && /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: f.min,
            max: f.max,
            step: f.step,
            value: Number(vals[f.key]),
            onChange: (e) => set(f.key, Number(e.target.value)),
            className: "w-full slider-progress",
            style: { "--value": Number(vals[f.key]), "--min": f.min, "--max": f.max }
          }
        ),
        f.type === "switch" && /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: Boolean(vals[f.key]),
              onChange: (e) => set(f.key, e.target.checked),
              className: "accent-sky-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: Boolean(vals[f.key]) ? "Yes" : "No" })
        ] }),
        f.type === "select" && /* @__PURE__ */ jsx(
          "select",
          {
            value: String(vals[f.key]),
            onChange: (e) => set(f.key, e.target.value),
            className: "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            children: f.options?.map((o) => /* @__PURE__ */ jsx("option", { value: String(o.value), children: o.label }, String(o.value)))
          }
        )
      ] }, f.key)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4 text-gray-800", children: "Risk Overview" }),
        /* @__PURE__ */ jsx(SemicircleGauge, { pct: riskPct }),
        /* @__PURE__ */ jsxs("div", { className: "text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-400 to-amber-400 bg-clip-text text-transparent -mt-10 mb-2", children: [
          riskPct.toFixed(0),
          "%"
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `inline-block px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm ${riskPct > 70 ? "bg-red-100 text-red-700 border border-red-200" : riskPct > 30 ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : "bg-green-100 text-green-700 border border-green-200"}`,
            children: riskPct > 70 ? "High Risk" : riskPct > 30 ? "Moderate Risk" : "Low Risk"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-3", children: "Based on wearable + lifestyle inputs (prototype model)." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold mb-4 text-gray-800 flex justify-between", children: "Risk Trend (last 7 updates)" }),
        /* @__PURE__ */ jsx(RiskTrendChart, { riskPct })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold mb-4 text-gray-800", children: "Feature Contributions" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: parts.map((c) => {
          const abs = Math.abs(c.value);
          const w = Math.min(240, abs * 480);
          const isPos = c.value >= 0;
          return /* @__PURE__ */ jsxs(motion.div, { layout: true, className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-44 text-sm text-gray-700", children: c.label }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 h-3 bg-gray-100 rounded-full overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 w-px h-full bg-gray-300" }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: `absolute top-0 h-full rounded-full ${isPos ? "bg-gradient-to-r from-amber-300 to-red-500" : "bg-gradient-to-r from-sky-400 to-blue-600"}`,
                  style: {
                    width: `${w}px`,
                    left: isPos ? "50%" : `calc(50% - ${w}px)`
                  },
                  transition: { duration: 0.4 }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `w-12 text-right text-xs ${isPos ? "text-red-600" : "text-sky-600"}`,
                children: [
                  isPos ? "+" : "",
                  c.value.toFixed(2)
                ]
              }
            )
          ] }, c.label);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold mb-3 text-gray-800", children: "Personalized Summary" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed mb-4", children: summary }),
        advice.length > 0 && /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 space-y-1 text-sm text-gray-600", children: advice.map((a, i) => /* @__PURE__ */ jsx("li", { children: a }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-200 bg-gradient-to-br from-rose-50 to-orange-50 p-6 shadow-sm flex items-center gap-5", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "58",
            height: "58",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#e11d48",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-800 mb-1", children: "Why Cardiovascular Prevention Matters" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: ">80% of premature CVD is preventable through lifestyle, wearable-guided monitoring, and early behavior feedback. Small changes made today compound into a healthier decade ahead." })
        ] })
      ] })
    ] })
  ] }) });
}

const $$Demo = createComponent(($$result, $$props, $$slots) => {
  const metadata = {
    title: "Cardiovascular Risk \u2014 Interactive Demo",
    description: "An interactive visualization demonstrating a behavior-aware cardiovascular risk model prototype, allowing users to adjust lifestyle and physiological factors in real time.",
    canonical: "https://xiaomengxu.github.io/projects/cvd-risk-demo"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$PageLayout, { "metadata": metadata, "showHeader": false, "showFooter": false }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="w-full border-b border-gray-200 bg-white/70 backdrop-blur-md"> <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"> <a href="/projects" class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition">
← Back to Projects
</a> <h1 class="text-lg sm:text-xl font-semibold text-gray-800 text-center">
Cardiovascular Risk — Live Interactive Demo
</h1> <span class="text-sm text-gray-400">Xiaomeng Xu</span> </div> </header>  <section class="w-full bg-gradient-to-r from-[#f3f8ff] to-[#e9f3ff] border-y border-blue-100"> <div class="max-w-4xl mx-auto px-8 py-6 text-center"> <h2 class="text-lg font-semibold text-gray-800 mb-3">
How to Use This Demo
</h2> <p class="text-gray-700 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">
Adjust <span class="font-medium text-blue-600">lifestyle and physiological factors</span>
using the left panel. <br>
The right panel shows your <strong>risk score</strong>,
<strong>7-day trend</strong>, and <strong>adaptive prevention guidance</strong> that update
        dynamically. <br> <span class="italic text-gray-500">
This interactive visualization is for conceptual understanding only and
          does not use real clinical models or data.
</span> </p> </div> </section>  <main class="flex-1 w-full py-12 sm:py-16"> <div class="max-w-6xl mx-auto px-6"> ${renderComponent($$result2, "CVDRiskFromWearablesV2", CVDRiskFromWearablesV3, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "~/components/CVDRiskFromWearablesV2.tsx", "client:component-export": "default" })} </div> </main>  <footer class="py-8 text-center text-xs text-gray-500">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Xiaomeng “Maggie” Xu — Cardiovascular AI Demo
</footer> ` })}`;
}, "/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk/demo.astro", void 0);

const $$file = "/Users/maggiexu/xuxm0678.github.io/src/pages/projects/cvd-risk/demo.astro";
const $$url = "/projects/cvd-risk/demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Demo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
