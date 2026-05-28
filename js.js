window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (header) {
    header.classList.toggle("sticky", window.scrollY > 0);
  }
});

// ===== CURSOR GLOW =====

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

// ===== ANIMAÇÃO AO SCROLL =====

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll(
    ".experience-card, .bar, .img-card, .about-img, .about-info"
  )
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// ===== EFEITO 3D NOS CARDS =====

document.querySelectorAll(".img-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      translateY(0)
    `;
  });
});

// ===== PARTÍCULAS =====

function createParticle() {
  const particle = document.createElement("div");

  particle.style.position = "fixed";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "#ff4fd8";
  particle.style.borderRadius = "50%";

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = "100vh";

  particle.style.opacity = Math.random();

  particle.style.pointerEvents = "none";
  particle.style.zIndex = "-1";

  document.body.appendChild(particle);

  const duration = Math.random() * 5000 + 5000;

  particle.animate(
    [
      {
        transform: "translateY(0)",
        opacity: 1,
      },
      {
        transform: "translateY(-120vh)",
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: "linear",
    }
  ).onfinish = () => {
    particle.remove();
  };
}

setInterval(createParticle, 300);