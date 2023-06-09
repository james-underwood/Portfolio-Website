document.addEventListener("DOMContentLoaded", function() {
    // Get all section elements
    const sections = document.querySelectorAll("section");
    const sectionCount = sections.length;
    let currentSection = 0;
    let isScrolling = false; // Flag to prevent rapid scrolling
  
    // Scroll to the next section on scroll or touch event
    function handleScroll() {
      // Check if scrolling is in progress
      if (isScrolling) return;
  
      // Calculate the scroll position
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
      // Determine the active section based on scroll position
      let activeSection = 0;
      for (let i = 0; i < sectionCount; i++) {
        const sectionOffset = sections[i].offsetTop;
        if (scrollPosition >= sectionOffset) {
          activeSection = i;
        }
      }
  
      // Update currentSection if it has changed
      if (activeSection !== currentSection) {
        currentSection = activeSection;
      }
    }
  
    // Smoothly scroll to the next section
    function scrollToSection(event) {
      event.preventDefault(); // Prevent default scroll behavior
  
      // Check if scrolling is in progress
      if (isScrolling) return;
  
      // Calculate the direction of the scroll
      let direction = 0;
      if (event.type === "wheel") {
        const delta = event.deltaY;
        direction = delta > 0 ? 1 : -1;
      } else if (event.type === "touchstart") {
        const touchStart = event.touches[0].clientY;
        const touchEnd = event.changedTouches[0].clientY;
        direction = touchEnd < touchStart ? 1 : -1;
      }
  
      // Update currentSection if the scroll is within bounds
      if (currentSection + direction >= 0 && currentSection + direction < sectionCount) {
        currentSection += direction;
        isScrolling = true;
  
        // Scroll to the next section
        sections[currentSection].scrollIntoView({ behavior: "smooth" });
  
        // Reset the flag after a delay
        setTimeout(function() {
          isScrolling = false;
        }, 1000); // Adjust the delay as needed
      } else if (currentSection + direction === -1) {
        // If scrolling back to the main page, reset scroll position to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        currentSection = 0;
      }
    }
  
    // Add the scroll event listener to track the scroll position
    window.addEventListener("scroll", handleScroll);
  
    // Add the wheel event listener to scroll to the next section
    document.addEventListener("wheel", scrollToSection, { passive: false });
  
    // Add the touchstart and touchend event listeners for mobile devices
    document.addEventListener("touchstart", scrollToSection, { passive: false });
    document.addEventListener("touchend", scrollToSection, { passive: false });
  });
  
  

    // Smooth scroll to the portfolio section on link click
  const portfolioLink = document.querySelector('a[href="#portfolio"]');
  portfolioLink.addEventListener("click", function(event) {
    event.preventDefault();
    const portfolioSection = document.querySelector("#portfolio");
    portfolioSection.scrollIntoView({ behavior: "smooth" });
  });