// ===== MENU TOGGLE =====

const menu = document.getElementById('menu');
const menuButton = document.getElementById('menu-button');
const menuLinks = document.querySelectorAll('.menu-link');

let menuState = false;

function toggleMenu() {
  menuState = !menuState;

  if (menuState) {
    menu.style.zIndex = '999';
    menu.classList.remove('deactive');
    menu.classList.add('active');
    menuButton.classList.add('active');
  } else {
    menu.classList.remove('active');
    menu.classList.add('deactive');
    menuButton.classList.remove('active');
    setTimeout(() => { menu.style.zIndex = '-1'; }, 650);
  }
}

menuButton.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (menuState) toggleMenu();
  });
});


// ===== NAVBAR + PARALLAX NO SCROLL =====

const navbar = document.getElementById('navbar');
const homeSection = document.getElementById('home');
const forest = document.querySelector('.forest');
const silhouette = document.querySelector('.silhouette');
const forestInitPos = -300;

window.addEventListener('scroll', () => {
  const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

  if (scrollPos <= window.innerHeight) {
    if (silhouette) silhouette.style.bottom = `${parseInt(scrollPos / 6)}px`;
    if (forest) forest.style.bottom = `${parseInt(forestInitPos + scrollPos / 6)}px`;
  }

  if (homeSection) {
    if (scrollPos - 100 <= window.innerHeight) {
      if (homeSection.style.visibility === 'hidden') homeSection.style.visibility = 'visible';
    } else {
      homeSection.style.visibility = 'hidden';
    }
  }

  if (scrollPos + 100 >= window.innerHeight) navbar.classList.add('bg-active');
  else navbar.classList.remove('bg-active');
});


// ===== SMOOTH SCROLL =====

(function navSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash && hash !== '#') {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    });
  });
})();


// ===== ANIMAÇÃO AO SCROLL =====

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.skill-card, .project, .stat-item, .edu-item').forEach((el) => {
  el.classList.add('hidden-anim');
  observer.observe(el);
});

const animStyle = document.createElement('style');
animStyle.textContent = `
  .hidden-anim { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
  .hidden-anim.show { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(animStyle);


// ===== CURSOR GLOW =====

const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed; width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, rgba(243,0,180,0.12), transparent 70%);
  transform: translate(-50%, -50%); pointer-events: none; z-index: 9998;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});


// ===== PARTÍCULAS =====

function createParticle() {
  const p = document.createElement('div');
  p.style.cssText = `
    position: fixed; width: 3px; height: 3px; background: #f300b4;
    border-radius: 50%; left: ${Math.random() * 100}vw; top: 100vh;
    opacity: ${Math.random() * 0.6 + 0.2}; pointer-events: none; z-index: -1;
  `;
  document.body.appendChild(p);
  const duration = Math.random() * 6000 + 5000;
  p.animate(
    [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-110vh)', opacity: 0 }],
    { duration, easing: 'linear' }
  ).onfinish = () => p.remove();
}

setInterval(createParticle, 1500);


// ===== FORMULÁRIO =====

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit');
    btn.value = 'Enviado! ✓';
    btn.style.background = '#25a244';
    setTimeout(() => {
      btn.value = 'Enviar';
      btn.style.background = '#f300b4';
      contactForm.reset();
    }, 3000);
  });
}