Tu travailles sur le repo `tanouch24/auryel-ads-generator`.

Objectif :
Reprendre les textes et les créas Auryel Ads pour obtenir un rendu plus fort, plus publicitaire et plus voyance, sans perdre la conformité Meta Ads.

Point important :
La banque `data/text-bank.json` contient maintenant deux familles :
1. `meta_safe_concepts` = à utiliser pour les publicités Facebook / Instagram payantes.
2. `organic_hard_hooks_not_for_ads` = inspirations fortes réservées à TikTok/Reels organiques, NE PAS utiliser dans les ads Meta.

À faire :
1. Utiliser `meta_safe_concepts` comme source principale des campagnes Meta Ads.
2. Produire 5 concepts parmi les meilleurs concepts Meta safe.
3. Pour chaque concept, produire exactement 3 formats :
   - square 1080x1080
   - portrait 1080x1350
   - vertical 1080x1920
4. Les 3 formats d’un même concept doivent avoir exactement :
   - même hook
   - même subtext
   - même CTA
5. Améliorer les fonds :
   - ne plus utiliser de simples dégradés flous
   - utiliser les vrais fonds IA existants dans `images/` si disponibles
   - sinon générer un fond programmatique plus riche : tarot stylisé, bougies, astres, textures, doré discret
6. Les textes doivent être plus visibles et plus vendeurs :
   - hook grand, clair, fort
   - sous-texte lisible
   - CTA bouton premium
   - AURYEL discret en haut
7. Éviter les rendus Canva :
   - pas de bloc noir trop lourd
   - pas de fond vide violet
   - pas de bouton énorme
   - pas de texte minuscule
8. Contact sheet :
   - afficher chaque concept sur une ligne
   - square / portrait / vertical côte à côte
   - indiquer hook, subtext, CTA
9. Ne jamais utiliser dans les créas Meta les phrases de `organic_hard_hooks_not_for_ads`.

Validation :
- npm run check
- npm run generate si .env existe
- ne pas modifier le vrai .env
- ne pas afficher la clé API
- ne pas commit automatiquement

À la fin, résumer :
- fichiers modifiés
- dossier output généré
- confirmation 5 concepts
- confirmation 15 créas
- confirmation mêmes textes sur les 3 formats d’un concept
