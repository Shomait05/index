document.addEventListener('DOMContentLoaded', () => {
  // Кнопка "Заказать сейчас"
  const orderBtn = document.getElementById('orderBtn');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      orderBtn.classList.add('btn-clicked');
      setTimeout(() => orderBtn.classList.remove('btn-clicked'), 300);
      alert('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.');
    });
    orderBtn.addEventListener('mousedown', () => {
      orderBtn.style.transform = 'translateY(-10px)';
    });
    orderBtn.addEventListener('mouseup', () => {
      orderBtn.style.transform = 'translateY(0)';
    });
  }

  // Выпадающее меню
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    const parentLi = toggle.parentElement;
    const submenu = parentLi.querySelector('.submenu');
    function toggleMenu(show) {
      const isShown = submenu.classList.contains('show');
      if (typeof show === 'boolean') {
        if (show && !isShown) {
          submenu.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
        } else if (!show && isShown) {
          submenu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        }
      } else {
        if (isShown) {
          submenu.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          submenu.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    }
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu(false);
        toggle.focus();
      }
    });
    submenu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleMenu(false);
        toggle.focus();
      }
    });
  });
  document.addEventListener('click', (e) => {
    dropdownToggles.forEach(toggle => {
      const parentLi = toggle.parentElement;
      const submenu = parentLi.querySelector('.submenu');
      if (!parentLi.contains(e.target)) {
        submenu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Переключатель темы
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Форма обратной связи
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formMessage = document.getElementById('formMessage');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const phone = contactForm.phone.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        formMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
        formMessage.style.color = 'red';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Пожалуйста, введите корректный email.';
        formMessage.style.color = 'red';
        return;
      }
      if (phone) {
        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(phone)) {
          formMessage.textContent = 'Пожалуйста, введите телефон в формате +7 (XXX) XXX-XX-XX или оставьте поле пустым.';
          formMessage.style.color = 'red';
          return;
        }
      }
      formMessage.style.color = 'green';
      formMessage.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
      contactForm.reset();
    });
  }

  // Визуальный эффект для кнопок при нажатии клавиш Enter или Space
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('btn')) {
      const btn = document.activeElement;
      btn.style.backgroundColor = '#d1b38a';
      setTimeout(() => {
        btn.style.backgroundColor = '';
      }, 200);
    }
  });

  // Кастомный курсор
  const cursor = document.getElementById('customCursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    const interactiveElements = document.querySelectorAll('a, button, .btn, .menu a');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = '#a67c52';
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = 'transparent';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // Анимация появления элементов при скролле
  const animItems = document.querySelectorAll('.animate-fadein, .animate-slidein-left, .animate-slidein-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animItems.forEach(item => {
      item.classList.remove('visible');
      observer.observe(item);
    });
  } else {
    animItems.forEach(item => item.classList.add('visible'));
  }

  // Параллакс эффект для hero
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      hero.style.backgroundPositionY = offset * 0.5 + 'px';
    });
  }

  // --- Новое событие: смена фона при двойном клике на любой странице ---
  document.body.addEventListener('dblclick', () => {
    const randomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };
    document.body.style.backgroundColor = randomColor();
  });

  // --- Новое событие: на странице контактов при вводе текста меняется фон ---
  if (window.location.pathname.includes('contacts.html')) {
    const randomRgbColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    };
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    const changeBackgroundSmooth = (color) => {
      document.body.style.transition = 'background-color 0.5s ease';
      document.body.style.backgroundColor = color;
    };
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        changeBackgroundSmooth(randomRgbColor());
      });
      input.addEventListener('blur', () => {
        if (document.body.classList.contains('dark')) {
          document.body.style.backgroundColor = '#1e1e1e';
        } else {
          document.body.style.backgroundColor = '#fff8f0';
        }
      });
    });
  }
});

