import React, { useState, useMemo } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";

type Bool = 0 | 1;

interface Inputs {
  age: number;
  rhr: number;
  sleep: number;
  activity: number;
  alcohol: Bool;
  diabetes: Bool;
  hypertension: Bool;
}

// 简化版风险计算函数
function predict(x: Inputs) {
  const z =
    -2 +
    0.05 * (x.age - 40) +
    0.04 * (x.rhr - 70) -
    0.03 * (x.sleep - 80) -
    0.02 * (x.activity - 150) +
    0.8 * x.alcohol +
    0.9 * x.diabetes +
    0.6 * x.hypertension;

  const prob = 1 / (1 + Math.exp(-z));
  return Math.min(Math.max(prob, 0), 1);
}

export default function CVDRiskDemo() {
  const [x, setX] = useState<Inputs>({
    age: 45,
    rhr: 72,
    sleep: 82,
    activity: 150,
    alcohol: 0,
    diabetes: 0,
    hypertension: 0,
  });

  const prob = useMemo(() => predict(x), [x]);
  const risk =
    prob >= 0.7
      ? { label: "High", color: "bg-red-500" }
      : prob >= 0.3
      ? { label: "Moderate", color: "bg-amber-500" }
      : { label: "Low", color: "bg-emerald-500" };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-2">
            Cardiovascular Risk Demo
          </h2>

          <p className="text-sm text-muted-foreground mb-4">
            Adjust lifestyle and physiological parameters to see how risk
            changes. (Demo only — not clinical.)
          </p>

          {/* 输入区域 */}
          <div className="space-y-4">
            <div>
              <Label>Age: {x.age} years</Label>
              <Slider
                value={[x.age]}
                min={18}
                max={85}
                step={1}
                onValueChange={(v) => setX({ ...x, age: v[0] })}
              />
            </div>

            <div>
              <Label>Resting Heart Rate: {x.rhr} bpm</Label>
              <Slider
                value={[x.rhr]}
                min={50}
                max={110}
                step={1}
                onValueChange={(v) => setX({ ...x, rhr: v[0] })}
              />
            </div>

            <div>
              <Label>Sleep Efficiency: {x.sleep}%</Label>
              <Slider
                value={[x.sleep]}
                min={50}
                max={100}
                step={1}
                onValueChange={(v) => setX({ ...x, sleep: v[0] })}
              />
            </div>

            <div>
              <Label>Weekly Activity: {x.activity} min</Label>
              <Slider
                value={[x.activity]}
                min={0}
                max={400}
                step={10}
                onValueChange={(v) => setX({ ...x, activity: v[0] })}
              />
            </div>

            {/* 开关项 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                { key: "alcohol", label: "Alcohol" },
                { key: "diabetes", label: "Diabetes" },
                { key: "hypertension", label: "Hypertension" },
              ].map((f) => (
                <div key={f.key} className="flex items-center justify-between">
                  <Label>{f.label}</Label>
                  <Switch
                    checked={Boolean(x[f.key as keyof Inputs])}
                    onCheckedChange={(v) =>
                      setX({ ...x, [f.key]: v ? 1 : 0 } as Inputs)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 输出区域 */}
          <div className="text-center border-t pt-6 mt-6">
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Risk Probability
            </p>
            <div className="text-5xl font-bold mb-2">
              {(prob * 100).toFixed(0)}%
            </div>
            <div className="inline-flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${risk.color}`}
              ></span>
              <span className="text-lg font-medium">{risk.label} Risk</span>
            </div>
          </div>

          {/* 示例按钮 */}
          <div className="flex justify-center gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() =>
                setX({
                  age: 30,
                  rhr: 60,
                  sleep: 90,
                  activity: 200,
                  alcohol: 0,
                  diabetes: 0,
                  hypertension: 0,
                })
              }
            >
              Low-Risk Example
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                setX({
                  age: 65,
                  rhr: 88,
                  sleep: 65,
                  activity: 50,
                  alcohol: 1,
                  diabetes: 1,
                  hypertension: 1,
                })
              }
            >
              High-Risk Example
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
