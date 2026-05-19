"use client";

/** What-If 工具：并排编辑基准/情景特征，调用市场后端对比两次模型预测。 */

import { useState, useTransition } from "react";

import { marketApiBaseUrl } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";

type PropertyFeatures = {
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  distanceToCityCenter: number;
  schoolRating: number;
};

type WhatIfResponse = {
  baselinePrediction: number;
  scenarioPrediction: number;
  delta: number;
  currency: string;
};

type FieldConfig = {
  key: keyof PropertyFeatures;
  min: number;
  max?: number;
  step: string;
  integer?: boolean;
};

const fields: FieldConfig[] = [
  { key: "squareFootage", min: 100, step: "1", integer: true },
  { key: "bedrooms", min: 0, max: 20, step: "1", integer: true },
  { key: "bathrooms", min: 0, max: 20, step: "0.5" },
  { key: "yearBuilt", min: 1800, max: 2100, step: "1", integer: true },
  { key: "lotSize", min: 100, step: "1", integer: true },
  { key: "distanceToCityCenter", min: 0, step: "0.1" },
  { key: "schoolRating", min: 0, max: 10, step: "0.1" },
];

const initialBaseline: PropertyFeatures = {
  squareFootage: 1550,
  bedrooms: 3,
  bathrooms: 2,
  yearBuilt: 1997,
  lotSize: 6800,
  distanceToCityCenter: 4.1,
  schoolRating: 7.6,
};

const initialScenario: PropertyFeatures = {
  ...initialBaseline,
  squareFootage: 1900,
  schoolRating: 8.4,
};

export function WhatIfTool() {
  const { strings } = useLanguage();
  const [baseline, setBaseline] = useState<PropertyFeatures>(initialBaseline);
  const [scenario, setScenario] = useState<PropertyFeatures>(initialScenario);
  const [result, setResult] = useState<WhatIfResponse | null>(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function update(target: "baseline" | "scenario", field: FieldConfig, value: string) {
    const parsed = field.integer ? parseInt(value, 10) : Number(value);
    const nextValue = Number.isFinite(parsed) ? parsed : 0;
    if (target === "baseline") {
      setBaseline((current) => ({ ...current, [field.key]: nextValue }));
    } else {
      setScenario((current) => ({ ...current, [field.key]: nextValue }));
    }
  }

  function run() {
    const issues = [
      ...validate(strings, strings.whatIf.labels.baseline, baseline),
      ...validate(strings, strings.whatIf.labels.scenario, scenario),
    ];
    setValidationErrors(issues);
    setError("");
    if (issues.length > 0) return;

    startTransition(async () => {
      try {
        const response = await fetch(`${marketApiBaseUrl}/what-if`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            baseline,
            scenario,
          }),
        });
        if (!response.ok) {
          const details = await response.text();
          throw new Error(details || "Request failed");
        }
        setResult(await response.json());
      } catch {
        setError(strings.whatIf.error);
      }
    });
  }

  const changedFields = buildChangedFields(baseline, scenario, strings);
  const deltaPercent = result && result.baselinePrediction !== 0
    ? (result.delta / result.baselinePrediction) * 100
    : 0;

  return (
    <div className="grid what-if-grid">
      <PropertyPanel title={strings.whatIf.baseline} values={baseline} target="baseline" onChange={update} />
      <PropertyPanel title={strings.whatIf.scenario} values={scenario} target="scenario" onChange={update} />
      <section className="panel span-12 scenario-actions">
        <div className="actions">
          <button className="button" disabled={isPending} onClick={run}>
            {isPending ? strings.whatIf.running : strings.whatIf.run}
          </button>
          <button
            className="button secondary"
            type="button"
            disabled={isPending}
            onClick={() => {
              setBaseline(initialBaseline);
              setScenario(initialScenario);
              setResult(null);
              setError("");
              setValidationErrors([]);
            }}
          >
            {strings.whatIf.reset}
          </button>
        </div>
        {validationErrors.map((issue) => (
          <p className="error" key={issue}>{issue}</p>
        ))}
        {error ? <p className="error">{error}</p> : null}
      </section>
      <section className="panel span-12 scenario-result">
        <div className="panel-heading">
          <div>
            <h2>{strings.whatIf.result}</h2>
            <p className="muted">{strings.whatIf.resultHint}</p>
          </div>
        </div>
        {result ? (
          <>
            <div className="grid">
              <div className="stat span-4">
                <span>{strings.whatIf.labels.baseline}</span>
                <strong>{formatMoney(result.currency, result.baselinePrediction)}</strong>
              </div>
              <div className="stat span-4">
                <span>{strings.whatIf.labels.scenario}</span>
                <strong>{formatMoney(result.currency, result.scenarioPrediction)}</strong>
              </div>
              <div className={`stat span-4 delta-stat ${result.delta >= 0 ? "positive" : "negative"}`}>
                <span>{strings.whatIf.labels.delta}</span>
                <strong>{formatMoney(result.currency, result.delta)}</strong>
                <small>{formatPercent(deltaPercent)}</small>
              </div>
            </div>
            <ScenarioChart
              currency={result.currency}
              baseline={result.baselinePrediction}
              scenario={result.scenarioPrediction}
              baselineLabel={strings.whatIf.labels.baseline}
              scenarioLabel={strings.whatIf.labels.scenario}
            />
            <div className="scenario-change-panel">
              <h3>{strings.whatIf.changeTitle}</h3>
              <p className="muted">{strings.whatIf.changeHint}</p>
              {changedFields.length > 0 ? (
                <div className="change-list">
                  {changedFields.map((field) => (
                    <div className="change-item" key={field.label}>
                      <span>{field.label}</span>
                      <strong>{field.before} {"->"} {field.after}</strong>
                      <em>{field.delta}</em>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted">{strings.whatIf.noChanges}</p>
              )}
            </div>
          </>
        ) : (
          <p className="muted">{strings.whatIf.empty}</p>
        )}
      </section>
    </div>
  );
}

function PropertyPanel({
  title,
  values,
  target,
  onChange,
}: {
  title: string;
  values: PropertyFeatures;
  target: "baseline" | "scenario";
  onChange: (target: "baseline" | "scenario", field: FieldConfig, value: string) => void;
}) {
  const { strings } = useLanguage();
  return (
    <section className="panel span-6">
      <h2>{title}</h2>
      <div className="form-grid">
        {fields.map((field) => {
          const key = toKey(field.key);
          return (
            <div className="field" key={`${target}-${field.key}`}>
              <label htmlFor={`${target}-${field.key}`}>{strings.field[key]}</label>
              <input
                id={`${target}-${field.key}`}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.key]}
                onChange={(event) => onChange(target, field, event.target.value)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function validate(strings: ReturnType<typeof useLanguage>["strings"], prefix: string, values: PropertyFeatures) {
  const issues: string[] = [];
  for (const field of fields) {
    const value = values[field.key];
    const key = toKey(field.key);
    const label = `${prefix} ${strings.field[key]}`;
    if (!Number.isFinite(value)) issues.push(strings.whatIf.validation.invalid.replace("{field}", label));
    if (value < field.min) issues.push(strings.whatIf.validation.min.replace("{field}", label).replace("{min}", String(field.min)));
    if (field.max !== undefined && value > field.max) {
      issues.push(strings.whatIf.validation.max.replace("{field}", label).replace("{max}", String(field.max)));
    }
    if (field.integer && !Number.isInteger(value)) issues.push(strings.whatIf.validation.integer.replace("{field}", label));
  }
  return issues;
}

function ScenarioChart({
  currency,
  baseline,
  scenario,
  baselineLabel,
  scenarioLabel,
}: {
  currency: string;
  baseline: number;
  scenario: number;
  baselineLabel: string;
  scenarioLabel: string;
}) {
  const max = Math.max(Math.abs(baseline), Math.abs(scenario), 1);

  return (
    <div className="scenario-chart" aria-label="What-if prediction comparison">
      {[
        { label: baselineLabel, value: baseline },
        { label: scenarioLabel, value: scenario },
      ].map((item) => (
        <div className="scenario-bar-row" key={item.label}>
          <div className="bar-label">
            <span>{item.label}</span>
            <span>{formatMoney(currency, item.value)}</span>
          </div>
          <div className="bar-track" aria-hidden="true">
            <div className="bar-fill" style={{ width: `${Math.max(6, (Math.abs(item.value) / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function buildChangedFields(
  baseline: PropertyFeatures,
  scenario: PropertyFeatures,
  strings: ReturnType<typeof useLanguage>["strings"],
) {
  return fields
    .map((field) => {
      const before = baseline[field.key];
      const after = scenario[field.key];
      const delta = after - before;
      return {
        label: strings.field[toKey(field.key)],
        before: formatFeatureValue(before),
        after: formatFeatureValue(after),
        delta: `${delta > 0 ? "+" : ""}${formatFeatureValue(delta)}`,
        changed: delta !== 0,
      };
    })
    .filter((field) => field.changed);
}

function toKey(value: keyof PropertyFeatures) {
  switch (value) {
    case "squareFootage":
      return "squareFootage";
    case "bedrooms":
      return "bedrooms";
    case "bathrooms":
      return "bathrooms";
    case "yearBuilt":
      return "yearBuilt";
    case "lotSize":
      return "lotSize";
    case "distanceToCityCenter":
      return "distance";
    case "schoolRating":
      return "schoolRating";
  }
}

function formatMoney(currency: string, value: number) {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatFeatureValue(value: number) {
  return Number.isInteger(value)
    ? value.toLocaleString()
    : value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}
