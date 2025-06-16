// ---------------------------
// 🌟 Twinkling Starfield
// ---------------------------
const starCanvas = document.getElementById('starCanvas');
const ctx = starCanvas.getContext('2d');
let width, height;
let stars = [];

function resizeStars() {
  width = starCanvas.width = window.innerWidth;
  height = starCanvas.height = window.innerHeight;
  createStars(300);
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      flicker: Math.random() * 0.02 + 0.01,
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  for (let star of stars) {
    star.alpha += star.flicker * (Math.random() < 0.5 ? -1 : 1);
    star.alpha = Math.max(0.3, Math.min(1, star.alpha));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.shadowBlur = 8;
    ctx.fill();
  }
  requestAnimationFrame(animateStars);
}

resizeStars();
window.addEventListener('resize', resizeStars);
animateStars();


// ---------------------------
// 🌫️ Three.js Fog Layer
// ---------------------------
const threeCanvas = document.getElementById('threeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d001a, 0.002);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

function animateFog() {
  requestAnimationFrame(animateFog);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animateFog();
