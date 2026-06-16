import OpenAI from "openai";
import { adsOutputSchema, type AdsOutput, type Brief } from "./schema.js";
import { buildUserPrompt, systemPrompt } from "./prompts.js";

const defaultModel = "gpt-5.4-mini";

function getApiKey(): string {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY est absente. Ajoutez-la dans votre environnement ou dans un fichier .env."
    );
  }

  return apiKey;
}

function extractJsonText(outputText: string): string {
  const trimmed = outputText.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const match = trimmed.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("La reponse OpenAI ne contient pas d'objet JSON.");
  }

  return match[0];
}

function parseAdsOutput(outputText: string): AdsOutput {
  const jsonText = extractJsonText(outputText);
  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`OpenAI a renvoye un JSON invalide: ${message}`);
  }

  const result = adsOutputSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(`Le JSON OpenAI ne respecte pas le schema attendu: ${result.error.message}`);
  }

  return result.data;
}

export async function generateAds(brief: Brief): Promise<AdsOutput> {
  const client = new OpenAI({ apiKey: getApiKey() });
  const model = process.env.OPENAI_MODEL || defaultModel;

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: buildUserPrompt(brief)
      }
    ],
    text: {
      format: {
        type: "json_object"
      }
    }
  });

  if (!response.output_text) {
    throw new Error("OpenAI n'a pas renvoye de texte exploitable.");
  }

  const adsOutput = parseAdsOutput(response.output_text);

  if (adsOutput.ads.length !== brief.count) {
    throw new Error(
      `OpenAI a renvoye ${adsOutput.ads.length} ads, mais le brief en demande ${brief.count}.`
    );
  }

  return adsOutput;
}
