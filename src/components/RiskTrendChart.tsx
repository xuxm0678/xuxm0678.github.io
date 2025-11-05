import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

type Props = {
  riskPct: number; // current live risk value passed from parent
};

export default function RiskTrendChart({ riskPct }: Props) {
  const [data, setData] = useState<{ t: number; r: number }[]>([]);

  // 每次 riskPct 变化 → 推入折线数据
  useEffect(() => {
    setData((prev) => {
      const next = [...prev, { t: prev.length + 1, r: riskPct }];
      return next.slice(-20); // 仅保留最近 20 个点
    });
  }, [riskPct]);

  return (
    <div className="w-full h-48 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <p className="text-sm font-medium text-gray-700 mb-2">Risk Trend (last updates)</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* ✅ 颜色分区：绿 / 黄 / 红 */}
          <ReferenceArea y1={0} y2={30} fill="#d1fae5" stroke="none" />
          <ReferenceArea y1={30} y2={70} fill="#fef9c3" stroke="none" />
          <ReferenceArea y1={70} y2={100} fill="#fee2e2" stroke="none" />

          <XAxis dataKey="t" hide />
          <YAxis domain={[0, 100]} hide />

          <Tooltip
            formatter={(v: number) => [`${v.toFixed(0)}%`, "Risk"]}
            contentStyle={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="r"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
