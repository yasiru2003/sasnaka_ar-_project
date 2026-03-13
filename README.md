# Sasnaka Talent Show AR

Welcome to the Sasnaka Talent Show AR application. This project uses [Three.js](https://threejs.org/) and [AR.js](https://ar-js-org.github.io/AR.js-Docs/) to create an immersive augmented reality experience.

## Features
- **Marker-based AR**: Point your phone camera at a marker to see the stage.
- **3D Animation**: A dancing character and floating musical notes.
- **Interactivity**: Click the 3D microphone to open the application form.

## Setup Instructions

### 1. Add Your Models
Place your GLB models in the `models/` directory:
- `stage.glb`
- `dancer.glb`
- `microphone.glb`

### 2. Generate Custom Marker
1. Go to the [AR.js Marker Training Tool](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html).
2. Upload your university logo or pattern.
3. Download the `.patt` file and name it `pattern-talent-marker.patt`.
4. Place it in the `markers/` folder.
5. In `main.js`, update the `ArMarkerControls` configuration:
   ```javascript
   let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
       type: 'pattern',
       patternUrl: 'markers/pattern-talent-marker.patt',
   });
   ```

### 3. Hosting on GitHub Pages
1. Create a new repository on GitHub.
2. Push this project to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial AR Talent Show App"
   git remote add origin https://github.com/YOUR_USERNAME/Sasnaka_Talent.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** in your GitHub repository.
4. Set the source to the `main` branch and click Save.
5. Your AR experience will be live at `https://YOUR_USERNAME.github.io/Sasnaka_Talent/`.

## Note for Mobile
- Only works on HTTPS. GitHub Pages provides this by default.
- Grant camera permissions when prompted.
