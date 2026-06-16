import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AdsOutput } from "./schema.js";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function buildTimestamp(date = new Date()): string {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderAdsMarkdown(output: AdsOutput): string {
  const sections = output.ads.map((ad) => {
    return `## ${ad.id}

- Plateforme: ${ad.platform}
- Format: ${ad.format}
- Angle: ${ad.angle}

### Texte principal
${ad.primary_text}

### Titre
${ad.headline}

### Description
${ad.description}

### CTA
${ad.cta}

### Notes conformite
${formatList(ad.compliance_notes)}`;
  });

  return `# ${output.campaign_name}

${output.strategy_summary}

${sections.join("\n\n")}\n`;
}

function renderVisualPrompts(output: AdsOutput): string {
  const sections = output.ads.map((ad) => {
    return `## ${ad.id} - ${ad.platform} - ${ad.format}

${ad.visual_prompt}`;
  });

  return `# Prompts visuels

${sections.join("\n\n")}\n`;
}

function renderCaptions(output: AdsOutput): string {
  const sections = output.ads.map((ad) => {
    const hashtags = ad.hashtags.join(" ");

    return `## ${ad.id}

### Caption
${ad.caption}

### Hashtags
${hashtags}

### Variante courte organique
${ad.headline} ${ad.cta}`;
  });

  return `# Captions

${sections.join("\n\n")}\n`;
}

export async function writeOutputs(output: AdsOutput): Promise<string> {
  const outputDir = path.join(process.cwd(), "output", buildTimestamp());
  await mkdir(outputDir, { recursive: true });

  await Promise.all([
    writeFile(path.join(outputDir, "ads.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8"),
    writeFile(path.join(outputDir, "ads.md"), renderAdsMarkdown(output), "utf8"),
    writeFile(path.join(outputDir, "visual-prompts.md"), renderVisualPrompts(output), "utf8"),
    writeFile(path.join(outputDir, "captions.md"), renderCaptions(output), "utf8")
  ]);

  return outputDir;
}
