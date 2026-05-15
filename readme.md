# Video Floating Navigator

Extension Chrome qui affiche un bouton directement sur les vidéos pour les détacher du navigateur et les faire flotter par-dessus toutes les fenêtres.

## Fonctionnement

Au survol d'une vidéo, un bouton **Détacher** apparaît en haut. Un clic active le mode Picture-in-Picture natif du navigateur : la vidéo devient une fenêtre flottante, redimensionnable et toujours visible par-dessus toutes les autres fenêtres et applications.

Le bouton apparaît aussi automatiquement pendant 2,5 secondes au démarrage d'une vidéo.

Fonctionne sur les vidéos chargées dynamiquement (YouTube, Twitch, Netflix, et tout site utilisant une balise `<video>`).

## Installation

1. Cloner le dépôt
   ```bash
   git clone https://github.com/LoganDELMAIRE/Video-floating-navigator.git
   ```
2. Ouvrir `chrome://extensions/` dans Chrome
3. Activer le **Mode développeur** (bouton en haut à droite)
4. Cliquer **Charger l'extension non empaquetée**
5. Sélectionner le dossier cloné

## Structure

```
├── manifest.json   # Configuration Manifest V3
├── content.js      # Détection des vidéos et injection du bouton
├── content.css     # Style du bouton flottant
└── icons/          # Icônes 16 / 48 / 128 px
```

## Compatibilité

Nécessite Chrome 92+ (support Picture-in-Picture API).
