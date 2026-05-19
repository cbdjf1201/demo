type ChartPoint = {
  label: string;
  value: number;
};

export function BarChart({
  points,
  emptyLabel = "No chart data available.",
}: {
  points: ChartPoint[];
  emptyLabel?: string;
}) {
  if (points.length === 0) {
    return <p className="muted">{emptyLabel}</p>;
  }

  const max = Math.max(...points.map((point) => Math.abs(point.value)), 1);

  return (
    <div className="bar-list">
      {points.map((point) => (
        <div className="bar-row" key={point.label}>
          <div className="bar-label">
            <span>{point.label}</span>
            <span>{point.value.toLocaleString()}</span>
          </div>
          <div className="bar-track" aria-hidden="true">
            <div className="bar-fill" style={{ width: `${Math.max(4, (Math.abs(point.value) / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
