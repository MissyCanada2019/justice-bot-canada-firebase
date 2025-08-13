// src/components/triage-form.tsx
"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/,"") || "";

export default function TriageForm() {
  const [issue, setIssue] = useState("");
  const [out, setOut] = useState<string>("");

  async function handleTriage() {
    const r = await fetch(`${API_BASE}/assistant/triage`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue })
    });
    const txt = await r.text();
    setOut(txt);
  }

  async function handleMerit() {
    const r = await fetch(`${API_BASE}/merit/score`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        issue,
        facts: { event_days_ago: 30, notice_given: true, ongoing_issue: true, arrears: 0 },
        evidence: []
      })
    });
    const txt = await r.text();
    setOut(txt);
  }

  return (
    <>
      <textarea
        className="w-full rounded-lg bg-black/40 border border-white/10 p-3 mb-3"
        rows={6}
        placeholder="Describe your issue…"
        value={issue}
        onChange={e=>setIssue(e.target.value)}
      />
      <div className="flex gap-2 mb-3">
        <button className="px-4 py-2 rounded-xl bg-red-600" onClick={handleTriage}>Classify &amp; Suggest</button>
        <button className="px-4 py-2 rounded-xl bg-red-600" onClick={handleMerit}>Merit Score</button>
      </div>
      <pre className="rounded-lg p-3 bg-black/40 border border-white/10 text-sm whitespace-pre-wrap">{out}</pre>
    </>
  );
}