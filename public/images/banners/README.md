# Bannières produits

Placez les bannières (ratio 702 × 260, format `.png`) dans ce dossier avec ces noms exacts :

- `pack-bureaux-etudes.png` — "DEVIENS UN MONSTRE en dimensionnement"
- `manager-toolkit.png` — "GÈRES MIEUX TES PROJETS"
- `pack-controle-qualite.png` — "SIMPLIFIES TON CONTROLE QUALITE"
- `template-gantt.png` — "GAGNES +10H EN PLANIFICATION"
- `copilote-gestion-financiere.png` — "CONTROLES TES FINANCES"
- `formation-excel-specialiste.png` — bannière formation Excel
- `kit-normes-iso.png` — bannière kit normes ISO
- `formation-civil-3d-2025.png` — bannière Civil 3D

Si le fichier n'existe pas, la bannière est simplement masquée sur la fiche produit (fallback gracieux dans `ProductBanner.jsx`).

Après avoir ajouté les fichiers, lance `node scripts/optimize-images.mjs` pour les compresser automatiquement.
