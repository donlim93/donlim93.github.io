// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const html = document.documentElement;
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);

  // Toggle theme on button click with spin animation
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
    icon.classList.remove("theme-flip");
    void icon.offsetWidth; // trigger reflow to restart animation
    icon.classList.add("theme-flip");
  });

  function updateIcon(theme) {
    if (theme === "dark") {
      icon.className = "fas fa-moon";
    } else {
      icon.className = "fas fa-sun";
    }
  }
});
