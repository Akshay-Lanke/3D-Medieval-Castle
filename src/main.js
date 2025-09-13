
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCastle } from './castle/castlestructure.js';

//Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 20);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
document.body.appendChild(renderer.domElement);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Set zoom in and zoom out limits
controls.minDistance = 5;   // Minimum zoom in distance
controls.maxDistance = 40;  // Maximum zoom out distance

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

//Load Texture
const textureLoader = new THREE.TextureLoader();
const yellowTexture = textureLoader.load('./assets/yellow_texture.jpg');
yellowTexture.wrapS = THREE.RepeatWrapping;
yellowTexture.wrapT = THREE.RepeatWrapping;
yellowTexture.repeat.set(2, 1);

//Create Castle
createCastle(scene, yellowTexture);

//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

//Responsive Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
