// Анимация появления элементов при скролле
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeElements.forEach((element) => {
    fadeInObserver.observe(element);
  });

  // Эффект кровавых пятен
  document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.985) {
      // Случайное появление пятен
      createBloodEffect(e.clientX, e.clientY);
    }
  });

  function createBloodEffect(x, y) {
    // Создаем основное пятно
    const mainSpot = document.createElement("div");
    mainSpot.classList.add("blood-spot", "main");
    mainSpot.style.left = x - 20 + "px";
    mainSpot.style.top = y - 20 + "px";
    document.body.appendChild(mainSpot);

    // Создаем брызги вокруг
    const splashCount = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < splashCount; i++) {
      const splash = document.createElement("div");
      splash.classList.add("blood-spot", "splash");

      // Случайное смещение от центра
      const offsetX = Math.random() * 40 - 20;
      const offsetY = Math.random() * 40 - 20;

      splash.style.left = x + offsetX + "px";
      splash.style.top = y + offsetY + "px";

      // Случайный размер
      const size = 5 + Math.random() * 10;
      splash.style.width = size + "px";
      splash.style.height = size + "px";

      document.body.appendChild(splash);

      // Активируем брызги
      setTimeout(() => {
        splash.classList.add("active");
      }, 50 * i);

      // Удаляем брызги
      setTimeout(
        () => {
          splash.classList.add("fade-out");
          setTimeout(() => {
            if (splash.parentNode) {
              document.body.removeChild(splash);
            }
          }, 2000);
        },
        1500 + Math.random() * 1000,
      );
    }

    // Создаем след (иногда)
    if (Math.random() > 0.7) {
      const trail = document.createElement("div");
      trail.classList.add("blood-trail");
      trail.style.left = x - 10 + "px";
      trail.style.top = y - 5 + "px";

      // Случайная длина и направление
      const length = 50 + Math.random() * 100;
      trail.style.width = length + "px";
      const angle = Math.random() * 360;
      trail.style.transform = `scaleX(0) rotate(${angle}deg)`;

      document.body.appendChild(trail);

      setTimeout(() => {
        trail.classList.add("active");
      }, 100);

      setTimeout(() => {
        trail.classList.add("fade-out");
        setTimeout(() => {
          if (trail.parentNode) {
            document.body.removeChild(trail);
          }
        }, 1500);
      }, 1200);
    }

    // Активируем основное пятно
    setTimeout(() => {
      mainSpot.classList.add("active");
    }, 10);

    // Удаляем основное пятно
    setTimeout(() => {
      mainSpot.classList.add("fade-out");
      setTimeout(() => {
        if (mainSpot.parentNode) {
          document.body.removeChild(mainSpot);
        }
      }, 2000);
    }, 2000);
  }

  // Искажение текста при клике
  const distortionElements = document.querySelectorAll(".distortion");
  distortionElements.forEach((element) => {
    element.addEventListener("click", function () {
      this.classList.add("active");
      setTimeout(() => {
        this.classList.remove("active");
      }, 200);
    });
  });

  // Интерактивный текст
  const interactiveTexts = document.querySelectorAll(".interactive-text");
  interactiveTexts.forEach((text) => {
    text.addEventListener("click", function () {
      const message = document.querySelector(".hidden-message");
      message.classList.add("active");

      setTimeout(() => {
        message.classList.remove("active");
      }, 3000);
    });
  });

  // Случайное мерцание элементов
  setInterval(() => {
    const randomElement =
      distortionElements[Math.floor(Math.random() * distortionElements.length)];
    randomElement.classList.add("active");
    setTimeout(() => {
      randomElement.classList.remove("active");
    }, 100);
  }, 3000);
});
