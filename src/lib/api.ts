
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.headers.get("content-type")?.includes("application/json") ? res.json() : (res.text() as unknown as T);
}

export const Auth = {
  me: () => api<{ id: number; email: string }>("/auth/me"),
  login: (email: string, password: string) => api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string) => api("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => api("/auth/logout", { method: "POST" })
};

export const Cases = {
  list: () => api<{ cases: { id: number; title: string; status: string }[] }>("/cases"),
  create: (title: string, issue: string) => api("/cases", { method: "POST", body: JSON.stringify({ title, issue }) })
};

export const FormsApi = {
  recommend: (issue?: string) => api<{ recommended: string; prefill: unknown }>(`/forms/recommend${issue ? `?issue=${encodeURIComponent(issue)}` : ""}`)
};

export const Timeline = {
  steps: () => api<{ steps: { title: string; detail: string }[] }>("/timeline/steps")
};

export const Triage = {
  triage: (issue: string) => api<string>("/assistant/triage", { method: "POST", body: JSON.stringify({ issue }) })
};

export const Evidence = {
  presign: (case_id: number, filename: string, content_type: string) =>
    api<{ upload_url: string; file_url: string; document_id: number; method: "PUT"; headers: Record<string, string> }>("/evidence/presign", {
      method: "POST",
      body: JSON.stringify({ case_id, filename, content_type })
    }),
  list: (case_id: number) => api<{ docs: { id: number; filename: string; url: string; type?: string; size?: number }[] }>(`/evidence/list?case_id=${case_id}`)
};

export const Merit = {
  score: (payload: { issue: string; facts: any; evidence: any[] }) =>
    api<{ score: number; reasons: [string, number, string][] }>("/merit/score", { method: "POST", body: JSON.stringify(payload) })
};

export const Journey = {
  state: (case_id: number) => api<{ state: string; data: any }>(`/journey/state?case_id=${case_id}`),
  advance: (case_id: number, state: string, data: any) =>
    api<{ ok: true; state: string }>("/journey/advance", { method: "POST", body: JSON.stringify({ case_id, state, data }) })
};
