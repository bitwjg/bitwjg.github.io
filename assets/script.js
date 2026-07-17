const toggle = document.getElementById("langToggle");
const textNodes = document.querySelectorAll("[data-en]");
const languageContentNodes = document.querySelectorAll("[data-lang-content]");
let current = "en";
const navLinks = document.querySelectorAll(".masthead__nav a");
const pubFilterButtons = document.querySelectorAll(".pub-filter-btn");
const pubYearGroups = document.querySelectorAll(".pub-year");
const pubFilterEmpty = document.querySelector(".pub-filter-empty");

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
  languageContentNodes.forEach((node) => {
    node.hidden = node.getAttribute("data-lang-content") !== lang;
  });
}

function renderHiringNote(lang) {
  if (lang === "zh") {
    return '我的团队目前正在开展大语言模型 <span class="keyword-highlight">recursive self-improvement</span> 与 <span class="keyword-highlight">automated research</span> 方向的研究。我们正在寻找有兴趣加入的实习生和正式研究员，欢迎感兴趣的同学和研究者与我联系。';
  }
  return 'My team is currently working on <span class="keyword-highlight">recursive self-improvement</span> and <span class="keyword-highlight">automated research</span> for large language models. We are looking for motivated interns and full-time researchers to join us. Please feel free to reach out if you are interested.';
}

function highlightSection(targetId) {
  if (!targetId || !targetId.startsWith("#")) return;
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

function setPublicationFilter(keyword) {
  const selectedKeyword = keyword || "all";
  let totalMatches = 0;

  pubFilterButtons.forEach((button) => {
    const isActive = button.dataset.keyword === selectedKeyword;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  pubYearGroups.forEach((group) => {
    const publications = Array.from(group.querySelectorAll(".pub"));
    let groupMatches = 0;

    publications.forEach((publication) => {
      const keywords = (publication.dataset.keywords || "").split("|");
      const isMatch = selectedKeyword === "all" || keywords.includes(selectedKeyword);
      publication.hidden = !isMatch;
      if (isMatch) {
        groupMatches += 1;
      }
    });

    totalMatches += groupMatches;
    group.hidden = groupMatches === 0;
    if (selectedKeyword === "all") {
      group.open = group.dataset.initialOpen === "true";
    } else if (groupMatches > 0) {
      group.open = true;
    }
  });

  if (pubFilterEmpty) {
    pubFilterEmpty.hidden = totalMatches > 0;
  }
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

pubYearGroups.forEach((group) => {
  group.dataset.initialOpen = group.open ? "true" : "false";
});

pubFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPublicationFilter(button.dataset.keyword);
  });
});

window.addEventListener("hashchange", () => {
  highlightSection(window.location.hash);
});

applyLanguage("en");
setPublicationFilter("all");
