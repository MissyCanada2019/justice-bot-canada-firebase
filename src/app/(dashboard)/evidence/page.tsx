"use client";
import { useState } from "react";
import { Evidence } from "@/lib/api";
import { Section } from "@/components/ui/section";

export default function EvidencePage(){
  const [caseId,setCaseId]=useState<number>(0);
  const [docs,setDocs]=useState<any[]>([]);

  async function refresh(){ if(caseId) setDocs((await Evidence.list(caseId)).docs); }

  async function upload(){
    const input = document.getElementById("file") as HTMLInputElement;
    if(!caseId || !input?.files?.[0]) return alert("Pick case + file");
    const f = input.files[0];
    const ps = await Evidence.presign(caseId, f.name, f.type || "application/octet-stream");
    const put = await fetch(ps.upload_url, { method: "PUT", headers: ps.headers, body: f });
    if(!put.ok) return alert("Upload failed");
    await refresh();
  }

  return (
    <div className="container mx-auto">
      <Section title="Upload Evidence">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="card">
            <input className="input mb-2" type="number" placeholder="Case ID" onChange={e=>setCaseId(Number(e.target.value))} />
            <input id="file" type="file" className="mb-2" />
            <div className="flex gap-2">
              <button className="btn" onClick={upload}>Upload</button>
              <button className="btn" onClick={refresh}>Refresh List</button>
            </div>
          </div>
          <div className="card">
            {docs.length===0? <div>No files yet.</div>:
              <ul className="space-y-2">{docs.map(d=><li key={d.id} className="card"><b>{d.filename}</b><div className="opacity-70 text-xs">{d.type||""}</div></li>)}</ul>}
          </div>
        </div>
      </Section>
    </div>
  );
}
