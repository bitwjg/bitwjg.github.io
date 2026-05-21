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
      if (node.getAttribute("data-rich") === "research-hiring") {
        node.innerHTML = renderHiringNote(lang);
      } else {
        node.textContent = value;
      }
    }
  });
}

function renderHiringNote(lang) {
  if (lang === "zh") {
    return '我的团队目前正在开展大语言模型 <span class="keyword-highlight">recursive self-improvement</span> 与 <span class="keyword-highlight">automated research</span> 方向的研究。我们正在寻找有兴趣加入的实习生和正式研究员，欢迎感兴趣的同学和研究者与我联系。';
  }
  return 'My team is currently working on <span class="keyword-highlight">recursive self-improvement</span> and <span class="keyword-highlight">automated research</span> for large language models. We are looking for motivated interns and full-time researchers to join us. Please feel free to reach out if you are interested.';
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

if (toggle) {
  toggle.addEventListener("click", () => {
    applyLanguage(current === "en" ? "zh" : "en");
  });
}

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
