"use client";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Triage, Merit } from "@/lib/api";

export default function TriagePage(){
  const [issue,setIssue]=useState(""); const [out,setOut]=useState(""); const [facts,setFacts]=useState('{"event_days_ago":30,"notice_given":true,"ongoing_issue":true,"health_safety":true,"arrears":0}');
  async function run(){
    const res = await Triage.triage(issue);
    setOut(typeof res==="string"?res:JSON.stringify(res,null,2));
  }
  async function score(){
    const s = await Merit.score({ issue, facts: JSON.parse(facts||"{}"), evidence: [] });
    setOut(JSON.stringify(s,null,2));
  }
  return (
    <div className="container mx-auto">
      <Section title="AI Legal Triage">
        <textarea className="input mb-3" rows={6} placeholder="e.g., landlord ignored repairs and served N4…" value={issue} onChange={e=>setIssue(e.target.value)} />
        <div className="flex gap-2">
          <button className="btn" onClick={run}>Classify & Suggest</button>
          <button className="btn" onClick={score}>Merit Score</button>
        </div>
      </Section>
      <Section title="Output">
        <pre className="text-sm whitespace-pre-wrap">{out}</pre>
      </Section>
      <Section title="Facts JSON (for scoring)">
        <textarea className="input" rows={5} value={facts} onChange={e=>setFacts(e.target.value)} />
      </Section>
    </div>
  );
}
