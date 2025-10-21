import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";

const CVDRiskDemo: React.FC = () => {
  const [age, setAge] = useState(45);
  const [restingHR, setRestingHR] = useState(72);
  const [sleepEff, setSleepEff] = useState(82);
  const [activity, setActivity] = useState(150);
  const [diabetes, setDiabetes] = useState(false);
  const [hypertension, setHypertension] = useState(false);

  // 模拟“模型风险计算”逻辑
  const calculateRisk = () => {
    let base = 5 + (age - 30) * 0.5 + (restingHR - 60) * 0.2;
    base -= (sleepEff - 70) * 0.3 + (activity / 30) * 0.2;
    if (diabetes) base += 10;
    if (hypertension) base += 7;
    return Math.min(Math.max(base, 1), 99);
  };

  const risk = calculateRisk();
  const shapValues = [
    { name: "Age", value: (age - 30) * 0.5 },
    { name: "Resting HR", value: (restingHR - 60) * 0.2 },
    { name: "Sleep Efficiency", value: -(sleepEff - 70) * 0.3 },
    { name: "Weekly Activity", value: -(activity / 30) * 0.2 },
    { name: "Diabetes", value: diabetes ? 10 : 0 },
    { name: "Hypertension", value: hypertension ? 7 : 0 },
  ];

  return (
    <Card className="max-w-3xl mx-auto p-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Interactive Cardiovascular Risk Demo
      </h2>

      <CardContent className="space-y-5">
        {/* Inputs */}
        <div>
          <label className="block font-medium">Age: {age} years</label>
          <input
            type="range"
            min="20"
            max="80"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Resting Heart Rate: {restingHR} bpm</label>
          <input
            type="range"
            min="50"
            max="100"
            value={restingHR}
            onChange={(e) => setRestingHR(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Sleep Efficiency: {sleepEff}%</label>
          <input
            type="range"
            min="60"
            max="100"
            value={sleepEff}
            onChange={(e) => setSleepEff(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium">Weekly Activity: {activity} min</label>
          <input
            type="range"
            min="0"
            max="600"
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="flex justify-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={diabetes}
              onChange={(e) => setDiabetes(e.target.checked)}
            />
            Diabetes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hypertension}
              onChange={(e) => setHypertension(e.target.checked)}
            />
            Hypertension
          </label>
        </div>

        {/* Output */}
        <div className="text-center mt-6">
          <h3 className="text-4xl font-bold text-blue-600">{risk.toFixed(1)}%</h3>
          <p className="text-gray-600">Estimated CVD Risk</p>
          <p className={risk > 30 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
            {risk > 30 ? "High Risk" : "Low Risk"}
          </p>
        </div>

        {/* SHAP explanation */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2 text-center">Feature Contributions (SHAP-like)</h4>
          <div className="space-y-2">
            {shapValues.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="w-32 text-sm">{s.name}</div>
                <div
                  className={`h-3 rounded-full transition-all ${
                    s.value >= 0 ? "bg-red-400" : "bg-green-400"
                  }`}
                  style={{ width: `${Math.abs(s.value) * 5}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVDRiskDemo;
