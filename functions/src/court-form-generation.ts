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

// Define the court form generation flow that creates specific court forms
export const courtFormGenerationFlow = ai.defineFlow({
    name: "courtFormGenerationFlow",
    inputSchema: z.object({
      formType: z.string().describe("Type of court form to generate"),
      caseDetails: z.record(z.any()).describe("Case details to populate the form"),
      courtJurisdiction: z.string().describe("Court jurisdiction"),
      province: z.string().describe("Canadian province or territory"),
      additionalFields: z.record(z.any()).describe("Additional form fields").optional(),
    }),
    outputSchema: z.object({
      formContent: z.string().describe("Generated court form content"),
      formTitle: z.string().describe("Title of the form"),
      formNumber: z.string().describe("Official form number").optional(),
      completionInstructions: z.string().describe("Instructions for completing the form").optional(),
      filingInstructions: z.string().describe("Instructions for filing the form").optional(),
      warnings: z.array(z.string()).describe("Any warnings about the form").optional(),
    }),
  }, async (input) => {
    // Construct a prompt for the court form generation
    const prompt = `
      Generate a ${input.formType} court form for ${input.province} with the following details:
      
      Court Jurisdiction: ${input.courtJurisdiction}
      Case Details: ${JSON.stringify(input.caseDetails, null, 2)}
      Additional Fields: ${input.additionalFields ? JSON.stringify(input.additionalFields, null, 2) : "None provided"}
      
      Please create a properly formatted court form that:
      1. Follows the standard format for this form type in ${input.province}
      2. Includes all required fields and sections
      3. Uses the provided case details where appropriate
      4. Complies with court requirements in ${input.province}
      5. Includes completion and filing instructions
      
      Format your response as JSON with the following structure:
      {
        "formContent": "Complete form content with proper formatting",
        "formTitle": "Official title of the form",
        "formNumber": "Official form number (if applicable)",
        "completionInstructions": "Step-by-step instructions for completing the form",
        "filingInstructions": "Instructions for filing the form with the court",
        "warnings": ["Any relevant warnings about the form"]
      }
    `;

    // Generate response from the AI model
    const response = await ai.generate({
      model: gemini20Flash,
      prompt: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    // Parse and return the response
    try {
      return JSON.parse(response.text);
    } catch (error) {
      // If JSON parsing fails, return a structured response
      return {
        formContent: response.text,
        formTitle: `${input.formType} Form`,
        completionInstructions: "Please review the form and ensure all required fields are completed",
        filingInstructions: "Please check with your local court for specific filing requirements",
        warnings: ["Form may require review by a legal professional before filing"]
      };
    }
  }
);