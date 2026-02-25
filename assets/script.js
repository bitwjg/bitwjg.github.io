const toggle = document.getElementById("langToggle");
const textNodes = document.querySelectorAll("[data-en]");
let current = "en";

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

toggle.addEventListener("click", () => {
  applyLanguage(current === "en" ? "zh" : "en");
});

applyLanguage("en");
