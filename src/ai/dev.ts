import { config } from 'dotenv';
config();

import '@/ai/flows/canlii-search.ts';
import '@/ai/flows/legal-triage.ts';
import '@/ai/flows/generate-legal-journey.ts';
