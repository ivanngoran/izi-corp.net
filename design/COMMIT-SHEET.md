# COMMIT-SHEET — IZIcorp site vitrine (landing premium)

> Registre : build. Une page, objectif : visiteur → demande de devis.

## 1. Peak / Signature

**L'estimateur de projet en direct dans le hero.** Le visiteur coche son besoin
(type : site vitrine / application métier / e-commerce + options : design,
paiement mobile, maintenance), un prix en FCFA et un délai s'animent en direct,
puis un bouton « Recevoir mon devis détaillé » ouvre le contact pré-rempli.
C'est ce que le visiteur racontera : « le site qui chiffre ton projet en direct ».
Signature porteuse (conversion), pas décorative.

## 2. Couleur

- Primaire : bleu `#2563EB` → oklch(0.55 0.22 264). Accent : teal `#14B8A6`.
  Encre : nuit `#0B1220`. Fond : blanc teinté bleu L≈0.93 (chroma ~0.01 vers le bleu).
- Tier : **committed** — de larges aplats bleu/teal portent des sections entières.
- Pas le réflexe lavande/purple-blue (banni), pas le crème (banni) : le fond est un
  blanc froid teinté de la teinte marque.
- **Luminosité moyenne cible L ≈ 0.85** : scène physique = un dirigeant PME à
  Abidjan, sur mobile, en plein jour, connexion moyenne. La page doit rester
  lisible en plein soleil et charger vite → page claire, un seul bandeau nuit
  (preuve + contact final), jamais de dark-by-default.

## 3. Typo

- Display : **Sora** (géométrique, engineered, 700–800). Texte : **Source Sans 3**
  (humaniste, grande hauteur d'x, vraie italique). Axe : géométrique × humaniste.
- Inter refusé : défaut statistique 2024–26. Space Grotesk refusé (même raison).

## 4. Grid break

**La carte estimateur du hero chevauche le bandeau de preuve** (−72px overlap,
ombre portée directionnelle unique) : l'outil suit le visiteur dans la section
suivante au lieu de rester prisonnier du hero.

## 5. Budget motion (3 familles max)

1. Révélations de titres mot-à-mot (IntersectionObserver, 30–80ms stagger).
2. Compteur de l'estimateur (chiffres tabulaires, transform/opacity uniquement).
3. Dérive lente du fond canvas du hero (grain + flux teal, `prefers-reduced-motion`
   = version statique douce). Rien d'autre n'est déclenché au scroll.

## 6. Reflex check

a) 1er ordre (SSII générique) : hero dégradé bleu marine, 3 cartes services
   identiques, bandeau de chiffres « +50 projets », photo d'équipe stock.
b) 2nd ordre (anti-SaaS) : crème éditorial, serif, illustrations abstraites.
c) Notre déviation : page claire drenchtée bleu/teal de la marque, typo Sora
   oversize qui énonce un mécanisme (« votre devis en 30 secondes »), estimateur
   vivant comme preuve au lieu de chiffres décoratifs.

## 7. House tells brisés

1. **Near-black by default → page claire L≈0.85**, un seul bandeau nuit assumé
   (contact final, rôle fonctionnel : contraste = fin de parcours).
2. **Wordmark-as-hero → le hero est porté par la phrase + l'estimateur** ; le logo
   reste à sa place (header, 32px), jamais agrandi en décor.
