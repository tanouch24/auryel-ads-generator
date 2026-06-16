Tu travailles sur le repo `tanouch24/auryel-ads-generator`.

Objectif :
Intégrer la banque de textes `data/text-bank.json` dans le générateur Auryel Ads.

À faire :
1. Lire `data/text-bank.json`.
2. Valider rapidement sa structure avec zod ou une validation simple.
3. Modifier la génération pour utiliser cette banque comme source prioritaire :
   - hooks courts pour les textes overlay des images
   - sous-textes courts pour les visuels
   - titres Meta Ads
   - descriptions
   - CTA
   - captions
   - hashtags
4. Le modèle OpenAI peut enrichir et varier, mais il doit respecter l'esprit de la banque.
5. Les créas finales avec texte doivent utiliser en priorité :
   - `overlay_hooks`
   - `overlay_subtexts`
   - `ctas`
   - `creative_templates`
6. Ajouter dans les exports :
   - le texte exact utilisé sur chaque image
   - la source si le texte vient de la banque
7. Éviter les textes trop longs sur les images :
   - hook max 42 caractères
   - sous-texte max 90 caractères
   - CTA max 28 caractères
8. Ne pas modifier le vrai `.env`.
9. Ne pas afficher la clé API.
10. Ne pas commit automatiquement.
11. Exécuter `npm run check`.
12. Résumer les fichiers créés/modifiés.

Important :
Les textes doivent rester compatibles Meta Ads :
- pas de promesse absolue
- pas de “il pense à toi”
- pas de “ton ex va revenir”
- pas de “tu souffres”
- pas de supposition personnelle intrusive
- ton premium, sobre, mystérieux, rassurant
