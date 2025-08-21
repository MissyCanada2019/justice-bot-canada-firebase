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

// Define the document automation flow that generates legal documents
export const documentAutomationFlow = ai.defineFlow({
    name: "documentAutomationFlow",
    inputSchema: z.object({
      documentType: z.string().describe("Type of legal document to generate"),
      userData: z.record(z.any()).describe("User data to populate the document"),
      jurisdiction: z.string().describe("Canadian province or territory").optional(),
      additionalInstructions: z.string().describe("Additional instructions for document generation").optional(),
    }),
    outputSchema: z.object({
      documentContent: z.string().describe("Generated document content"),
      documentTitle: z.string().describe("Title of the document"),
      documentType: z.string().describe("Type of document generated"),
      warnings: z.array(z.string()).describe("Any warnings about the document").optional(),
    }),
  }, async (input) => {
    // Construct a prompt for the document automation
    const prompt = `
      Generate a ${input.documentType} legal document for Canadian law with the following details:
      
      Jurisdiction: ${input.jurisdiction || "Not specified"}
      User Data: ${JSON.stringify(input.userData, null, 2)}
      Additional Instructions: ${input.additionalInstructions || "None provided"}
      
      Please create a properly formatted legal document that:
      1. Follows the standard format for this document type in Canada
      2. Includes all relevant sections and clauses
      3. Uses the provided user data where appropriate
      4. Complies with Canadian legal standards
      
      Format your response as JSON with the following structure:
      {
        "documentContent": "Complete document content with proper formatting",
        "documentTitle": "Title of the document",
        "documentType": "${input.documentType}",
        "warnings": ["Any relevant warnings about the document"]
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
        documentContent: response.text,
        documentTitle: `${input.documentType} Document`,
        documentType: input.documentType,
        warnings: ["Document may require review by a legal professional"]
      };
    }
  }
);