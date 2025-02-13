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


class Carousel {
  constructor(container) {
      this.container = container;
      this.carousel = container.querySelector('.carousel');
      this.items = container.querySelectorAll('.carousel-item');
      this.prevButton = container.querySelector('.prev');
      this.nextButton = container.querySelector('.next');
      this.navContainer = container.querySelector('.carousel-nav');
      this.currentIndex = 0;
      
      this.init();
  }

  init() {
      // Criar dots de navegação
      this.items.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('carousel-dot');
          dot.addEventListener('click', () => this.goToSlide(index));
          this.navContainer.appendChild(dot);
      });

      // Configurar botões
      this.prevButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.prev();
      });
      this.nextButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.next();
      });

      // Impedir que os botões afetem os links
      this.prevButton.addEventListener('click', (e) => e.stopPropagation());
      this.nextButton.addEventListener('click', (e) => e.stopPropagation());

      // Atualizar estado inicial
      this.updateCarousel();

      // Adicionar suporte a touch
      this.setupTouchEvents();
  }

  updateCarousel() {
      this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      
      const dots = this.navContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === this.currentIndex);
      });
  }

  next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.updateCarousel();
  }

  prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.updateCarousel();
  }

  goToSlide(index) {
      this.currentIndex = index;
      this.updateCarousel();
  }

  setupTouchEvents() {
      let startX, moveX;
      let isDragging = false;
      const threshold = 50;

      this.carousel.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
      });

      this.carousel.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          moveX = e.touches[0].clientX;
          const diff = startX - moveX;
          
          // Prevenir scroll vertical durante o swipe
          if (Math.abs(diff) > 10) {
              e.preventDefault();
          }
      });

      this.carousel.addEventListener('touchend', () => {
          if (!isDragging) return;
          const diff = startX - moveX;
          if (Math.abs(diff) > threshold) {
              if (diff > 0) {
                  this.next();
              } else {
                  this.prev();
              }
          }
          isDragging = false;
      });
  }
}

// Inicializar o carrossel
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  new Carousel(container);
});