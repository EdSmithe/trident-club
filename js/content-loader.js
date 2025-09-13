// Load banner
async function loadBanner() {
  try {
    const res = await fetch("/content/banner.json");
    if (!res.ok) return;
    const data = await res.json();

    const bannerSpan = document.querySelector("#announcement span");
    if (data.message) bannerSpan.textContent = data.message;
  } catch (err) {
    console.error("Banner load failed:", err);
  }
}

// Load homepage hero
async function loadHomeContent() {
  try {
    const res = await fetch("/content/home.json");
    if (!res.ok) return;
    const data = await res.json();

    const heroTitle = document.querySelector(".hero h1");
    const heroIntro = document.querySelector(".hero p");
    const heroVideo = document.querySelector(".hero iframe");

    if (data.hero_title) heroTitle.textContent = data.hero_title;
    if (data.hero_subtitle) heroIntro.textContent = data.hero_subtitle;
    if (data.youtube_id) {
      heroVideo.src = `https://www.youtube.com/embed/${data.youtube_id}`;
    }
  } catch (err) {
    console.error("Home content load failed:", err);
  }
}

// Load announcements
async function loadAnnouncements() {
  try {
    const res = await fetch("/content/announcements.json");
    if (!res.ok) return;
    const data = await res.json();

    const list = document.querySelector(".announcements ul");
    list.innerHTML = "";

    data.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.text;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Announcements load failed:", err);
  }
}

// Init all
async function initContent() {
  await loadBanner();
  await loadHomeContent();
  await loadAnnouncements();
}

document.addEventListener("DOMContentLoaded", initContent);
