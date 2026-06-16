import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { generateAds } from "./openai.js";
import { writeOutputs } from "./output.js";
import { briefSchema } from "./schema.js";

async function loadBrief(): Promise<unknown> {
  const briefPath = path.join(process.cwd(), "data", "brief.json");
  const rawBrief = await readFile(briefPath, "utf8");
  return JSON.parse(rawBrief);
}

async function main(): Promise<void> {
  const rawBrief = await loadBrief();
  const briefResult = briefSchema.safeParse(rawBrief);

  if (!briefResult.success) {
    throw new Error(`Le brief data/brief.json est invalide: ${briefResult.error.message}`);
  }

  console.log(`Generation de ${briefResult.data.count} ads pour ${briefResult.data.brand}...`);

  const adsOutput = await generateAds(briefResult.data);
  const outputDir = await writeOutputs(adsOutput);

  console.log(`Generation terminee: ${outputDir}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Erreur: ${message}`);
  process.exitCode = 1;
});
