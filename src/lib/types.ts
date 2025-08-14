// src/lib/types.ts
import type { LegalTriageOutput } from "@/ai/flows/legal-triage";
import type { GenerateLegalJourneyOutput } from "@/ai/flows/generate-legal-journey";

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'missed';
};

export type RecommendedForm = {
  id:string;
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
  journey: GenerateLegalJourneyOutput;
  timeline: TimelineEvent[];
  forms: RecommendedForm[];
};
