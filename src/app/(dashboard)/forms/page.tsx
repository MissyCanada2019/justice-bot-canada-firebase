
"use client";
import { useState } from "react";
import { FormsApi } from "@/lib/api";
import { Section } from "@/components/ui/section";

export default function FormsPage(){
  const [issue,setIssue]=useState(""); interface Recommendation {
  recommended: string;
  prefill: Record<string, string>;
}

const [out,setOut]=useState<Recommendation|null>(null);
  async function recommend(){ setOut(await FormsApi.recommend(issue||undefined)); }
  return (
    <div className="container mx-auto">
      <Section title="Form Helper">
        <input className="input mb-2" placeholder="(optional) Issue context" value={issue} onChange={e=>setIssue(e.target.value)} />
        <button className="btn" onClick={recommend}>Recommend</button>
      </Section>
      {out && <Section title="Recommendation">
        <div className="badge">{out.recommended}</div>
        <pre className="text-sm mt-3">{JSON.stringify(out.prefill,null,2)}</pre>
      </Section>}
    </div>
  );
}
