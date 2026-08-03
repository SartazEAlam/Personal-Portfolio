// Fade-up scroll animation using Intersection Observer API
const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

// Project Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button state
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectItems.forEach((item) => {
      const categories = (item.getAttribute("data-category") || "").split(" ");
      if (filterValue === "all" || categories.includes(filterValue)) {
        item.classList.remove("project-hidden");
        item.classList.add("project-visible");
        // Ensure fade-up animation shows
        item.classList.add("show");
      } else {
        item.classList.add("project-hidden");
        item.classList.remove("project-visible");
      }
    });
  });
});

