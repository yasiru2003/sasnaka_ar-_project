document.addEventListener('DOMContentLoaded', () => {
    const actionBtn = document.getElementById('action-btn');
    const startBtn = document.getElementById('start-btn');
    const splashScreen = document.getElementById('splash-screen');
    const uiOverlay = document.getElementById('ui-overlay');
    const crystal = document.querySelector('a-octahedron');
    const instructionText = document.getElementById('instruction-text');
    const hiroMarker = document.querySelector('a-marker[preset="hiro"]');
    const kanjiMarker = document.querySelector('a-marker[preset="kanji"]');

    // Gallery Elements
    const galleryBtn = document.getElementById('gallery-btn');
    const closeGallery = document.getElementById('close-gallery');
    const markerGallery = document.getElementById('marker-gallery');

    // Splash screen logic
    startBtn.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            uiOverlay.style.display = 'flex';
        }, 800);
    });

    let interactionCount = 0;
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

    // Interaction logic
    actionBtn.addEventListener('click', () => {
        interactionCount++;
        const nextColor = colors[interactionCount % colors.length];
        const crystal = document.querySelector('a-octahedron');

        // Change color with animation
        crystal.setAttribute('animation__color', {
            property: 'material.color',
            to: nextColor,
            dur: 500,
            easing: 'easeOutQuad'
        });

        crystal.setAttribute('animation__emissive', {
            property: 'material.emissive',
            to: nextColor,
            dur: 500,
            easing: 'easeOutQuad'
        });

        // Haptic-like feedback via UI
        actionBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            actionBtn.style.transform = 'scale(1)';
        }, 100);
    });

    // Marker detection UI feedback
    hiroMarker.addEventListener('markerFound', () => {
        instructionText.innerHTML = "HIRO DETECTED: CRYSTAL CORE";
        instructionText.style.background = "rgba(16, 185, 129, 0.2)";
        instructionText.style.borderColor = "rgba(16, 185, 129, 0.5)";
    });

    hiroMarker.addEventListener('markerLost', () => {
        instructionText.innerHTML = "Find a Marker (Hiro or Kanji)";
        instructionText.style.background = "rgba(255, 255, 255, 0.1)";
        instructionText.style.borderColor = "rgba(255, 255, 255, 0.2)";
    });

    kanjiMarker.addEventListener('markerFound', () => {
        instructionText.innerHTML = "KANJI DETECTED: MODERN TALENT";
        instructionText.style.background = "rgba(236, 72, 153, 0.2)";
        instructionText.style.borderColor = "rgba(236, 72, 153, 0.5)";
    });

    kanjiMarker.addEventListener('markerLost', () => {
        instructionText.innerHTML = "Find a Marker (Hiro or Kanji)";
        instructionText.style.background = "rgba(255, 255, 255, 0.1)";
        instructionText.style.borderColor = "rgba(255, 255, 255, 0.2)";
    });

    // Info button
    document.getElementById('info-btn').addEventListener('click', () => {
        alert("Sasnaka AR Experience\n1. Find a 'Hiro' marker (Standard AR.js marker)\n2. Point your camera at it\n3. Interact with the digital talent!");
    });
});
