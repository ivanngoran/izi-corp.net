# DESIGN.md — IZIcorp site vitrine (verrouillé 2026-11-10)

> Contrat de style. Toute modification future réutilise ces tokens et motifs.

## Tokens
- `--bg:#EDF3FC` fond (blanc teinté bleu, L≈0.93) · `--surface:#fff` · `--ink:#0B1220`
- `--muted:#3D5579` (texte secondaire, ≥4.5:1 sur fond) · `--line:#D5E1F3`
- `--blue:#2563EB` action · `--blue-deep:#1D4ED8` hover · `--teal:#14B8A6` accent
- `--teal-ink:#0B7C6E` (teal assombri pour texte sur fond clair, ≥3:1)
- `--night:#0B1220` unique bandeau sombre (contact final)
- Type : Sora 700–800 (titres, prix, chiffres) / Source Sans 3 400–700 (texte).
  Inter et Space Grotesk interdits.

## Motifs
- Ouvertures de section variées : hero (promesse + outil) → méthode (filet noir +
  3 colonnes) → services (lignes éditoriales + tags) → contact (bandeau nuit).
  Jamais de grille de 3 cartes identiques, jamais de `01/02/03` hors séquence réelle.
- Estimateur : types mono-sélection ; vitrine = options désactivées ; applis =
  1 option max ; sinon mode « Projet sur mesure » sans chiffres. Grille dans `GRILLE`
  en tête du script. Fourchette + mention indicative obligatoires.
- Motion (3 familles max) : révélations mot-à-mot (`.rv`, IO, stagger ≤80ms),
  compteur de prix (transform/opacity, nombres tabulaires), rien d'autre au scroll.
  `prefers-reduced-motion` = apparition instantanée. Contenu lisible sans JS
  (classe `html.js` gate les masquages).
- Boutons : un seul CTA plein par zone ; header = `.btn-ghost`.
- Formulaires : labels visibles, focus teal, envoi `mailto:contact@izi-corp.net`.
- Marque : « IZIcorp » en texte courant partout (header, footer, messages).
- Contact : tél/WhatsApp 05 44 05 84 84 (wa.me/2250544058484), bouton WhatsApp vert.
