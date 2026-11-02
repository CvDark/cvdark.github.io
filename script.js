// ==========================================================
// Muhammad Naufal | Portfolio Scripts
// ==========================================================

// 1. Typing effect in the hero section
const roles = [
  "Data Engineering Student",
  "Full-Stack Developer",
  "IoT & Hardware Builder",
  "Local AI Enthusiast"
];

const typingEl = document.querySelector(".typing-text");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingEl) return;

  const current = roles[roleIndex];

  if (!deleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

// 2. Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 3. Reveal sections on scroll
const revealTargets = document.querySelectorAll(
  ".section .section-title, .about-text, .info-card, .skill-card, .project-card, .timeline-item, .beyond-card, .contact-card"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

// 4. Highlight the active nav link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.style.color =
      anchor.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});

// 5. Automatic footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
