  function toggleNav() {
    const list = document.getElementById('primary-nav');
    const btn  = document.querySelector('.nav-toggle');
    const open = list.classList.toggle('show');
    btn.setAttribute('aria-expanded', open);
  }
// Dismiss announcement banner
function dismissBanner() {
  document.getElementById('announcement').style.display = 'none';
}

// Placeholder for future features (leaderboard, XP, etc.)
console.log("Trident Club site loaded.");

