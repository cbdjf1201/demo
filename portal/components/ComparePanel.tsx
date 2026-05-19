"use client";

import { useState, useTransition } from "react";

import { compareEstimates } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";
import type { EstimateResponse, PropertyFeatures } from "@/types/housing";

type CompareField = {
  key: keyof PropertyFeatures;
  min: number;
  max?: number;
  step: number;
  integer?: boolean;
};

const fields: CompareField[] = [
  { key: "square_footage", min: 100, step: 1, integer: true },
  { key: "bedrooms", min: 0, max: 20, step: 1, integer: true },
  { key: "bathrooms", min: 0, max: 20, step: 0.5 },
  { key: "year_built", min: 1800, max: 2100, step: 1, integer: true },
  { key: "lot_size", min: 100, step: 1, integer: true },
  { key: "distance_to_city_center", min: 0, step: 0.1 },
  { key: "school_rating", min: 0, max: 10, step: 0.1 },
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

function newProperty(seed = 0): PropertyFeatures {
  return {
    square_footage: 1500 + seed * 150,
    bedrooms: 3 + seed,
    bathrooms: 2 + seed * 0.5,
    year_built: 1995 + seed * 5,
    lot_size: 6500 + seed * 800,
    distance_to_city_center: 4 + seed,
    school_rating: 7.4 + seed * 0.5,
  };
}

export function ComparePanel() {
  const { strings } = useLanguage();
  const [items, setItems] = useState<PropertyFeatures[]>([newProperty(0), newProperty(1)]);
  const [results, setResults] = useState<EstimateResponse[]>([]);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function update(index: number, field: CompareField, value: string) {
    const parsed = field.integer ? parseInt(value, 10) : Number(value);
    const nextValue = Number.isFinite(parsed) ? parsed : 0;
    setItems((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field.key]: nextValue } : item)),
    );
  }

  function addProperty() {
    setItems((current) => [...current, newProperty(current.length)]);
  }

  function runComparison() {
    const issues = validate(items, strings);
    setValidationErrors(issues);
    setError("");
    if (issues.length > 0) return;

    startTransition(async () => {
      try {
        setResults(await compareEstimates(items));
      } catch {
        setError(strings.compare.loadingError);
      }
    });
  }

  const rankedResults = rankResults(results);
  const best = rankedResults[0];
  const lowest = rankedResults.length > 0
    ? rankedResults[rankedResults.length - 1].predicted_price
    : 0;

  return (
    <div className="grid">
      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.compare.title}</h2>
            <p className="muted">{strings.compare.subtitle}</p>
          </div>
        </div>
        <div className="compare-input-grid">
          {items.map((item, index) => (
            <div className="compare-card" key={`property-${index}`}>
              <div className="compare-card-title">{strings.compare.property} {index + 1}</div>
              <div className="form-grid">
                {fields.map((field) => (
                  <div className="field" key={`${index}-${field.key}`}>
                    <label>{strings.field[fieldLabelKey[field.key]]}</label>
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={item[field.key]}
                      onChange={(event) => update(index, field, event.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="button secondary" onClick={addProperty}>
            {strings.compare.add}
          </button>
          <button className="button" disabled={isPending} onClick={runComparison}>
            {isPending ? strings.compare.running : strings.compare.run}
          </button>
        </div>
        {validationErrors.map((issue) => (
          <p className="error" key={issue}>{issue}</p>
        ))}
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.compare.output}</h2>
            <p className="muted">{best ? strings.compare.subtitle : strings.compare.empty}</p>
          </div>
        </div>
        {best ? (
          <>
            <div className="history-summary">
              <div className="stat">
                <span>{strings.compare.bestValue}</span>
                <strong>{formatMoney(best.currency, best.predicted_price)}</strong>
              </div>
              <div className="stat">
                <span>{strings.compare.property}</span>
                <strong>{best.originalIndex + 1}</strong>
              </div>
              <div className="stat">
                <span>{strings.compare.premium}</span>
                <strong>{formatMoney(best.currency, best.predicted_price - lowest)}</strong>
              </div>
            </div>
            <div className="comparison-chart">
              {rankedResults.map((item) => (
                <div className="scenario-bar-row" key={`bar-${item.id}`}>
                  <div className="bar-label">
                    <span>{strings.compare.property} {item.originalIndex + 1}</span>
                    <span>{formatMoney(item.currency, item.predicted_price)}</span>
                  </div>
                  <div className="bar-track" aria-hidden="true">
                    <div
                      className="bar-fill"
                      style={{ width: `${Math.max(6, (item.predicted_price / best.predicted_price) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{strings.compare.rank}</th>
                <th>{strings.compare.property}</th>
                <th>{strings.compare.columns.squareFootage}</th>
                <th>{strings.compare.columns.bedrooms}</th>
                <th>{strings.compare.columns.bathrooms}</th>
                <th>{strings.compare.columns.yearBuilt}</th>
                <th>{strings.compare.columns.lotSize}</th>
                <th>{strings.compare.columns.schoolRating}</th>
                <th>{strings.compare.columns.prediction}</th>
              </tr>
            </thead>
            <tbody>
              {rankedResults.map((item) => (
                <tr key={item.id}>
                  <td>{item.rank}</td>
                  <td>{strings.compare.property} {item.originalIndex + 1}</td>
                  <td>{item.input.square_footage.toLocaleString()}</td>
                  <td>{item.input.bedrooms}</td>
                  <td>{item.input.bathrooms}</td>
                  <td>{item.input.year_built}</td>
                  <td>{item.input.lot_size.toLocaleString()}</td>
                  <td>{item.input.school_rating}</td>
                  <td>
                    <strong>{formatMoney(item.currency, item.predicted_price)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {results.length === 0 ? <p className="muted">{strings.compare.empty}</p> : null}
      </section>
    </div>
  );
}

function validate(items: PropertyFeatures[], strings: ReturnType<typeof useLanguage>["strings"]) {
  const issues: string[] = [];
  items.forEach((item, index) => {
    fields.forEach((field) => {
      const value = item[field.key];
      const label = strings.field[fieldLabelKey[field.key]];
      if (!Number.isFinite(value)) issues.push(`Property ${index + 1} ${label} must be a valid number.`);
      if (value < field.min) issues.push(`Property ${index + 1} ${label} must be at least ${field.min}.`);
      if (field.max !== undefined && value > field.max) issues.push(`Property ${index + 1} ${label} must be at most ${field.max}.`);
      if (field.integer && !Number.isInteger(value)) issues.push(`Property ${index + 1} ${label} must be an integer.`);
    });
  });
  return issues;
}

function rankResults(results: EstimateResponse[]) {
  return results
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .sort((a, b) => b.predicted_price - a.predicted_price)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

function formatMoney(currency: string, value: number) {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}
