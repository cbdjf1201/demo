"use client";

import { useState, useTransition } from "react";

import { BarChart } from "@/components/BarChart";
import { createEstimate, fetchMarketSummary } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";
import type { EstimateResponse, PropertyFeatures } from "@/types/housing";

const defaults: PropertyFeatures = {
  square_footage: 1550,
  bedrooms: 3,
  bathrooms: 2,
  year_built: 1997,
  lot_size: 6800,
  distance_to_city_center: 4.1,
  school_rating: 7.6,
};

const fields: { key: keyof PropertyFeatures; min: number; max?: number; step: string; integer?: boolean }[] = [
  { key: "square_footage", min: 100, step: "1", integer: true },
  { key: "bedrooms", min: 0, max: 20, step: "1", integer: true },
  { key: "bathrooms", min: 0, max: 20, step: "0.5" },
  { key: "year_built", min: 1800, max: 2100, step: "1", integer: true },
  { key: "lot_size", min: 100, step: "1", integer: true },
  { key: "distance_to_city_center", min: 0, step: "0.1" },
  { key: "school_rating", min: 0, max: 10, step: "0.1" },
];

const fieldLabelKey: Record<keyof PropertyFeatures, keyof ReturnType<typeof useLanguage>["strings"]["field"]> = {
  square_footage: "squareFootage",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  year_built: "yearBuilt",
  lot_size: "lotSize",
  distance_to_city_center: "distance",
  school_rating: "schoolRating",
};

export function EstimatorForm() {
  const { strings } = useLanguage();
  const [form, setForm] = useState<PropertyFeatures>(defaults);
  const [result, setResult] = useState<EstimateResponse | null>(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [marketAverage, setMarketAverage] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  async function loadMarketAverage() {
    const summary = await fetchMarketSummary();
    return summary?.averagePrice ?? null;
  }

  function update(key: keyof PropertyFeatures, value: string, integer = false) {
    if (!value.trim()) {
      setForm((current) => ({ ...current, [key]: 0 }));
      return;
    }
    const parsed = integer ? parseInt(value, 10) : Number(value);
    setForm((current) => ({ ...current, [key]: Number.isFinite(parsed) ? parsed : 0 }));
  }

  function submit() {
    const issues = validate(form, strings.estimatorForm.validation);
    setValidationErrors(issues);
    setError("");
    if (issues.length > 0) return;

    startTransition(async () => {
      try {
        const [estimate, average] = await Promise.all([createEstimate(form), loadMarketAverage()]);
        setResult(estimate);
        setMarketAverage(average);
      } catch {
        setError("Estimator backend is unavailable or rejected the request.");
      }
    });
  }

  const chartPoints = buildChartPoints(result, marketAverage, strings);

  return (
    <div className="grid">
      <section className="panel span-6">
        <h2>{strings.estimatorForm.title}</h2>
        <div className="form-grid">
          {fields.map((field) => (
            <div className="field" key={field.key}>
              <label htmlFor={field.key}>{strings.field[fieldLabelKey[field.key]]}</label>
              <input
                id={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step}
                value={form[field.key]}
                onChange={(event) => update(field.key, event.target.value, Boolean(field.integer))}
              />
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="button" disabled={isPending} onClick={submit}>
            {isPending ? strings.estimatorForm.submitting : strings.estimatorForm.submit}
          </button>
        </div>
        {validationErrors.map((issue) => (
          <p className="error" key={issue}>{issue}</p>
        ))}
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="panel span-6">
        <h2>{strings.estimatorForm.output}</h2>
        {result ? (
          <>
            <div className="stat">
              <span>{strings.field.predictedPrice}</span>
              <strong>{result.currency} {result.predicted_price.toLocaleString()}</strong>
            </div>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th>{strings.estimatorForm.resultRows.squareFootage}</th><td>{result.input.square_footage}</td></tr>
                  <tr><th>{strings.estimatorForm.resultRows.bedrooms}</th><td>{result.input.bedrooms}</td></tr>
                  <tr><th>{strings.estimatorForm.resultRows.bathrooms}</th><td>{result.input.bathrooms}</td></tr>
                  <tr><th>{strings.estimatorForm.resultRows.schoolRating}</th><td>{result.input.school_rating}</td></tr>
                </tbody>
              </table>
            </div>
            <h3>{strings.estimatorForm.chartTitle}</h3>
            <p className="muted">{strings.estimatorForm.chartHint}</p>
            <BarChart points={chartPoints} emptyLabel={strings.estimatorForm.chartEmpty} />
          </>
        ) : (
          <p className="muted">{strings.estimatorForm.empty}</p>
        )}
      </section>
    </div>
  );
}

function validate(
  form: PropertyFeatures,
  labels: Record<string, string>,
): string[] {
  const issues: string[] = [];
  if (form.square_footage <= 0 || !Number.isInteger(form.square_footage)) issues.push(labels.squareFootage);
  if (form.bedrooms < 0 || !Number.isInteger(form.bedrooms)) issues.push(labels.bedrooms);
  if (form.bathrooms < 0) issues.push(labels.bathrooms);
  if (form.year_built < 1800 || form.year_built > 2100 || !Number.isInteger(form.year_built)) issues.push(labels.yearBuilt);
  if (form.lot_size <= 0 || !Number.isInteger(form.lot_size)) issues.push(labels.lotSize);
  if (form.distance_to_city_center < 0) issues.push(labels.distance);
  if (form.school_rating < 0 || form.school_rating > 10) issues.push(labels.schoolRating);
  return issues;
}

function buildChartPoints(
  result: EstimateResponse | null,
  marketAverage: number | null,
  strings: ReturnType<typeof useLanguage>["strings"],
) {
  if (!result) return [];
  return [
    { label: strings.estimatorForm.chartBaseline, value: Math.round(result.predicted_price) },
    { label: strings.estimatorForm.chartMarketAverage, value: Math.round(marketAverage ?? result.predicted_price) },
    ...(result.chart ?? []).map((point) => ({
      label: localizeChartLabel(point.label, strings),
      value: Math.round(point.value),
    })),
  ];
}

function localizeChartLabel(label: string, strings: ReturnType<typeof useLanguage>["strings"]) {
  switch (label) {
    case "Square footage":
      return strings.field.squareFootage;
    case "Bedrooms":
      return strings.field.bedrooms;
    case "Bathrooms":
      return strings.field.bathrooms;
    case "Year built":
      return strings.field.yearBuilt;
    case "Lot size":
      return strings.field.lotSize;
    case "Distance":
      return strings.field.distance;
    case "School rating":
      return strings.field.schoolRating;
    default:
      return label;
  }
}
