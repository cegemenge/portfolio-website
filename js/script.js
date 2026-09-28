// Homepage interactions and shared portfolio behavior.

const typingElement = document.getElementById("typing");
const words = ["Data Analyst", "Business Intelligence", "Applied Machine Learning"];

if (typingElement) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const current = words[wordIndex];
    typingElement.textContent = current.slice(0, charIndex);

    if (deleting) {
      charIndex -= 1;
      if (charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
      }
    } else {
      charIndex += 1;
      if (charIndex > current.length) {
        deleting = true;
        window.setTimeout(typeEffect, 1400);
        return;
      }
    }

    window.setTimeout(typeEffect, deleting ? 45 : 90);
  }

  typeEffect();
}

// Reveal sections as they enter the viewport.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll("section, .card, .project-card, .skill-card")
    .forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll("section, .card, .project-card, .skill-card")
    .forEach((element) => element.classList.add("show"));
}

// Animate numeric cards only when their text contains a number.
document.querySelectorAll(".stats .card h2").forEach((counter) => {
  const target = Number.parseInt(counter.textContent, 10);
  if (!Number.isFinite(target)) return;

  let current = 0;
  const step = Math.max(1, Math.ceil(target / 80));
  const update = () => {
    current = Math.min(target, current + step);
    counter.textContent = current === target ? target + "+" : current + "+";
    if (current < target) window.requestAnimationFrame(update);
  };
  update();
});

// Add a subtle shadow to the header after scrolling.
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) header.style.boxShadow = window.scrollY > 40
    ? "0 10px 25px rgba(0, 0, 0, .15)"
    : "none";
}, { passive: true });

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("header nav");
if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => navigation.classList.toggle("open"));
}

// Dark mode.
const themeButton = document.getElementById("themeToggle");
if (themeButton) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀";
  }

  themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeButton.textContent = isDark ? "☀" : "🌙";
  });
}

// Back-to-top control.
const topButton = document.createElement("button");
topButton.type = "button";
topButton.textContent = "↑";
topButton.className = "topButton";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
  topButton.style.display = window.scrollY > 500 ? "flex" : "none";
}, { passive: true });

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Footer year and current-page navigation state.
const footerText = document.querySelector("footer p");
if (footerText) {
  footerText.textContent = "© " + new Date().getFullYear() + " Odunayo Osilaja. All Rights Reserved.";
}

document.querySelectorAll("nav a").forEach((link) => {
  if (link.href === window.location.href) link.classList.add("active");
});
