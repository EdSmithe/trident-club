// Toggle navigation menu (mobile)
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Dismiss announcement banner
function dismissBanner() {
  document.getElementById('announcement').style.display = 'none';
}

// Simple YAML frontmatter parser
function parseFrontmatter(mdText) {
  const match = /^---\n([\s\S]*?)\n---/.exec(mdText);
  if (!match) return {};
  const yaml = match[1];
  const lines = yaml.split("\n");
  const data = {};
  for (let line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key) continue;
    data[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
  }
  return data;
}

// Load a single markdown file
async function loadMD(filePath) {
  const res = await fetch(filePath);
  if (!res.ok) return null;
  const text = await res.text();
  return parseFrontmatter(text);
}

// Load homepage content
async function loadHomeContent() {
  const data = await loadMD("/content/home.md");
  if (!data) return;

  const heroTitle = document.querySelector(".hero h1");
  const heroIntro = document.querySelector(".hero p");
  const heroVideo = document.querySelector(".hero iframe");

  if (data.title) heroTitle.textContent = data.title;
  if (data.intro) heroIntro.textContent = data.intro;
  if (data.video) heroVideo.src = data.video;
}

// Load banner content
async function loadBanner() {
  const data = await loadMD("/content/banner.md");
  if (!data) return;

  const bannerSpan = document.querySelector("#announcement span");
  if (data.message) bannerSpan.textContent = data.message;
}

// Load announcements (multiple files in folder)
async function loadAnnouncements() {
  try {
    const res = await fetch("/content/announcements/");
    const text = await res.text();

    // Try to parse directory listing (works if Netlify serves it)
    const files = [...text.matchAll(/href="([^"]+\.md)"/g)].map(m => m[1]);

    const list = document.querySelector(".announcements ul");
    list.innerHTML = "";

    for (const file of files) {
      const data = await loadMD("/content/announcements/" + file);
      if (data && data.title) {
        const li = document.createElement("li");
        li.textContent = data.title;
        list.appendChild(li);
      }
    }
  } catch (err) {
    console.error("Announcements load failed:", err);
  }
}

// Initialize all content
async function initContent() {
  await loadHomeContent();
  await loadBanner();
  await loadAnnouncements();
}

document.addEventListener("DOMContentLoaded", initContent);
