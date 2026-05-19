"use client";

/** 市场分析页：汇总卡片、多维筛选、可排序表格、导出链接及内嵌 What-If。 */

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { WhatIfTool } from "@/components/WhatIfTool";
import { marketApiBaseUrl } from "@/lib/api";
import { useLanguage } from "@/lib/useLanguage";
import type { HousingRecord, MarketSummary } from "@/types/housing";

type SortKey = "price" | "squareFootage" | "schoolRating" | "bedrooms" | "distanceToCityCenter";
type SortDirection = "asc" | "desc";

type FilterRange = {
  minSquareFootage: string;
  maxSquareFootage: string;
  minBedrooms: string;
  maxBedrooms: string;
  minBathrooms: string;
  maxBathrooms: string;
  minYearBuilt: string;
  maxYearBuilt: string;
  minLotSize: string;
  maxLotSize: string;
  minSchoolRating: string;
  maxSchoolRating: string;
  minDistance: string;
  maxDistance: string;
  minPrice: string;
  maxPrice: string;
};

export function MarketDashboard({
  summary,
  initialSegments,
  totalSegments,
  filters,
}: {
  summary: MarketSummary | null;
  initialSegments: HousingRecord[];
  totalSegments: HousingRecord[];
  filters: FilterRange;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { strings, withLang } = useLanguage();
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentFilters, setCurrentFilters] = useState(filters);

  const sorted = useMemo(() => {
    const rows = [...initialSegments];
    rows.sort((a, b) => {
      const delta = Number(a[sortKey]) - Number(b[sortKey]);
      return sortDirection === "desc" ? -delta : delta;
    });
    return rows;
  }, [initialSegments, sortDirection, sortKey]);
  const exportQuery = buildExportQuery(currentFilters);
  const csvExportHref = `${marketApiBaseUrl}/exports/market.csv${exportQuery}`;
  const pdfExportHref = `${marketApiBaseUrl}/exports/market.pdf${exportQuery}`;

  function updateSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
      return;
    }
    setSortKey(nextKey);
    setSortDirection("desc");
  }

  function getAriaSort(key: SortKey) {
    if (sortKey !== key) return "none";
    return sortDirection === "desc" ? "descending" : "ascending";
  }

  function renderSortableHeader(key: SortKey, label: string) {
    const active = sortKey === key;
    return (
      <button
        type="button"
        className={`sort-button${active ? " active" : ""}`}
        onClick={() => updateSort(key)}
        title={`${strings.marketTable.sort} ${label}`}
      >
        <span>{label}</span>
        <span className="sort-indicator" aria-hidden="true">
          {active ? (sortDirection === "desc" ? "down" : "up") : "sort"}
        </span>
        <span className="sr-only">{active ? `sorted ${sortDirection}` : "sortable"}</span>
      </button>
    );
  }

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const pairs = Object.entries(currentFilters);
    for (const [key, value] of pairs) {
      setParam(params, key, value);
    }
    router.push(withLang(`/market-analysis${params.toString() ? `?${params.toString()}` : ""}`));
    router.refresh();
  }

  function resetFilters() {
    const reset: FilterRange = {
      minSquareFootage: "",
      maxSquareFootage: "",
      minBedrooms: "",
      maxBedrooms: "",
      minBathrooms: "",
      maxBathrooms: "",
      minYearBuilt: "",
      maxYearBuilt: "",
      minLotSize: "",
      maxLotSize: "",
      minSchoolRating: "",
      maxSchoolRating: "",
      minDistance: "",
      maxDistance: "",
      minPrice: "",
      maxPrice: "",
    };
    setCurrentFilters(reset);
    router.push(withLang("/market-analysis"));
    router.refresh();
  }

  return (
    <div className="grid">
      <section className="panel span-12">
        <h2>{strings.market.summary}</h2>
        <div className="grid">
          <div className="stat span-4">
            <span>{strings.market.records}</span>
            <strong>{summary?.recordCount ?? "-"}</strong>
          </div>
          <div className="stat span-4">
            <span>{strings.market.averagePrice}</span>
            <strong>{summary ? `$${summary.averagePrice.toLocaleString()}` : "-"}</strong>
          </div>
          <div className="stat span-4">
            <span>{strings.market.medianPrice}</span>
            <strong>{summary ? `$${summary.medianPrice.toLocaleString()}` : "-"}</strong>
          </div>
        </div>
      </section>

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.market.filters}</h2>
            <p className="muted">{strings.market.filterHint}</p>
          </div>
          <div className="heading-actions">
            <span className="result-count">{sorted.length} / {totalSegments.length}</span>
            <a className="button compact" href={csvExportHref}>{strings.market.exportCsv}</a>
            <a className="button secondary compact" href={pdfExportHref}>{strings.market.exportPdf}</a>
          </div>
        </div>
        <form className="filter-workbench" onSubmit={applyFilters}>
          <div className="filter-card featured">
            <h3>{strings.market.filterGroups.price}</h3>
            <RangeField label={strings.field.price} minKey="minPrice" maxKey="maxPrice" values={currentFilters} onChange={setCurrentFilters} integer />
          </div>
          <div className="filter-card">
            <h3>{strings.market.filterGroups.property}</h3>
            <div className="filter-card-grid">
              <RangeField label={strings.field.squareFootage} minKey="minSquareFootage" maxKey="maxSquareFootage" values={currentFilters} onChange={setCurrentFilters} />
              <RangeField label={strings.field.bedrooms} minKey="minBedrooms" maxKey="maxBedrooms" values={currentFilters} onChange={setCurrentFilters} integer />
              <RangeField label={strings.field.bathrooms} minKey="minBathrooms" maxKey="maxBathrooms" values={currentFilters} onChange={setCurrentFilters} step="0.5" />
              <RangeField label={strings.field.yearBuilt} minKey="minYearBuilt" maxKey="maxYearBuilt" values={currentFilters} onChange={setCurrentFilters} integer />
              <RangeField label={strings.field.lotSize} minKey="minLotSize" maxKey="maxLotSize" values={currentFilters} onChange={setCurrentFilters} integer />
            </div>
          </div>
          <div className="filter-card">
            <h3>{strings.market.filterGroups.location}</h3>
            <div className="filter-card-grid two">
              <RangeField label={strings.field.distance} minKey="minDistance" maxKey="maxDistance" values={currentFilters} onChange={setCurrentFilters} step="0.1" />
              <RangeField label={strings.field.schoolRating} minKey="minSchoolRating" maxKey="maxSchoolRating" values={currentFilters} onChange={setCurrentFilters} step="0.1" max="10" />
            </div>
          </div>
          <div className="actions span-12">
            <button className="button" type="submit">{strings.market.apply}</button>
            <button className="button secondary" type="button" onClick={resetFilters}>{strings.market.reset}</button>
          </div>
        </form>
      </section>

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.market.table}</h2>
            <p className="muted">{strings.market.tableHint}</p>
          </div>
          <div className="heading-actions">
            <a className="button compact" href={csvExportHref}>{strings.market.exportCsv}</a>
            <a className="button secondary compact" href={pdfExportHref}>{strings.market.exportPdf}</a>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{strings.marketTable.columns.id}</th>
                <th aria-sort={getAriaSort("squareFootage")}>{renderSortableHeader("squareFootage", strings.marketTable.columns.squareFootage)}</th>
                <th aria-sort={getAriaSort("bedrooms")}>{renderSortableHeader("bedrooms", strings.marketTable.columns.bedrooms)}</th>
                <th>{strings.marketTable.columns.bathrooms}</th>
                <th>{strings.marketTable.columns.yearBuilt}</th>
                <th>{strings.marketTable.columns.lotSize}</th>
                <th aria-sort={getAriaSort("distanceToCityCenter")}>{renderSortableHeader("distanceToCityCenter", strings.marketTable.columns.distance)}</th>
                <th aria-sort={getAriaSort("schoolRating")}>{renderSortableHeader("schoolRating", strings.marketTable.columns.schoolRating)}</th>
                <th aria-sort={getAriaSort("price")}>{renderSortableHeader("price", strings.marketTable.columns.price)}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.squareFootage}</td>
                  <td>{record.bedrooms}</td>
                  <td>{record.bathrooms}</td>
                  <td>{record.yearBuilt}</td>
                  <td>{record.lotSize}</td>
                  <td>{record.distanceToCityCenter}</td>
                  <td>{record.schoolRating}</td>
                  <td>${record.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 ? <p className="muted">{strings.marketTable.noRows}</p> : null}
      </section>

      <section className="panel span-12">
        <div className="panel-heading">
          <div>
            <h2>{strings.market.whatIfTitle}</h2>
            <p className="muted">{strings.market.whatIfHint}</p>
          </div>
        </div>
        <WhatIfTool />
      </section>
    </div>
  );
}

function RangeField({
  label,
  minKey,
  maxKey,
  values,
  onChange,
  step = "1",
  integer = false,
  max,
}: {
  label: string;
  minKey: keyof FilterRange;
  maxKey: keyof FilterRange;
  values: FilterRange;
  onChange: React.Dispatch<React.SetStateAction<FilterRange>>;
  step?: string;
  integer?: boolean;
  max?: string;
}) {
  const { strings } = useLanguage();

  return (
    <div className="range-group">
      <label>{label}</label>
      <div className="range-row">
        <input
          type="number"
          placeholder={strings.market.minPlaceholder}
          min="0"
          max={max}
          step={step}
          value={values[minKey]}
          onChange={(event) => onChange((current) => ({ ...current, [minKey]: sanitizeInput(event.target.value, integer) }))}
        />
        <input
          type="number"
          placeholder={strings.market.maxPlaceholder}
          min="0"
          max={max}
          step={step}
          value={values[maxKey]}
          onChange={(event) => onChange((current) => ({ ...current, [maxKey]: sanitizeInput(event.target.value, integer) }))}
        />
      </div>
    </div>
  );
}

function sanitizeInput(value: string, integer = false) {
  if (!value.trim()) return "";
  if (integer) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) ? String(parsed) : "";
  }
  return value;
}

function setParam(params: URLSearchParams, key: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    params.delete(key);
    return;
  }
  params.set(key, trimmed);
}

/** 将表单字段名映射为后端 SegmentFilter 查询参数（如 minDistance → minDistanceToCityCenter）。 */
function buildExportQuery(filters: FilterRange) {
  const params = new URLSearchParams();
  const mapping: Record<keyof FilterRange, string> = {
    minSquareFootage: "minSquareFootage",
    maxSquareFootage: "maxSquareFootage",
    minBedrooms: "minBedrooms",
    maxBedrooms: "maxBedrooms",
    minBathrooms: "minBathrooms",
    maxBathrooms: "maxBathrooms",
    minYearBuilt: "minYearBuilt",
    maxYearBuilt: "maxYearBuilt",
    minLotSize: "minLotSize",
    maxLotSize: "maxLotSize",
    minSchoolRating: "minSchoolRating",
    maxSchoolRating: "maxSchoolRating",
    minDistance: "minDistanceToCityCenter",
    maxDistance: "maxDistanceToCityCenter",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
  };
  for (const [key, targetKey] of Object.entries(mapping) as [keyof FilterRange, string][]) {
    const value = filters[key].trim();
    if (value) params.set(targetKey, value);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
