const toggle = document.getElementById("langToggle");
const textNodes = document.querySelectorAll("[data-en]");
let current = "en";
const navLinks = document.querySelectorAll(".masthead__nav a");

function applyLanguage(lang) {
  current = lang;
  document.documentElement.lang = lang === "en" ? "en" : "zh";
  textNodes.forEach((node) => {
    const value = node.getAttribute(lang === "en" ? "data-en" : "data-zh");
    if (value) {
      node.textContent = value;
    }
  });
}

function highlightSection(targetId) {
  if (!targetId) return;
  const section = document.querySelector(targetId);
  if (!section) return;
  section.classList.remove("section-highlight");
  // Force reflow to restart animation
  void section.offsetWidth;
  section.classList.add("section-highlight");
  window.clearTimeout(section.__highlightTimer);
  section.__highlightTimer = window.setTimeout(() => {
    section.classList.remove("section-highlight");
  }, 1200);
}

toggle.addEventListener("click", () => {
  applyLanguage(current === "en" ? "zh" : "en");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href");
    highlightSection(targetId);
  });
});

window.addEventListener("hashchange", () => {
  highlightSection(window.location.hash);
});

applyLanguage("en");
