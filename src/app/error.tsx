"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="page-width section-space" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}><h1 className="section-heading">Something went wrong.</h1><p className="quiet" style={{ marginBlock: 24 }}>This page could not load. Please try again.</p><button type="button" className="text-link" onClick={reset}>Try again ↗</button></main>;
}
