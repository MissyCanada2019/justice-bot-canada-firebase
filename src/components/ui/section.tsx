export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card mb-5">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
