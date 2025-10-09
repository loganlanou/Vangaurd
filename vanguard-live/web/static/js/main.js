// Main JavaScript file for VANGUARD

// Initialize Clerk authentication
document.addEventListener('DOMContentLoaded', async () => {
  // Clerk will be initialized here
  console.log('VANGUARD loaded');
});

// Theme toggle functionality
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
