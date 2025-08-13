// src/app/(dashboard)/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/,"") || "";

type CaseRow = { id: number; title: string; status: string };

export default function DashboardPage() {
  const [rows, setRows] = useState<CaseRow[]>([]);
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");

  async function load() {
    const r = await fetch(`${API_BASE}/cases`, { credentials: "include" });
    if (!r.ok) return;
    const data = await r.json();
    setRows(data.cases || []);
  }

  async function create() {
    await fetch(`${API_BASE}/cases`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, issue })
    });
    setTitle(""); setIssue(""); load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 bg-zinc-900 border border-white/10">
        <h1 className="text-xl font-semibold mb-3">Your Cases</h1>
        {rows.length === 0 ? <div>No cases yet.</div> :
          <ul className="space-y-2">
            {rows.map(c => (
              <li key={c.id} className="rounded-xl p-3 bg-black/40 border border-white/10">
                <b>{c.title}</b>
                <div className="text-xs opacity-70">{c.status}</div>
              </li>
            ))}
          </ul>}
      </div>

      <div className="rounded-2xl p-5 bg-zinc-900 border border-white/10">
        <h2 className="font-semibold mb-2">Create Case</h2>
        <input className="w-full mb-2 rounded-lg bg-black/40 border border-white/10 p-2"
               placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full mb-3 rounded-lg bg-black/40 border border-white/10 p-2" rows={4}
               placeholder="Describe the issue…" value={issue} onChange={e=>setIssue(e.target.value)} />
        <button className="px-4 py-2 rounded-xl bg-red-600" onClick={create}>Create</button>
      </div>
    </div>
  );
}