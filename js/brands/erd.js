// Canvas paint effect
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paint splatter effect
class PaintDrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.alpha = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
    this.alpha -= 0.005;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const paintDrops = [];
function createPaintSplatter() {
  for (let i = 0; i < 50; i++) {
    paintDrops.push(new PaintDrop());
  }
}

function animatePaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < paintDrops.length; i++) {
    paintDrops[i].update();
    paintDrops[i].draw();

    if (paintDrops[i].size <= 0.2 || paintDrops[i].alpha <= 0) {
      paintDrops.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animatePaint);
}

// Glitch text effect
function glitchText() {
  const titles = document.querySelectorAll(
    ".main-title, .section-title, .manifesto-line",
  );

  titles.forEach((title) => {
    title.addEventListener("mouseenter", function () {
      const originalText = this.textContent;
      let glitchedText = "";

      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.9) {
          glitchedText += String.fromCharCode(33 + Math.random() * 94);
        } else {
          glitchedText += originalText[i];
        }
      }

      this.textContent = glitchedText;

      setTimeout(() => {
        this.textContent = originalText;
      }, 200);
    });
  });
}

// Random movement for collage items
function chaoticMovement() {
  const items = document.querySelectorAll(".collage-item, .gallery-item");

  items.forEach((item) => {
    const randomX = (Math.random() - 0.5) * 20;
    const randomY = (Math.random() - 0.5) * 20;
    const randomRotate = (Math.random() - 0.5) * 5;

    item.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;

    item.addEventListener("mouseenter", function () {
      this.style.transform = "translate(0, 0) rotate(0deg)";
      this.style.transition = "transform 0.5s ease";
    });

    item.addEventListener("mouseleave", function () {
      const newX = (Math.random() - 0.5) * 20;
      const newY = (Math.random() - 0.5) * 20;
      const newRotate = (Math.random() - 0.5) * 5;
      this.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRotate}deg)`;
    });
  });
}

// Psychedelic color shift
function psychedelicShift() {
  const elements = document.querySelectorAll(
    ".main-title, .nav-link, .section-title",
  );

  setInterval(() => {
    elements.forEach((el) => {
      const hue = Math.random() * 360;
      el.style.filter = `hue-rotate(${hue}deg)`;
    });
  }, 3000);
}

// Text scramble effect for manifesto
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Initialize all effects
document.addEventListener("DOMContentLoaded", function () {
  // Canvas paint
  createPaintSplatter();
  animatePaint();

  // Glitch effects
  glitchText();

  // Chaotic movement
  chaoticMovement();

  // Psychedelic colors
  psychedelicShift();

  // Text scramble for manifesto
  const phrases = [
    "МЫ - ДЕТИ ИЗОБИЛИЯ И ПУСТОТЫ",
    "НАШЕ БОГАТСТВО - НАША ЗОЛОТАЯ ТЮРЬМА",
    "НАША ДЕПРЕССИЯ - НАША ЕДИНСТВЕННАЯ АУТЕНТИЧНОСТЬ",
    "МЫ РАЗРУШАЕМ ТО, ЧТО УНАСЛЕДОВАЛИ",
    "ИБО НАСЛЕДИЕ - ВЕЛИЧАЙШЕЕ НАСИЛИЕ",
    "НАША ЭЛЕГАНТНОСТЬ - В РАЗЛОЖЕНИИ",
    "НАША РОСКОШЬ - В ПРЕЗРЕНИИ К РОСКОШИ",
    "МЫ НОСИМ СВОИ РАНЫ КАК УКРАШЕНИЯ",
    "НАШЕ ВОССТАНИЕ - ЭСТЕТИЧЕСКИЙ ТУПИК",
    "И МЫ ПРЕКРАСНЫ В СВОЕМ ПАДЕНИИ",
  ];

  const el = document.querySelector(".manifesto-line");
  const fx = new TextScramble(el);
  let counter = 0;

  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();

  // Random paint splatters on click
  document.addEventListener("click", function (e) {
    for (let i = 0; i < 10; i++) {
      const drop = new PaintDrop();
      drop.x = e.clientX + (Math.random() - 0.5) * 100;
      drop.y = e.clientY + (Math.random() - 0.5) * 100;
      paintDrops.push(drop);
    }
  });

  // Mouse trail effect
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create occasional paint drops along mouse trail
    if (Math.random() > 0.7) {
      const drop = new PaintDrop();
      drop.x = mouseX;
      drop.y = mouseY;
      drop.size = Math.random() * 3 + 1;
      paintDrops.push(drop);
    }
  });

  // Periodic chaotic rearrangements
  setInterval(() => {
    chaoticMovement();
    createPaintSplatter();
  }, 10000);
});

// Resize handling
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
