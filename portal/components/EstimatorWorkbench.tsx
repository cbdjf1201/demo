"use client";

import { useEffect, useState, useTransition } from "react";

import { BarChart } from "@/components/BarChart";
import { compareEstimates, createEstimate, fetchHistory, fetchMarketSummary } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";
import type { EstimateResponse, PropertyFeatures } from "@/types/housing";

type FieldConfig = {
  key: keyof PropertyFeatures;
  min: number;
  max?: number;
  step: string;
  integer?: boolean;
};

type Candidate = {
  id: string;
  input: PropertyFeatures;
};

const defaults: PropertyFeatures = {
  square_footage: 1550,
  bedrooms: 3,
  bathrooms: 2,
  year_built: 1997,
  lot_size: 6800,
  distance_to_city_center: 4.1,
  school_rating: 7.6,
};

const fields: FieldConfig[] = [
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

export function EstimatorWorkbench() {
  const { strings } = useLanguage();
  const [form, setForm] = useState<PropertyFeatures>(defaults);
  const [result, setResult] = useState<EstimateResponse | null>(null);
  const [history, setHistory] = useState<EstimateResponse[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [comparison, setComparison] = useState<EstimateResponse[]>([]);
  const [marketAverage, setMarketAverage] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isEstimating, startEstimateTransition] = useTransition();
  const [isComparing, startCompareTransition] = useTransition();

  useEffect(() => {
    refreshHistory();
  }, []);

  function refreshHistory() {
    fetchHistory()
      .then(setHistory)
      .catch(() => setError(strings.history.loading));
  }

  function updateForm(key: keyof PropertyFeatures, value: string, integer = false) {
    setForm((current) => ({ ...current, [key]: parseInput(value, integer) }));
  }

  function submitEstimate() {
    const issues = validate(form, strings.estimatorForm.validation);
    setValidationErrors(issues);
    setError("");
    if (issues.length > 0) return;

    startEstimateTransition(async () => {
      try {
        const [estimate, summary] = await Promise.all([createEstimate(form), fetchMarketSummary()]);
        setResult(estimate);
        setMarketAverage(summary?.averagePrice ?? null);
        addCandidate(estimate.input, historyCandidateId(estimate.id));
        refreshHistory();
      } catch {
        setError(strings.estimatorForm.requestError);
      }
    });
  }

  function addManualCandidate() {
    addCandidate(form);
  }

  function addHistoryCandidate(item: EstimateResponse) {
    addCandidate(item.input, historyCandidateId(item.id));
  }

  function addCandidate(input: PropertyFeatures, id = manualCandidateId()) {
    setComparison([]);
    setCandidates((current) => {
      if (current.some((candidate) => candidate.id === id)) return current;
      return [...current, { id, input: cloneFeatures(input) }];
    });
  }

  function removeCandidate(index: number) {
    setCandidates((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setComparison([]);
  }

  function updateCandidate(index: number, field: FieldConfig, value: string) {
    setCandidates((current) =>
      current.map((candidate, itemIndex) =>
        itemIndex === index
          ? {
              ...candidate,
              input: {
                ...candidate.input,
                [field.key]: parseInput(value, Boolean(field.integer)),
              },
            }
          : candidate,
      ),
    );
    setComparison([]);
  }

  function runComparison() {
    const issues = validateMany(candidates.map((candidate) => candidate.input), strings);
    setValidationErrors(issues);
    setError("");
    if (issues.length > 0) return;

    startCompareTransition(async () => {
      try {
        setComparison(await compareEstimates(candidates.map((candidate) => candidate.input)));
      } catch {
        setError(strings.compare.loadingError);
      }
    });
  }

  const chartPoints = buildChartPoints(result, marketAverage, strings);
  const rankedComparison = rankResults(comparison);
  const best = rankedComparison[0];
  const lowest = rankedComparison.length > 0
    ? rankedComparison[rankedComparison.length - 1].predicted_price
    : 0;
  const latest = history[0];
  const averagePrediction = history.length > 0
    ? history.reduce((total, item) => total + item.predicted_price, 0) / history.length
    : 0;

  return (
    <div className="grid estimator-workbench">
      <section className="panel span-6">
        <div className="panel-heading">
          <div>
            <h2>{strings.estimatorForm.title}</h2>
            <p className="muted">{strings.estimator.workbench.estimateHint}</p>
          </div>
        </div>
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
                onChange={(event) => updateForm(field.key, event.target.value, Boolean(field.integer))}
              />
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="button" disabled={isEstimating} onClick={submitEstimate}>
            {isEstimating ? strings.estimatorForm.submitting : strings.estimatorForm.submit}
          </button>
          <button className="button secondary" type="button" onClick={addManualCandidate}>
            {strings.estimator.workbench.addCurrent}
          </button>
        </div>
        {validationErrors.map((issue) => (
          <p className="error" key={issue}>{issue}</p>
        ))}
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="panel span-6">
        <div className="panel-heading">
          <div>
            <h2>{strings.estimatorForm.output}</h2>
            <p className="muted">{strings.estimator.workbench.resultHint}</p>
          </div>
        </div>
        {result ? (
          <>
            <div className="stat">
              <span>{strings.field.predictedPrice}</span>
              <strong>{formatMoney(result.currency, result.predicted_price)}</strong>
            </div>
            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th>{strings.estimatorForm.resultRows.squareFootage}</th><td>{result.input.square_footage.toLocaleString()}</td></tr>
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

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.history.title}</h2>
            <p className="muted">{strings.estimator.workbench.historyHint}</p>
          </div>
        </div>
        <div className="history-summary">
          <div className="stat">
            <span>{strings.market.records}</span>
            <strong>{history.length}</strong>
          </div>
          <div className="stat">
            <span>{strings.history.latest}</span>
            <strong>{latest ? formatMoney(latest.currency, latest.predicted_price) : "-"}</strong>
          </div>
          <div className="stat">
            <span>{strings.history.average}</span>
            <strong>{history.length > 0 ? formatMoney(history[0].currency, averagePrediction) : "-"}</strong>
          </div>
        </div>
        <HistoryTable
          items={history}
          addedCandidateIds={new Set(candidates.map((candidate) => candidate.id))}
          onAdd={addHistoryCandidate}
        />
      </section>

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.compare.title}</h2>
            <p className="muted">{strings.estimator.workbench.compareHint}</p>
          </div>
          <span className="result-count">{candidates.length}</span>
        </div>
        <div className="candidate-grid">
          {candidates.map((candidate, index) => (
            <div className="compare-card" key={candidate.id}>
              <div className="compare-card-heading">
                <div className="compare-card-title">{strings.compare.property} {index + 1}</div>
                <button className="text-button" type="button" onClick={() => removeCandidate(index)}>
                  {strings.estimator.workbench.removeCandidate}
                </button>
              </div>
              <div className="form-grid">
                {fields.map((field) => (
                  <div className="field" key={`${index}-${field.key}`}>
                    <label>{strings.field[fieldLabelKey[field.key]]}</label>
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={candidate.input[field.key]}
                      onChange={(event) => updateCandidate(index, field, event.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {candidates.length === 0 ? <p className="muted">{strings.estimator.workbench.noCandidates}</p> : null}
        <div className="actions">
          <button className="button secondary" type="button" onClick={addManualCandidate}>
            {strings.estimator.workbench.addCurrent}
          </button>
          <button className="button" disabled={isComparing || candidates.length < 2} onClick={runComparison}>
            {isComparing ? strings.compare.running : strings.compare.run}
          </button>
        </div>
        <ComparisonResults results={rankedComparison} best={best} lowest={lowest} />
      </section>
    </div>
  );
}

function HistoryTable({
  items,
  addedCandidateIds,
  onAdd,
}: {
  items: EstimateResponse[];
  addedCandidateIds: Set<string>;
  onAdd: (item: EstimateResponse) => void;
}) {
  const { strings } = useLanguage();

  return (
    <>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{strings.history.columns.created}</th>
              <th>{strings.history.columns.squareFootage}</th>
              <th>{strings.history.columns.bedrooms}</th>
              <th>{strings.history.columns.bathrooms}</th>
              <th>{strings.history.columns.distance}</th>
              <th>{strings.history.columns.school}</th>
              <th>{strings.history.columns.prediction}</th>
              <th>{strings.estimator.workbench.action}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isAdded = addedCandidateIds.has(historyCandidateId(item.id));
              return (
                <tr key={item.id}>
                  <td>{item.created_at ? new Date(item.created_at).toLocaleString() : "-"}</td>
                  <td>{item.input.square_footage.toLocaleString()}</td>
                  <td>{item.input.bedrooms}</td>
                  <td>{item.input.bathrooms}</td>
                  <td>{item.input.distance_to_city_center}</td>
                  <td>{item.input.school_rating}</td>
                  <td><strong>{formatMoney(item.currency, item.predicted_price)}</strong></td>
                  <td>
                    <button
                      className="text-button"
                      type="button"
                      disabled={isAdded}
                      onClick={() => onAdd(item)}
                    >
                      {isAdded ? strings.estimator.workbench.addedToCompare : strings.estimator.workbench.addToCompare}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {items.length === 0 ? <p className="muted">{strings.history.empty}</p> : null}
    </>
  );
}

function ComparisonResults({
  results,
  best,
  lowest,
}: {
  results: ReturnType<typeof rankResults>;
  best?: ReturnType<typeof rankResults>[number];
  lowest: number;
}) {
  const { strings } = useLanguage();

  if (!best) {
    return <p className="muted">{strings.compare.empty}</p>;
  }

  return (
    <div className="comparison-results">
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
        {results.map((item) => (
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
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{strings.compare.rank}</th>
              <th>{strings.compare.property}</th>
              <th>{strings.compare.columns.squareFootage}</th>
              <th>{strings.compare.columns.bedrooms}</th>
              <th>{strings.compare.columns.bathrooms}</th>
              <th>{strings.compare.columns.schoolRating}</th>
              <th>{strings.compare.columns.prediction}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id}>
                <td>{item.rank}</td>
                <td>{strings.compare.property} {item.originalIndex + 1}</td>
                <td>{item.input.square_footage.toLocaleString()}</td>
                <td>{item.input.bedrooms}</td>
                <td>{item.input.bathrooms}</td>
                <td>{item.input.school_rating}</td>
                <td><strong>{formatMoney(item.currency, item.predicted_price)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function parseInput(value: string, integer = false) {
  if (!value.trim()) return 0;
  const parsed = integer ? parseInt(value, 10) : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function validate(form: PropertyFeatures, labels: Record<string, string>): string[] {
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

function validateMany(items: PropertyFeatures[], strings: ReturnType<typeof useLanguage>["strings"]) {
  if (items.length < 2) return [strings.estimator.workbench.needTwoCandidates];
  return items.flatMap((item, index) =>
    validate(item, strings.estimatorForm.validation).map((issue) => `${strings.compare.property} ${index + 1}: ${issue}`),
  );
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

function rankResults(results: EstimateResponse[]) {
  return results
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .sort((a, b) => b.predicted_price - a.predicted_price)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

function formatMoney(currency: string, value: number) {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}

function cloneFeatures(input: PropertyFeatures): PropertyFeatures {
  return { ...input };
}

function historyCandidateId(id: string) {
  return `history-${id}`;
}

function manualCandidateId() {
  return `manual-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
