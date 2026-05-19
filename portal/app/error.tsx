"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="panel">
      <h1>Unable to load this view</h1>
      <p className="muted">Check that the related backend service is running.</p>
      <button className="button" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
