// src/components/RiskTrendChart.tsx
import React, { useMemo } from "react";
import {
  // ✅ 这些是运行时需要的实体（正常 import）
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
// ✅ 这些是“类型”，只能用 type-only import（编译时存在，运行时会被擦除）
import type {
  ChartOptions,
  LinearScale as LinearScaleType,
} from "chart.js";

import { Line } from "react-chartjs-2";

// ✅ 注册 ChartJS 组件 & 插件
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

/* ✅ 背景风险区颜色插件（v4 兼容） */
const zoneBackgroundPlugin = {
  id: "riskZones",
  beforeDraw: (chart: ChartJS) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;

    const y = scales["y"] as LinearScaleType;
    const x0 = chartArea.left;
    const x1 = chartArea.right;

    ctx.save();

    // 红色风险区 (70–100)
    ctx.fillStyle = "rgba(239, 68, 68, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(100), x1 - x0, y.getPixelForValue(70) - y.getPixelForValue(100));

    // 黄色风险区 (30–70)
    ctx.fillStyle = "rgba(250, 204, 21, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(70), x1 - x0, y.getPixelForValue(30) - y.getPixelForValue(70));

    // 绿色风险区 (0–30)
    ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
    ctx.fillRect(x0, y.getPixelForValue(30), x1 - x0, y.getPixelForValue(0) - y.getPixelForValue(30));

    ctx.restore();
  },
};

ChartJS.register(zoneBackgroundPlugin);

export type RiskTrendChartProps = {
  riskPct: number;
  showCaption?: boolean;
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ✅ 生成模拟一周趋势（仅展示） */
function simulateWeek(risk: number) {
  let v = Math.max(0, Math.min(100, risk));
  const arr: number[] = [];
  for (let i = 0; i < 7; i++) {
    const drift = v >= 70 ? 1.3 : v >= 30 ? 0.2 : -0.4;
    const noise = (Math.random() - 0.5) * 1.2;
    v = Math.max(0, Math.min(100, v + drift + noise));
    arr.push(Math.round(v));
  }
  return arr;
}

export default function RiskTrendChart({ riskPct, showCaption = true }: RiskTrendChartProps) {
  const dataPoints = useMemo(() => simulateWeek(riskPct), [riskPct]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    animations: { tension: { duration: 900, easing: "easeOutQuart", from: 0.5, to: 0.35, loop: false } },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (v: number | string) => `${v}%`,
          stepSize: 20,
          color: "#6b7280",
        },
        grid: { color: "rgba(0,0,0,0.05)" },
        title: { display: true, text: "Risk (%)", font: { weight: "600" }, color: "#374151" },
      },
      x: { ticks: { color: "#6b7280" }, grid: { display: false } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` Risk: ${ctx.parsed.y}%` },
      },
    },
    elements: {
      point: { radius: 0, hoverRadius: 4 },
      line: {
        borderWidth: 3,
        tension: 0.35,
        segment: {
          // ❌ 不再引 ScriptableContext；交给 TS 自动推断
          borderColor: (ctx) => {
            const y = (ctx as any).p1?.parsed?.y ?? (ctx as any).p0?.parsed?.y ?? 0;
            return y > 70 ? "#ef4444" : y > 30 ? "#f59e0b" : "#10b981";
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Risk %",
        data: dataPoints,
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.08)",
        borderColor: "#10b981",
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="h-64">
        <Line data={data} options={options} />
      </div>

      {showCaption && (
        <p className="mt-2 text-xs text-gray-500">
          Simulated projection based on current inputs (for demo only).
        </p>
      )}

      {/* ✅ 图例 */}
      <div className="flex gap-4 text-xs mt-2 text-gray-600">
        <span>🟢 Low (0–30)</span>
        <span>🟡 Moderate (30–70)</span>
        <span>🔴 High (70–100)</span>
      </div>
    </div>
  );
}
