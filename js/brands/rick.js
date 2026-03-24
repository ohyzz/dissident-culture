document.addEventListener("DOMContentLoaded", function () {
  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Наблюдатель для всех секций и элементов
  document
    .querySelectorAll(
      ".section, .philosophy-card, .aesthetic-item, .store-card",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px)";
      el.style.transition = "all 0.8s ease";
      observer.observe(el);
    });

  // Слайдер цитат
  const quotes = document.querySelectorAll(".quote");
  let currentQuote = 0;

  function showNextQuote() {
    quotes[currentQuote].classList.remove("active");
    currentQuote = (currentQuote + 1) % quotes.length;
    quotes[currentQuote].classList.add("active");
  }

  setInterval(showNextQuote, 5000);

  // Карусель коллекций
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let currentSlide = 0;

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  prevBtn.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    updateCarousel();
  });

  // Эффекты при наведении на интерактивные элементы
  const interactiveElements = document.querySelectorAll(
    "button, a, .nav-items span, .philosophy-card, .store-card",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
    });
  });

  // Плавный скролл для всех внутренних ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Интерактивные поляроиды
  const polaroids = document.querySelectorAll(".polaroid");

  polaroids.forEach((polaroid) => {
    polaroid.addEventListener("mousemove", (e) => {
      const rect = polaroid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      polaroid.style.transform = `rotate(2deg) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    polaroid.addEventListener("mouseleave", () => {
      polaroid.style.transform = "rotate(2deg)";
    });
  });

  // Анимация статистики
  const stats = document.querySelectorAll(".stat-number");

  function animateStats() {
    stats.forEach((stat) => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + "+";
      }, 30);
    });
  }

  // Запуск анимации статистики при попадании в область видимости
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".influence-stats").forEach((el) => {
    statsObserver.observe(el);
  });
});
