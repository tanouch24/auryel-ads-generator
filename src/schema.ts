import { z } from "zod";

export const platformSchema = z.enum(["facebook", "instagram"]);
export const formatSchema = z.enum(["feed_1_1", "story_9_16", "reels_9_16"]);

export const briefSchema = z.object({
  brand: z.string().min(1),
  platforms: z.array(platformSchema).min(1),
  objective: z.string().min(1),
  theme: z.string().min(1),
  offer: z.string().min(1),
  tone: z.string().min(1),
  audience: z.string().min(1),
  formats: z.array(formatSchema).min(1),
  count: z.number().int().min(1).max(50),
  language: z.string().min(2)
});

export type Brief = z.infer<typeof briefSchema>;
export type Platform = z.infer<typeof platformSchema>;
export type AdFormat = z.infer<typeof formatSchema>;

export const adSchema = z.object({
  id: z.string().regex(/^AD_\d{3}$/),
  platform: platformSchema,
  format: formatSchema,
  angle: z.string().min(1),
  primary_text: z.string().min(1),
  headline: z.string().min(1),
  description: z.string().min(1),
  cta: z.string().min(1),
  visual_prompt: z.string().min(1),
  caption: z.string().min(1),
  hashtags: z.array(z.string().min(1)),
  compliance_notes: z.array(z.string().min(1))
});

export const adsOutputSchema = z.object({
  campaign_name: z.string().min(1),
  strategy_summary: z.string().min(1),
  ads: z.array(adSchema).min(1)
});

export type Ad = z.infer<typeof adSchema>;
export type AdsOutput = z.infer<typeof adsOutputSchema>;
