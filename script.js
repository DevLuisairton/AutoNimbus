// Seleção de elementos
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Função para alternar o menu mobile com animação
const toggleMobileMenu = () => {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
};

// Função para fechar o menu ao clicar em um link
const closeMenuOnClick = () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
};

// Smooth scroll para links de navegação
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
};

// Animação do navbar ao fazer scroll
const initNavbarScroll = () => {
  window.addEventListener('scroll', () => {
    navbar.style.backgroundColor =
      window.scrollY > 50
        ? 'rgba(0, 102, 204, 0.95)'
        : 'var(--primary-blue)';
    navbar.style.transition = 'background-color 0.3s ease';
  });
};


// Animação de scroll para elementos ao entrar na viewport
const initScrollAnimation = () => {
  const elements = document.querySelectorAll(
    '.service-card, .about-content, .contact-form'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(element => {
    Object.assign(element.style, {
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'all 0.5s ease-out',
    });
    observer.observe(element);
  });
};

// Remover estado do menu em redimensionamentos da janela
const handleWindowResize = () => {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
};

// Inicialização de todas as funcionalidades
const initializeAll = () => {
  toggleMobileMenu();
  closeMenuOnClick();
  initSmoothScroll();
  initNavbarScroll();
  initFormValidation();
  initScrollAnimation();
  handleWindowResize();
};

// Executar quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', initializeAll);
