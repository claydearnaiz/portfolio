"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body style={{ margin: 0, background: "#0b0b0b", color: "#f2f2f2", fontFamily: "Arial, sans-serif" }}><main style={{ minHeight: "100vh", padding: "12vw 8vw" }}><h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 500 }}>Something went wrong.</h1><p>Please try loading the portfolio again.</p><button type="button" onClick={reset} style={{ marginTop: 24, padding: "14px 24px", background: "#f2f2f2", color: "#111", border: 0, fontSize: 16, cursor: "pointer" }}>Try again</button></main></body></html>;
}
