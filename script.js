// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation to menu items when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out";
    }
  });
}, observerOptions);

document.querySelectorAll(".menu-item").forEach((item) => {
  observer.observe(item);
});

// Form submission handling
const form = document.querySelector(".contact-form");
form.addEventListener("submit", function (e) {
  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.textContent = "Đang gửi...";
  submitBtn.disabled = true;

  // Reset button after 3 seconds (in case of slow submission)
  setTimeout(() => {
    submitBtn.textContent = "Gửi Tin Nhắn";
    submitBtn.disabled = false;
  }, 3000);
});

// Add active class to navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle (optional enhancement)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("mobile-active");
}

// Add loading animation when page loads
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Parallax effect for hero section (optional enhancement)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const parallaxSpeed = 0.5;

  if (hero) {
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// Add hover effect for menu items
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener("scroll", () => {
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
  }
});
