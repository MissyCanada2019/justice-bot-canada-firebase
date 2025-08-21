// Import the Genkit core libraries and plugins.
import {genkit, z} from "genkit";
import {googleAI} from "@genkit-ai/googleai";

// Import models from the Google AI plugin. The Google AI API provides access to
// several generative models. Here, we import Gemini 2.0 Flash.
import {gemini20Flash} from "@genkit-ai/googleai";

// The Firebase telemetry plugin exports a combination of metrics, traces, and logs to Google Cloud
// Observability. See https://firebase.google.com/docs/genkit/observability/telemetry-collection.
import {enableFirebaseTelemetry} from "@genkit-ai/firebase";
enableFirebaseTelemetry();

const ai = genkit({
  plugins: [
    // Load the Google AI plugin. You can optionally specify your API key
    // by passing in a config object; if you don't, the Google AI plugin uses
    // the value from the GOOGLE_GENAI_API_KEY environment variable, which is
    // the recommended practice.
    googleAI(),
  ],
});

// Define the legal triage flow that analyzes user input and provides initial guidance
export const legalTriageFlow = ai.defineFlow({
    name: "legalTriageFlow",
    inputSchema: z.object({
      legalIssue: z.string().describe("Description of the legal issue"),
      province: z.string().describe("Canadian province or territory").optional(),
      caseType: z.string().describe("Type of legal case").optional(),
    }),
    outputSchema: z.object({
      guidance: z.string().describe("Initial legal guidance"),
      nextSteps: z.array(z.string()).describe("Recommended next steps"),
      relevantLaws: z.array(z.string()).describe("Relevant laws or regulations").optional(),
      urgency: z.enum(["low", "medium", "high"]).describe("Urgency level of the issue"),
    }),
  }, async (input) => {
    // Construct a prompt for the legal triage analysis
    const prompt = `
      Analyze the following legal issue and provide initial guidance:
      
      Legal Issue: ${input.legalIssue}
      Province/Territory: ${input.province || "Not specified"}
      Case Type: ${input.caseType || "Not specified"}
      
      Please provide:
      1. Initial legal guidance (2-3 sentences)
      2. 3-5 recommended next steps
      3. Relevant Canadian laws or regulations (if applicable)
      4. Urgency level (low, medium, or high)
      
      Format your response as JSON with the following structure:
      {
        "guidance": "Initial legal guidance",
        "nextSteps": ["Step 1", "Step 2", "Step 3"],
        "relevantLaws": ["Law 1", "Law 2"],
        "urgency": "low|medium|high"
      }
    `;

    // Generate response from the AI model
    const response = await ai.generate({
      model: gemini20Flash,
      prompt: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    // Parse and return the response
    try {
      return JSON.parse(response.text);
    } catch (error) {
      // If JSON parsing fails, return a structured response
      return {
        guidance: response.text,
        nextSteps: ["Please consult with a legal professional for detailed advice"],
        urgency: "medium"
      };
    }
  }
);