/**
 * Sasnaka Talent Show AR - Main Script
 * Using Three.js and AR.js
 */

let scene, camera, renderer, clock;
let arToolkitSource, arToolkitContext;
let markerRoot;
let raycaster, mouse;
let stage, dancer, microphone;
let mixer; // Animation mixer for the dancer
let floatingObjects = [];

const statusElement = document.getElementById('status');

function updateStatus(msg, isError = false) {
    statusElement.innerText = msg;
    if (isError) {
        statusElement.style.color = '#ff4444';
        console.error(msg);
    }
}

// Initialize the scene after everything is loaded
window.onload = function () {
    try {
        if (typeof THREE === 'undefined') {
            throw new Error('Three.js failed to load. Please refresh the page.');
        }
        if (typeof THREEx === 'undefined') {
            throw new Error('AR.js (THREEx) could not be found. This often happens if the script is blocked by a browser extension (like Brave Shields or AdBlock).');
        }
        init();
        animate();
    } catch (e) {
        updateStatus('Critical Error: ' + e.message, true);
    }
};

function init() {
    updateStatus('Initializing Scene...');

    // 1. Setup Scene, Camera, Renderer
    scene = new THREE.Scene();

    // Ambient light
    let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    scene.add(ambientLight);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 20);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();

    updateStatus('Setting up Camera...');

    // 2. Setup AR.js toolkit
    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
        }
    }

    arToolkitSource.init(function onReady() {
        updateStatus('Camera Source Ready');
        onResize();
    }, function onError(err) {
        updateStatus('Camera Error: ' + err, true);
    });

    window.addEventListener('resize', function () {
        onResize();
    });

    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
        detectionMode: 'mono',
    });

    updateStatus('Initializing AR Context...');
    arToolkitContext.init(function onCompleted() {
        updateStatus('AR Context Initialized');
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // 3. Setup Marker Root
    markerRoot = new THREE.Group();
    scene.add(markerRoot);

    // Using the Hiro marker for now (default)
    let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro',
    });

    updateStatus('Loading 3D Models...');

    // 4. Load Models
    const loader = new THREE.GLTFLoader();

    // Stage
    loader.load('models/stage.glb', (gltf) => {
        stage = gltf.scene;
        stage.scale.set(0.5, 0.5, 0.5);
        markerRoot.add(stage);
    }, undefined, (error) => {
        console.warn('Placeholder: stage.glb not found. Creating a temporary cube.');
        createPlaceholderStage();
    });

    // Dancer
    loader.load('models/dancer.glb', (gltf) => {
        dancer = gltf.scene;
        dancer.scale.set(0.2, 0.2, 0.2);
        dancer.position.y = 0.5; // Sit on stage
        markerRoot.add(dancer);

        // Animation
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(dancer);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }
    }, undefined, (error) => {
        console.warn('Placeholder: dancer.glb not found.');
    });

    // Microphone (The Interactive Button)
    loader.load('models/microphone.glb', (gltf) => {
        microphone = gltf.scene;
        microphone.scale.set(0.1, 0.1, 0.1);
        microphone.position.set(0.5, 1, 0);
        markerRoot.add(microphone);
    }, undefined, (error) => {
        console.warn('Placeholder: microphone.glb not found. Creating a temporary sphere.');
        createPlaceholderMicrophone();
    });

    // 5. Add Lighting Effects
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 0);
    spotLight.target = markerRoot;
    markerRoot.add(spotLight);

    // 6. Floating Stars/Notes
    createFloatingParticles();

    // 7. Click/Tap Interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    window.addEventListener('click', onDocumentMouseDown, false);
    window.addEventListener('touchstart', onDocumentTouchStart, false);

    // Final Setup Status
    setTimeout(() => {
        if (statusElement.innerText.includes('Error')) return;
        updateStatus('AR Ready! Point at Hiro Marker.');
    }, 2000);
}

function createPlaceholderStage() {
    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const mesh = new THREE.Mesh(geometry, material);
    markerRoot.add(mesh);
}

function createPlaceholderMicrophone() {
    const geometry = new THREE.SphereGeometry(0.15, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 0.5
    });
    microphone = new THREE.Mesh(geometry, material);
    microphone.position.set(0.8, 1, 0);
    markerRoot.add(microphone);
}

function createFloatingParticles() {
    const starGeo = new THREE.OctahedronGeometry(0.05, 0);
    const starMat = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    for (let i = 0; i < 10; i++) {
        const star = new THREE.Mesh(starGeo, starMat);
        star.position.set(
            (Math.random() - 0.5) * 2,
            Math.random() * 2,
            (Math.random() - 0.5) * 2
        );
        markerRoot.add(star);
        floatingObjects.push(star);
    }
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    checkIntersection();
}

function onDocumentTouchStart(event) {
    if (event.touches.length > 0) {
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        checkIntersection();
    }
}

function checkIntersection() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markerRoot.children, true);

    if (intersects.length > 0) {
        let object = intersects[0].object;
        let isMicrophone = false;
        object.traverseAncestors((ancestor) => {
            if (ancestor === microphone) isMicrophone = true;
        });
        if (object === microphone) isMicrophone = true;

        if (isMicrophone) {
            window.open('https://example.com/apply', '_blank');
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (arToolkitSource && arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
    }

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    // Animate floating objects
    floatingObjects.forEach((obj, i) => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
    });

    // Pulse microphone
    if (microphone) {
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        if (microphone.scale.set && typeof microphone.scale.set === 'function') {
            microphone.scale.set(scale * 0.1, scale * 0.1, scale * 0.1);
        } else if (microphone.scale) {
            microphone.scale.x = microphone.scale.y = microphone.scale.z = scale * 1.0;
        }
    }

    renderer.render(scene, camera);
}

