export default function Loading() {
  return (
    <main className="section-wrap py-20" aria-live="polite" aria-busy="true">
      <div className="loading-surface">
        <span className="loading-knot" aria-hidden="true" />
        <p>Opening the bakery…</p>
      </div>
    </main>
  );
}
