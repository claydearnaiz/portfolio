import Link from "next/link";

export default function NotFound() {
  return <main className="page-width section-space" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}><p className="eyebrow">404</p><h1 className="section-heading">Page not found.</h1><p className="quiet" style={{ marginBlock: 24 }}>The page may have moved, or the address may be incorrect.</p><Link className="text-link" href="/">Return to the portfolio ↗</Link></main>;
}
