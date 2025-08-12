
"use client";
import { useEffect, useState } from "react";
import { Auth, Cases } from "@/lib/api";
import { Section } from "@/components/ui/section";
import Link from "next/link";

export default function Dashboard(){
  const [me,setMe]=useState<any>(null);
  const [cases,setCases]=useState<any[]>([]);
  const [title,setTitle]=useState(""); const [issue,setIssue]=useState("");
  useEffect(()=>{ (async()=>{ try{ setMe(await Auth.me()); setCases((await Cases.list()).cases); } catch{} })(); },[]);
  async function create(){ await Cases.create(title,issue); setCases((await Cases.list()).cases); }
  return (
    <div className="container mx-auto">
      <Section title="Your Account">
        <div className="badge">{me?.email || "Not logged in"}</div>
      </Section>
      <Section title="Cases">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <div className="mb-2">Create a new case</div>
            <input className="input mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="input mb-2" rows={3} placeholder="Describe issue…" value={issue} onChange={e=>setIssue(e.target.value)} />
            <button className="btn" onClick={create}>Create</button>
          </div>
          <div className="card">
            {cases.length===0? <div>No cases yet.</div> :
              <ul className="space-y-2">{cases.map(c=><li key={c.id} className="card"><Link href={`/case/${c.id}`}><b>{c.title}</b></Link><div className="opacity-70">{c.status}</div></li>)}</ul>}
          </div>
        </div>
      </Section>
    </div>
  );
}
