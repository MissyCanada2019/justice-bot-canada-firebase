"use client";
import { useState } from "react";

export default function Triage() {
  const [issue, setIssue] = useState("");
  const [out, setOut] = useState("");


  async function triage() {
    const r = await fetch("/api/assistant/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue })
    });
    setOut(await r.text());
  }

  async function merit() {
    const r = await fetch("/api/merit/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue, facts: { event_days_ago: 30, notice_given: true }, evidence: [] })
    });
    setOut(await r.text());
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/10 bg-[#141418]">
        <h1 className="font-headline text-2xl mb-2">AI Legal Triage</h1>
        <textarea className="w-full rounded-xl bg-[#101014] border border-white/10 p-3"
          rows={6} placeholder="Describe your issue…" value={issue} onChange={e=>setIssue(e.target.value)} />
        <div className="mt-3 flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-[#d32d2d] text-white" onClick={triage}>Classify & Suggest</button>
          <button className="px-4 py-2 rounded-xl bg-[#d32d2d] text-white" onClick={merit}>Merit Score</button>
        </div>
      </div>
      <pre className="rounded-2xl p-5 border border-white/10 bg-[#141418] whitespace-pre-wrap text-sm">{out}</pre>
    </div>
  );
}