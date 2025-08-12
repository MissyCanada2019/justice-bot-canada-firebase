import type { LegalTriageOutput } from "@/ai/flows/legal-triage";

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'missed';
};

export type RecommendedForm = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export type Case = {
  id: string;
  title: string;
  status: 'Active' | 'Closed' | 'Pending';
  lastActivity: string;
  triageOutput: LegalTriageOutput;
  timeline: TimelineEvent[];
  forms: RecommendedForm[];
};
