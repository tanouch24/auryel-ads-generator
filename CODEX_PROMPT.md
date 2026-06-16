Tu travailles sur le repo GitHub `tanouch24/auryel-ads-generator`.

Objectif :
Créer un générateur CLI TypeScript pour produire des textes publicitaires et prompts visuels pour les publicités Facebook / Instagram de la marque Auryel, service de guidance / voyance par message.

Contexte business :
- Marque : Auryel
- Offre : consultation/guidance sentimentale par message
- Plateformes : Facebook Ads et Instagram Ads
- Objectif V1 : générer rapidement plusieurs variantes d’ads prêtes à tester
- Pas de génération d’image directe en V1
- Le générateur produit des textes + prompts visuels utilisables ensuite dans un outil image

Stack existante :
- Node.js
- TypeScript
- OpenAI SDK
- dotenv
- zod
- Script existant attendu : `npm run generate`
- Script de contrôle attendu : `npm run check`

Variables d’environnement :
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- Utiliser `gpt-5.4-mini` par défaut si OPENAI_MODEL est absent

À construire :
1. Un fichier `src/index.ts`
   - Charge `.env`
   - Lit un brief depuis `data/brief.json`
   - Valide le brief avec zod
   - Appelle OpenAI
   - Demande une sortie JSON structurée
   - Écrit les résultats dans `output/`

2. Un fichier `data/brief.json`
   Exemple de brief par défaut :
   {
     "brand": "Auryel",
     "platforms": ["facebook", "instagram"],
     "objective": "lead",
     "theme": "guidance_sentimentale",
     "offer": "premiere_consultation_gratuite",
     "tone": "mysterieux_rassurant_premium",
     "audience": "adultes_interesses_par_la_voyance_sentimentale",
     "formats": ["feed_1_1", "story_9_16", "reels_9_16"],
     "count": 10,
     "language": "fr"
   }

3. Un fichier `src/schema.ts`
   - Schéma zod du brief
   - Schéma TypeScript de sortie attendue

4. Un fichier `src/openai.ts`
   - Client OpenAI
   - Fonction `generateAds(brief)`
   - Gestion d’erreur claire si clé API absente

5. Un fichier `src/prompts.ts`
   - Prompt système strict
   - Prompt utilisateur basé sur le brief

6. Un fichier `src/output.ts`
   - Crée un dossier de sortie daté dans `output/YYYY-MM-DD_HH-mm-ss/`
   - Écrit :
     - `ads.json`
     - `ads.md`
     - `visual-prompts.md`
     - `captions.md`

Structure de sortie JSON attendue :
{
  "campaign_name": "string",
  "strategy_summary": "string",
  "ads": [
    {
      "id": "AD_001",
      "platform": "facebook|instagram",
      "format": "feed_1_1|story_9_16|reels_9_16",
      "angle": "string",
      "primary_text": "string",
      "headline": "string",
      "description": "string",
      "cta": "string",
      "visual_prompt": "string",
      "caption": "string",
      "hashtags": ["string"],
      "compliance_notes": ["string"]
    }
  ]
}

Règles marketing :
- Produire des variantes différentes, pas 10 copies proches.
- Chaque ad doit avoir un angle clair :
  - première consultation gratuite
  - question sentimentale
  - guidance discrète
  - réponse par message
  - doute amoureux
  - besoin de clarté
  - décision personnelle
  - tarot / intuition
  - accompagnement premium
  - relance douce
- Ton : mystérieux, rassurant, premium, sobre.
- Éviter le style cheap, agressif, faux voyant TV.
- Pas de promesse absolue.
- Pas de “résultat garanti”.
- Pas de manipulation émotionnelle sale.
- Pas de phrase trop longue.
- Français naturel, publicitaire, clair.

Règles Meta Ads importantes :
- Ne pas écrire comme si on connaissait personnellement l’état du lecteur.
- Éviter les formulations du type :
  - “Tu souffres en silence”
  - “Il pense encore à toi”
  - “Ton ex va revenir”
  - “Tu es bloqué sentimentalement”
  - “Tu n’arrives pas à l’oublier”
  - “Tu es célibataire”
  - “Tu es triste”
- Préférer :
  - “Une question sentimentale mérite parfois une réponse claire.”
  - “Recevez une guidance personnalisée par message.”
  - “Posez votre question et découvrez une réponse structurée.”
  - “Un doute, une décision, une situation à éclaircir.”
- Ne pas faire de diagnostic psychologique, médical ou financier.
- Ne pas cibler de détresse émotionnelle directement.
- Ne pas promettre le retour d’un ex.
- Ne pas affirmer que la voyance prédit l’avenir avec certitude.

Règles visuelles :
- Prompts visuels compatibles avec IA image / Midjourney / Canva
- Format vertical ou carré selon le format demandé
- Ambiance :
  - bleu nuit
  - violet profond
  - doré discret
  - cartes de tarot élégantes
  - lumière douce
  - bougies
  - astres
  - texture premium
  - style mystique moderne
- Pas de nudité
- Pas de visage trop réaliste
- Pas de représentation médicale
- Pas de texte dans l’image sauf si demandé explicitement
- Chaque prompt visuel doit préciser : composition, ambiance, couleurs, style, format.

Fichier Markdown `ads.md` :
Pour chaque publicité :
- ID
- Plateforme
- Format
- Angle
- Texte principal
- Titre
- Description
- CTA
- Notes conformité

Fichier `visual-prompts.md` :
- Liste propre des prompts visuels uniquement

Fichier `captions.md` :
- Caption
- Hashtags
- Variante courte pour publication organique si utile

Contraintes techniques :
- Code propre, simple, lisible.
- Pas de framework inutile.
- Pas de backend.
- Pas de base de données.
- Pas de dépendance lourde.
- Pas de clé API en dur.
- Tout doit marcher avec `npm run generate`.
- `npm run check` doit passer sans erreur TypeScript.
- Utiliser async/await.
- Gérer les erreurs JSON de l’IA proprement.
- Si OpenAI renvoie un JSON invalide, afficher une erreur claire.

Après implémentation :
- Exécuter `npm run check`
- Ne pas modifier `.env.example` sauf nécessité
- Ne pas créer de vrai `.env`
- Ne pas commit automatiquement
- Afficher le résumé des fichiers modifiés
