import Link from "next/link";

export default function Home() {
  return (
    <div className="grid gap-5">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Justice-Bot Canada 🇨🇦</h1>
        <p className="opacity-80">Plain-language triage, form helper, timeline, and evidence management.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <Link className="card hover:ring-2 ring-canada-red" href="/triage"><b>AI Legal Triage</b><p className="opacity-70">Classify your issue and get next steps.</p></Link>
        <Link className="card hover:ring-2 ring-canada-red" href="/forms"><b>Form Helper</b><p className="opacity-70">Recommend and prefill forms.</p></Link>
        <Link className="card hover:ring-2 ring-canada-red" href="/timeline"><b>Case Timeline</b><p className="opacity-70">Stay on top of deadlines.</p></Link>
      </div>
    </div>
  );
}
