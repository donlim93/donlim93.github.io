// Navigation elements
const nav = document.getElementById("site-nav");
const links = nav.querySelector(".nav-links");
const toggle = nav.querySelector(".nav-toggle");
const overflow = nav.querySelector(".nav-overflow");
const allItems = Array.from(links.querySelectorAll("li"));

// Function to update navigation based on window size
// Moves items to overflow menu if they don't fit
function updateNav() {
  // Prevent horizontal scroll during calculation
  document.body.style.overflowX = "hidden";

  // Reset: Move all items back to main nav
  allItems.forEach((item) => links.appendChild(item));
  toggle.style.display = "none";
  overflow.classList.remove("open");

  // Temporarily align items to the left to accurately measure right-side overflow
  links.style.justifyContent = "flex-start";

  // Hide the highlight pill during measurement so it doesn't artificially inflate scrollWidth
  const highlight = nav.querySelector(".nav-highlight");
  if (highlight) highlight.style.display = "none";

  // Check from right to left, move items that overflow the container to overflow menu
  for (let i = allItems.length - 1; i >= 0; i--) {
    const itemRight = allItems[i].getBoundingClientRect().right;
    const linksRight = links.getBoundingClientRect().right;

    // If the item exceeds the container's right edge (with 1px tolerance for subpixel rendering)
    if (itemRight > linksRight + 1 || links.scrollWidth > links.clientWidth + 1) {
      overflow.insertBefore(allItems[i], overflow.firstChild);
      toggle.style.display = "block";
    } else {
      // If this item fits, all preceding items will also fit
      break;
    }
  }

  // Restore the original alignment
  links.style.justifyContent = "";
  if (highlight) highlight.style.display = "";
}

// Debounced resize handler to update nav on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateNav, 0);
});

// Toggle overflow menu on button click
toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  overflow.classList.toggle("open");
});

// Close overflow menu when clicking outside nav
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) overflow.classList.remove("open");
});

// Initialize navigation
updateNav();
nav.classList.add("nav-ready");


