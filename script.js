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

// Initialize Swiper for Projects
const projectsSwiper = new Swiper('.projects-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.projects-swiper .swiper-pagination',
    clickable: true,
  },
});

// Initialize Swiper for Certifications
const certsSwiper = new Swiper('.certs-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.certs-swiper .swiper-pagination',
    clickable: true,
  },
});

// Project Category Filtering via Swiper DOM manipulation
const filterButtons = document.querySelectorAll(".filter-btn");
const projectsWrapper = document.querySelector(".projects-swiper .swiper-wrapper");
// Keep a copy of all original project slides
const allProjects = Array.from(document.querySelectorAll(".projects-swiper .swiper-slide"));

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button state
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // Clear current slides from the DOM
    projectsWrapper.innerHTML = '';

    // Append matching slides back to the DOM
    allProjects.forEach((item) => {
      const categories = (item.getAttribute("data-category") || "").split(" ");
      if (filterValue === "all" || categories.includes(filterValue)) {
        item.classList.add("show"); // Keep it visible without re-triggering observer
        projectsWrapper.appendChild(item);
      }
    });

    // Update Swiper layout and pagination after DOM changes
    projectsSwiper.update();
    projectsSwiper.slideTo(0);
  });
});
