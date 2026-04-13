(function() {
  // Navigation elements for highlighting
  const navContainer = document.getElementById("site-nav");
  const navLinksContainer = document.querySelector(".nav-links");

  // Initialize highlight functionality if nav exists
  if (navLinksContainer && navContainer) {
    // Create highlight element
    const highlight = document.createElement("div");
    highlight.classList.add("nav-highlight");
    navLinksContainer.appendChild(highlight);

    let lastItem = null;
    let returnTimer = null;
    let currentActiveLink = null;

    // Function to move highlight to a specific element
    function moveHighlight(el) {
      const linkRect = el.getBoundingClientRect();
      const linksRect = navLinksContainer.getBoundingClientRect();

      // Calculate position relative to the container
      highlight.style.left = (linkRect.left - linksRect.left) + "px";
      highlight.style.top = (linkRect.top - linksRect.top) + "px";
      highlight.style.width = linkRect.width + "px";
      highlight.style.height = linkRect.height + "px";
      highlight.style.opacity = "1";

      const items = navLinksContainer.querySelectorAll("li a");
      items.forEach(i => i.classList.remove('active'));
      el.classList.add('active');
    }

    // Function to return highlight to current active page
    function returnToCurrentPage() {
      if (currentActiveLink && navLinksContainer.contains(currentActiveLink)) {
        moveHighlight(currentActiveLink);
      } else {
        // Hide the highlight if current page's link is not visible (in overflow menu)
        highlight.style.opacity = "0";
      }
    }

    function attachListeners() {
      // Select all links in both nav-links and nav-overflow
      const items = navContainer.querySelectorAll("li a");
      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          // Only show highlight if item is still in the main nav
          if (navLinksContainer.contains(item)) {
            // Clear any pending return timer
            if (returnTimer) {
              clearTimeout(returnTimer);
              returnTimer = null;
            }
            lastItem = item;
            moveHighlight(item);
          }
        });
      });

      // Add mouseleave listener to the nav container
      navContainer.addEventListener("mouseleave", () => {
        // Start a timer to return to current page after 0.5 seconds
        returnTimer = setTimeout(() => {
          returnToCurrentPage();
          returnTimer = null;
        }, 500);
      });
    }

    // Try to find the active link based on current URL to initialize the position
    const currentPath = window.location.pathname;
    const allNavItems = navContainer.querySelectorAll("li a");
    let activeLink = null;
    
    allNavItems.forEach(item => {
      const href = item.getAttribute('href');
      // Match exact path or handle trailing slashes
      if (href === currentPath || href + '/' === currentPath || href === currentPath + '/') {
        activeLink = item;
      }
    });

    if (activeLink && navLinksContainer.contains(activeLink)) {
      // Store the current active link for return functionality
      currentActiveLink = activeLink;
      // Wait for layout to be ready
      setTimeout(() => {
        lastItem = activeLink;
        // Disable transition for initial setup
        highlight.style.transition = 'none';
        moveHighlight(activeLink);
        // Re-enable transition
        setTimeout(() => {
          highlight.style.transition = '';
        }, 50);
      }, 100);
    } else {
      // If no active link found on page load, keep it invisible until hovered
      highlight.style.opacity = "0";
    }

    // Handle window resize to re-position the highlight
    let highlightResizeTimer;
    window.addEventListener('resize', () => {
      // Instantly hide the highlight while resizing to prevent it from floating
      highlight.style.transition = 'none';
      highlight.style.opacity = '0';

      clearTimeout(highlightResizeTimer);
      highlightResizeTimer = setTimeout(() => {
        // Check if current page's link is still visible
        if (currentActiveLink && navLinksContainer.contains(currentActiveLink)) {
          // Current page's link is visible, show highlight there
          moveHighlight(currentActiveLink);
        } else {
          // Current page's link is hidden (in overflow menu), hide the highlight
          highlight.style.opacity = "0";
        }

        // Restore transitions for future hovers
        setTimeout(() => {
          highlight.style.transition = '';
        }, 50);
      }, 150);
    });

    // Initial attachment of listeners
    attachListeners();
  }
})();
