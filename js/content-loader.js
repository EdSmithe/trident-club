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
      // Handle both string items and object items
      li.textContent = typeof item === "string" ? item : item.text;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Announcements load failed:", err);
  }
}

async function loadAboutContent() {
  try {
    const res = await fetch("/content/about.json");
    if (!res.ok) return;
    const data = await res.json();

    // Main page title
    const title = document.querySelector("main.content h1");
    if (data.title) title.textContent = data.title;

    // Our Story
    const storyTitle = document.querySelector(".about-story h2");
    const storyText = document.querySelector(".about-story p");
    if (data.our_story_title) storyTitle.textContent = data.our_story_title;
    if (data.our_story_text) storyText.textContent = data.our_story_text;

    // Disclaimer
    const disclaimerTitle = document.querySelector(".about-disclaimer h2");
    const disclaimerText = document.querySelector(".about-disclaimer p");
    if (data.disclaimer_title) disclaimerTitle.textContent = data.disclaimer_title;
    if (data.disclaimer_text) disclaimerText.textContent = data.disclaimer_text;

    // Contact
    const contactTitle = document.querySelector(".about-contact h2");
    const contactText = document.querySelector(".about-contact p");
    if (data.contact_title) contactTitle.textContent = data.contact_title;

    if (data.contact_text || data.contact_email) {
      contactText.innerHTML = ""; // clear existing
      if (data.contact_text) {
        contactText.append(document.createTextNode(data.contact_text + " "));
      }
      if (data.contact_email) {
        const link = document.createElement("a");
        link.href = `mailto:${data.contact_email}`;
        link.textContent = data.contact_email;
        contactText.appendChild(link);
      }
    }
  } catch (err) {
    console.error("About content load failed:", err);
  }
}


// Load ambassadors page
async function loadAmbassadorsContent() {
  try {
    const res = await fetch("/content/ambassadors.json");
    if (!res.ok) return;
    const data = await res.json();

    // Title + intro
    const title = document.querySelector(".ambassadors-title");
    const intro = document.querySelector(".intro");
    if (data.title) title.textContent = data.title;
    if (data.intro_text) intro.textContent = data.intro_text;

    // Videos
    const videosContainer = document.querySelector(".videos");
    if (videosContainer && Array.isArray(data.video_links)) {
      videosContainer.innerHTML = "";
      data.video_links.forEach(link => {
        const iframe = document.createElement("iframe");
        iframe.src = link.url || link; // support object or plain string
        iframe.width = "560";
        iframe.height = "315";
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        videosContainer.appendChild(iframe);
      });
    }

    // Commission section
    const commissionTitle = document.querySelector(".commission-title");
    const commissionText = document.querySelector(".commission-text");
    const commissionSection = document.querySelector(".commission");

    if (data.commission_title) commissionTitle.textContent = data.commission_title;
    if (data.commission_text) commissionText.textContent = data.commission_text;

    if (data.commission_image) {
      let img = commissionSection.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        commissionSection.appendChild(img);
      }
      img.src = data.commission_image;
      img.alt = data.commission_title || "Commission infographic";
    }
  } catch (err) {
    console.error("Ambassadors content load failed:", err);
  }
}

// Load opportunities page
async function loadOpportunitiesContent() {
  try {
    const res = await fetch("/content/opportunities.json");
    if (!res.ok) return;
    const data = await res.json();

    const title = document.querySelector(".opportunities-title");
    if (data.title) title.textContent = data.title;

    const list = document.querySelector(".opportunities-list");
    if (list && Array.isArray(data.items)) {
      list.innerHTML = "";
      data.items.forEach(item => {
        const section = document.createElement("section");
        section.classList.add("opportunity");

        if (item.title) {
          const h2 = document.createElement("h2");
          h2.textContent = item.title;
          section.appendChild(h2);
        }

        if (item.video_url) {
          const iframe = document.createElement("iframe");
          iframe.src = item.video_url;
          iframe.width = "560";
          iframe.height = "315";
          iframe.frameBorder = "0";
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
          iframe.allowFullscreen = true;
          section.appendChild(iframe);
        }

        if (item.description) {
          const p = document.createElement("p");
          p.textContent = item.description;
          section.appendChild(p);
        }

        if (item.link_url && item.link_text) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = item.link_url;
          a.textContent = item.link_text;
          p.appendChild(a);
          section.appendChild(p);
        }

        list.appendChild(section);
      });
    }
  } catch (err) {
    console.error("Opportunities content load failed:", err);
  }
}

// Load community page
async function loadCommunityContent() {
  try {
    const res = await fetch("/content/community.json");
    if (!res.ok) return;
    const data = await res.json();

    // Title
    const title = document.querySelector(".community-title");
    if (data.title) title.textContent = data.title;

    // Intro
    const intro = document.querySelector(".community-intro");
    if (data.intro) intro.textContent = data.intro;

    // Discord embed
    const discordContainer = document.querySelector(".discord-embed");
    if (discordContainer && data.discord && data.discord.server_id) {
      discordContainer.innerHTML = `
        <iframe src="https://discord.com/widget?id=${data.discord.server_id}&theme=${data.discord.theme || "dark"}"
                width="${data.discord.width || 350}"
                height="${data.discord.height || 500}"
                allowtransparency="true" frameborder="0"></iframe>
      `;
    }

    // Highlights
    const highlightsList = document.querySelector(".community-highlights");
    if (highlightsList && Array.isArray(data.highlights)) {
      highlightsList.innerHTML = "";
      data.highlights.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        highlightsList.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Community content load failed:", err);
  }
}

// Load challenges page
async function loadChallengesContent() {
  try {
    const res = await fetch("/content/challenges.json");
    if (!res.ok) return;
    const data = await res.json();

    // Page title
    const title = document.querySelector(".challenges-title");
    if (data.title) title.textContent = data.title;

    // Challenge block
    const cTitle = document.querySelector(".challenge-title");
    if (data.challenge?.title) cTitle.textContent = data.challenge.title;

    const cSteps = document.querySelector(".challenge-steps");
    if (Array.isArray(data.challenge?.steps)) {
      cSteps.innerHTML = data.challenge.steps
        .map((s, i) => `Step ${i + 1}: ${s}`)
        .join("<br/>");
    }

    const cBtn = document.querySelector(".challenge-btn");
    if (data.challenge?.button_text) cBtn.textContent = data.challenge.button_text;

    // Progress
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill && typeof data.progress?.xp_percent === "number") {
      progressFill.style.width = `${data.progress.xp_percent}%`;
      progressFill.textContent = `${data.progress.xp_percent}%`;
    }

    const badge = document.querySelector(".progress-badge");
    if (data.progress?.badge) badge.textContent = `Badge: ${data.progress.badge}`;
  } catch (err) {
    console.error("Challenges content load failed:", err);
  }
}

async function loadContactContent() {
  try {
    const res = await fetch("/content/contact.json");
    if (!res.ok) return;
    const data = await res.json();

    document.querySelector(".contact-info h2").textContent = data.title;
    
    const infoBlocks = document.querySelectorAll(".contact-info p");
    infoBlocks[0].innerHTML = `<strong>${data.phone_label}</strong>${data.phone_number}`;
    infoBlocks[1].innerHTML = `<strong>${data.email_label}</strong><a href="mailto:${data.email_address}">${data.email_address}</a>`;
    infoBlocks[2].innerHTML = `<strong>${data.location_label}</strong>${data.location_text}`;
    infoBlocks[3].innerHTML = `<strong>${data.hours_label}</strong>${data.hours_text}`;

    // Update socials if available
    if (data.socials) {
      if (data.socials.facebook) document.querySelector(".social-facebook").href = data.socials.facebook;
      if (data.socials.instagram) document.querySelector(".social-instagram").href = data.socials.instagram;
      if (data.socials.linkedin) document.querySelector(".social-linkedin").href = data.socials.linkedin;
    }
  } catch (err) {
    console.error("Contact content load failed:", err);
  }
}

async function initContent() {
  await loadBanner();

  if (document.body.contains(document.querySelector(".hero"))) {
    await loadHomeContent();
    await loadAnnouncements();
  }

  if (document.title.includes("About")) {
    await loadAboutContent();
  }

  if (document.title.includes("Ambassadors")) {
    await loadAmbassadorsContent();
  }

  if (document.title.includes("Opportunities")) {
    await loadOpportunitiesContent();
  }

  if (document.title.includes("Community")) {
    await loadCommunityContent();
  }

  if (document.title.includes("Challenges")) {
    await loadChallengesContent();
  }
  
  if (document.title.includes("Contact")) {
    await loadContactContent();
  }
}

document.addEventListener("DOMContentLoaded", initContent);

