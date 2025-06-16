// Star field canvas setup
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.01,
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

createStars(300);
animateStars();


// Three.js fog effect
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d001a, 0.002);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.zIndex = 1;
document.body.appendChild(renderer.domElement);

function animateFog() {
  requestAnimationFrame(animateFog);
  renderer.render(scene, camera);
}

animateFog();
