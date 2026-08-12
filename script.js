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
  loop: true,
  touchRatio: 1.5, // Makes it easier to swipe
  coverflowEffect: {
    rotate: 30,
    stretch: 30, // Spaced out slightly to prevent ugly overlapping
    depth: 200, // Deep background receding
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.projects-swiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.projects-swiper .swiper-button-next',
    prevEl: '.projects-swiper .swiper-button-prev',
  },
});

// Initialize Swiper for Certifications
const certsSwiper = new Swiper('.certs-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  initialSlide: 2, // Starts right at the middle card (index 2 of 5)
  loop: false,
  touchRatio: 1.5,
  coverflowEffect: {
    rotate: 30,
    stretch: 30,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.certs-swiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.certs-swiper .swiper-button-next',
    prevEl: '.certs-swiper .swiper-button-prev',
  },
});

// Project Category Filtering via Swiper DOM manipulation
const filterButtons = document.querySelectorAll(".filter-btn");
const projectsWrapper = document.querySelector(".projects-swiper .swiper-wrapper");
// Keep a copy of all original project slides (excluding Swiper's loop duplicates)
const allProjects = Array.from(document.querySelectorAll(".projects-swiper .swiper-slide:not(.swiper-slide-duplicate)"));

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button state
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // Clear current slides from the DOM completely
    projectsWrapper.innerHTML = '';
    projectsSwiper.loopDestroy(); // Temporarily destroy loop to prevent duplicate bugs

    // Append matching slides back to the DOM
    allProjects.forEach((item) => {
      const categories = (item.getAttribute("data-category") || "").split(" ");
      if (filterValue === "all" || categories.includes(filterValue)) {
        item.classList.add("show");
        projectsWrapper.appendChild(item.cloneNode(true));
      }
    });

    // Re-initialize Swiper
    projectsSwiper.update();
    
    // Only enable loop if we have enough slides, otherwise it glitches
    if (filterValue === "all") {
      projectsSwiper.params.loop = true;
      projectsSwiper.loopCreate();
    } else {
      projectsSwiper.params.loop = false;
    }
    
    projectsSwiper.update();
    projectsSwiper.slideTo(0);
  });
});
