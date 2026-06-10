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


// ===== NAVBAR BACKGROUND ON SCROLL =====

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
      if (homeSection.style.visibility === 'hidden') {
        homeSection.style.visibility = 'visible';
      }
    } else {
      homeSection.style.visibility = 'hidden';
    }
  }

  if (scrollPos + 100 >= window.innerHeight) {
    navbar.classList.add('bg-active');
  } else {
    navbar.classList.remove('bg-active');
  }
});


// ===== SMOOTH SCROLLING =====

(function navSmoothScrolling() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
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


// ===== CONTACT FORM =====

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