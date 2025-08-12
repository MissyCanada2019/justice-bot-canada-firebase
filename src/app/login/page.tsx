
"use client";
import { useState } from "react";
import { Auth } from "@/lib/api";
import { Section } from "@/components/ui/section";

export default function Login() {
  const [email,setEmail]=useState(""); 
  const [password,setPassword]=useState(""); 
  const [msg,setMsg]=useState("");

  async function submit(kind:"login"|"register"){
    try {
      if(kind==="login") await Auth.login(email,password); 
      else await Auth.register(email,password);
      setMsg("Success. You’re logged in."); 
      window.location.href="/dashboard";
    } catch(e:any){ 
      setMsg(e.message); 
    }
  }

  return (
    <div className="container py-8">
      <Section title="Secure Authentication">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <input className="input mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="input mb-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="flex gap-2">
              <button className="btn" onClick={()=>submit("login")}>Login</button>
              <button className="btn" onClick={()=>submit("register")}>Register</button>
            </div>
            <div className="mt-3 text-sm opacity-80">{msg}</div>
          </div>
          <div className="card">
            <p className="text-sm opacity-80">We use HTTP-only cookies, CSRF, and secure session settings. Data is stored per Canadian privacy practices (see Privacy page).</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
