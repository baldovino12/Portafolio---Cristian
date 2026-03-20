console.log("Portafolio cargado");
 
// --- TEMA OSCURO / CLARO ---
 
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
 
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(savedTheme);
updateIcon(savedTheme === "dark");
 
toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  document.body.classList.replace(
    isDark ? "dark" : "light",
    isDark ? "light" : "dark"
  );
  localStorage.setItem("theme", isDark ? "light" : "dark");
  updateIcon(!isDark);
  drawNebula();
});
 
function updateIcon(isDark) {
  icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
}
 
// --- NAVBAR al hacer scroll ---
 
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});
 
// --- ANIMACIONES DE ENTRADA ---
 
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);
 
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
 
// --- SCROLL SUAVE ---
 
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
 
// --- CANVAS DE ESTRELLAS Y NEBULOSA ---
 
const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");
 
let stars = [];
let width, height;
 
// ajustar tamaño del canvas al de la ventana
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  drawNebula();
}
 
// crear las estrellas con posición, tamaño y brillo aleatorios
function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2
    });
  }
}
 
// dibujar la nebulosa con gradientes radiales superpuestos
function drawNebula() {
  const isLight = document.body.classList.contains("light");
 
  ctx.clearRect(0, 0, width, height);
 
  // fondo base
  ctx.fillStyle = isLight ? "#08101e" : "#04070f";
  ctx.fillRect(0, 0, width, height);
 
  if (isLight) {
    // nebulosa azul/violeta (referencia imagen 3)
    drawBlob(width * 0.55, height * 0.35, width * 0.7,  "rgba(70, 100, 200, 0.22)");
    drawBlob(width * 0.3,  height * 0.45, width * 0.5,  "rgba(100, 130, 220, 0.15)");
    drawBlob(width * 0.7,  height * 0.25, width * 0.4,  "rgba(120, 80,  200, 0.12)");
    drawBlob(width * 0.2,  height * 0.6,  width * 0.35, "rgba(60,  90,  180, 0.10)");
  } else {
    // nebulosa verde/teal (referencia imagen 2)
    drawBlob(width * 0.55, height * 0.38, width * 0.65, "rgba(20,  90,  55,  0.28)");
    drawBlob(width * 0.3,  height * 0.5,  width * 0.5,  "rgba(10,  60,  40,  0.20)");
    drawBlob(width * 0.75, height * 0.3,  width * 0.4,  "rgba(15,  70,  45,  0.15)");
    drawBlob(width * 0.15, height * 0.65, width * 0.3,  "rgba(8,   50,  35,  0.12)");
  }
}
 
// gradiente radial para cada mancha de nebulosa
function drawBlob(x, y, radius, color) {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}
 
// loop de animación: parpadeo suave de estrellas
let frame = 0;
function animate() {
  requestAnimationFrame(animate);
  frame++;
 
  if (frame % 2 === 0) drawNebula();
 
  stars.forEach(s => {
    const twinkle = Math.sin(frame * s.speed + s.phase) * 0.4 + 0.6;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * twinkle})`;
    ctx.fill();
  });
}
 
// iniciar
window.addEventListener("resize", () => {
  resize();
  createStars(220);
});
 
resize();
createStars(220);
animate();
 
// --- TYPING DE CÓDIGO EN LA LAPTOP ---
 
const codeDisplay = document.getElementById("code-display");
 
if (codeDisplay) {
  const codeLines = [
    '<span style="color:#ff7b72">const</span> <span style="color:#79c0ff">developer</span> = {',
    '  <span style="color:#79c0ff">name</span>: <span style="color:#a5d6ff">"Cristian"</span>,',
    '  <span style="color:#79c0ff">role</span>: <span style="color:#a5d6ff">"Web Developer"</span>,',
    '  <span style="color:#79c0ff">skills</span>: [',
    '    <span style="color:#a5d6ff">"HTML"</span>, <span style="color:#a5d6ff">"CSS"</span>,',
    '    <span style="color:#a5d6ff">"JavaScript"</span>,',
    '    <span style="color:#a5d6ff">"Bootstrap"</span>,',
    '    <span style="color:#a5d6ff">"Python"</span>',
    '  ],',
    '  <span style="color:#79c0ff">available</span>: <span style="color:#ff7b72">true</span>',
    '};',
    '',
    '<span style="color:#8b949e">// Listo para trabajar!</span>',
    '<span style="color:#ff7b72">console</span>.<span style="color:#d2a8ff">log</span>(<span style="color:#a5d6ff">"Hola mundo"</span>);',
  ];
 
  const plainLines = codeLines.map(l => l.replace(/<[^>]+>/g, ""));
  let lineIndex = 0, charIndex = 0, currentHTML = "";
 
  function typeLine() {
    if (lineIndex >= codeLines.length) {
      setTimeout(() => {
        lineIndex = 0; charIndex = 0; currentHTML = "";
        codeDisplay.innerHTML = "";
        typeLine();
      }, 3000);
      return;
    }
 
    const plain = plainLines[lineIndex];
 
    if (charIndex === plain.length) {
      currentHTML += codeLines[lineIndex] + "\n";
      codeDisplay.innerHTML = currentHTML;
      lineIndex++; charIndex = 0;
      setTimeout(typeLine, 80);
    } else {
      codeDisplay.innerHTML = currentHTML + plain.slice(0, charIndex);
      charIndex++;
      setTimeout(typeLine, 35);
    }
  }
 
  setTimeout(typeLine, 800);
}
 