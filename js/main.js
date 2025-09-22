function toggleNav() {
  document.querySelectorAll(".nav-links").forEach(nav => {
    nav.classList.toggle("show");
  });
}

// Dismiss announcement banner
function dismissBanner() {
  document.getElementById('announcement').style.display = 'none';
}

// Placeholder for future features (leaderboard, XP, etc.)
console.log("Trident Club site loaded.");

