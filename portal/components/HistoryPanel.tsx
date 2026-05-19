"use client";

import { useEffect, useState } from "react";

import { fetchHistory } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";
import type { EstimateResponse } from "@/types/housing";

export function HistoryPanel() {
  const { strings } = useLanguage();
  const [items, setItems] = useState<EstimateResponse[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory()
      .then(setItems)
      .catch(() => setError(strings.history.loading));
  }, [strings.history.loading]);

  if (error) return <p className="error">{error}</p>;

  const latest = items[0];
  const averagePrediction = items.length > 0
    ? items.reduce((total, item) => total + item.predicted_price, 0) / items.length
    : 0;

  return (
    <div className="grid">
      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.history.title}</h2>
            <p className="muted">{strings.history.subtitle}</p>
          </div>
        </div>
        <div className="history-summary">
          <div className="stat">
            <span>{strings.market.records}</span>
            <strong>{items.length}</strong>
          </div>
          <div className="stat">
            <span>{strings.history.latest}</span>
            <strong>{latest ? formatMoney(latest.currency, latest.predicted_price) : "-"}</strong>
          </div>
          <div className="stat">
            <span>{strings.history.average}</span>
            <strong>{items.length > 0 ? formatMoney(items[0].currency, averagePrediction) : "-"}</strong>
          </div>
        </div>
      </section>

      <section className="panel span-12">
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
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.created_at ? new Date(item.created_at).toLocaleString() : "-"}</td>
                  <td>{item.input.square_footage.toLocaleString()}</td>
                  <td>{item.input.bedrooms}</td>
                  <td>{item.input.bathrooms}</td>
                  <td>{item.input.distance_to_city_center}</td>
                  <td>{item.input.school_rating}</td>
                  <td>
                    <strong>{formatMoney(item.currency, item.predicted_price)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 ? <p className="muted">{strings.history.empty}</p> : null}
      </section>
    </div>
  );
}

function formatMoney(currency: string, value: number) {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}
