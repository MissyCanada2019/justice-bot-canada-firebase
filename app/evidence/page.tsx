"use client";
import { useState } from "react";
// assumes you initialized Firebase elsewhere (app/firebase.ts)
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default function Evidence(){
  const [caseId, setCaseId] = useState("");
  const [msg, setMsg] = useState("");

  async function upload() {
    const input = document.getElementById("file") as HTMLInputElement;
    const f = input?.files?.[0];
    if (!f || !caseId) return setMsg("Pick a case and file");

    const storage = getStorage();
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) return setMsg("Sign in first");

    const key = `users/${uid}/cases/${caseId}/${Date.now()}_${f.name}`;
    const r = ref(storage, key);
    await uploadBytes(r, f, { contentType: f.type || "application/octet-stream" });
    const url = await getDownloadURL(r);
    setMsg(`Uploaded: ${url}`);
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/10 bg-[#141418]">
        <h1 className="font-headline text-2xl mb-2">Upload Evidence</h1>
        <input className="w-full rounded-xl bg-[#101014] border border-white/10 p-2 mb-2" placeholder="Case ID"
          value={caseId} onChange={e=>setCaseId(e.target.value)} />
        <input id="file" type="file" className="mb-3" />
        <button className="px-4 py-2 rounded-xl bg-[#d32d2d] text-white" onClick={upload}>Upload</button>
        <div className="mt-2 text-sm opacity-80">{msg}</div>
      </div>
    </div>
  );
}