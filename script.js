// 3D Coffee Shop Website JavaScript
// Enhanced with Three.js for 3D visualizations

// Global variables
let scene, camera, renderer, currentModel;
let productScenes = {};
let isLoading = true;
let heroScene, aboutScene;
let animationId;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Main initialization function
function initializeApp() {
  // Show loading screen
  showLoadingScreen();

  // Initialize 3D scenes
  initializeHero3D();
  initializeAbout3D();
  initializeProduct3D();

  // Initialize navigation
  initializeNavigation();

  // Initialize product filtering
  initializeProductFilters();

  // Initialize contact form
  initializeContactForm();

  // Initialize scroll effects
  initializeScrollEffects();

  // Initialize intersection observer for animations
  initializeAnimations();

  // Hide loading screen after everything is loaded
  setTimeout(() => {
    hideLoadingScreen();
  }, 3000);
}

// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      isLoading = false;
    }, 500);
  }
}

// 3D Scene Initialization
function initializeHero3D() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  // Create scene
  heroScene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  heroScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  heroScene.add(directionalLight);

  // Create floating coffee cups
  createFloatingCoffeeCups(heroScene);

  // Create floating coffee beans
  createFloatingCoffeeBeans(heroScene);

  // Animation loop
  function animateHero() {
    requestAnimationFrame(animateHero);

    // Rotate coffee cups and beans
    heroScene.children.forEach((child, index) => {
      if (child.userData.type === "coffee-cup") {
        child.rotation.y += 0.01;
        child.position.y += Math.sin(Date.now() * 0.002 + index) * 0.002;
      } else if (child.userData.type === "coffee-bean") {
        child.rotation.x += 0.02;
        child.rotation.z += 0.01;
        child.position.y += Math.sin(Date.now() * 0.003 + index) * 0.001;
      }
    });

    renderer.render(heroScene, camera);
  }

  animateHero();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

function createFloatingCoffeeCups(scene) {
  const cupGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.4, 16);
  const cupMaterial = new THREE.MeshPhongMaterial({
    color: 0x8b4513,
    shininess: 30,
  });

  // Create handle geometry
  const handleGeometry = new THREE.TorusGeometry(0.15, 0.03, 8, 16, Math.PI);
  const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

  for (let i = 0; i < 5; i++) {
    const cupGroup = new THREE.Group();

    // Cup body
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.castShadow = true;
    cupGroup.add(cup);

    // Cup handle
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.35, 0, 0);
    handle.rotation.z = Math.PI / 2;
    cupGroup.add(handle);

    // Coffee liquid
    const liquidGeometry = new THREE.CylinderGeometry(0.28, 0.18, 0.1, 16);
    const liquidMaterial = new THREE.MeshPhongMaterial({
      color: 0x3d2914,
      transparent: true,
      opacity: 0.8,
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = 0.15;
    cupGroup.add(liquid);

    // Position cups
    cupGroup.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    cupGroup.userData.type = "coffee-cup";
    scene.add(cupGroup);
  }
}

function createFloatingCoffeeBeans(scene) {
  const beanGeometry = new THREE.SphereGeometry(0.1, 8, 6);
  beanGeometry.scale(1, 0.6, 0.8);

  const beanMaterial = new THREE.MeshPhongMaterial({
    color: 0x3d2914,
    shininess: 20,
  });

  for (let i = 0; i < 20; i++) {
    const bean = new THREE.Mesh(beanGeometry, beanMaterial);
    bean.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    );
    bean.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    bean.castShadow = true;
    bean.userData.type = "coffee-bean";
    scene.add(bean);
  }
}

function initializeAbout3D() {
  const canvas = document.getElementById("about-canvas");
  if (!canvas) return;

  // Create scene
  aboutScene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  aboutScene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.set(2, 2, 2);
  aboutScene.add(pointLight);

  // Create coffee grinder
  createCoffeeGrinder(aboutScene);

  // Animation loop
  function animateAbout() {
    requestAnimationFrame(animateAbout);

    aboutScene.children.forEach((child) => {
      if (child.userData.type === "grinder") {
        child.rotation.y += 0.005;
      }
    });

    renderer.render(aboutScene, camera);
  }

  animateAbout();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

function createCoffeeGrinder(scene) {
  const grinderGroup = new THREE.Group();

  // Base
  const baseGeometry = new THREE.CylinderGeometry(0.8, 1, 0.3, 16);
  const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.5;
  grinderGroup.add(base);

  // Body
  const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1, 16);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  grinderGroup.add(body);

  // Handle
  const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
  const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(0.7, 0.2, 0);
  handle.rotation.z = Math.PI / 6;
  grinderGroup.add(handle);

  grinderGroup.userData.type = "grinder";
  scene.add(grinderGroup);
}

function initializeProduct3D() {
  const productCanvases = document.querySelectorAll(".product-canvas");

  productCanvases.forEach((canvas) => {
    const productType = canvas.getAttribute("data-product");
    createProductScene(canvas, productType);
  });
}

function createProductScene(canvas, productType) {
  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 2);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(2, 2, 2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Create product based on type
  let product;
  switch (productType) {
    case "ceramic-cup":
      product = createCeramicCup();
      break;
    case "glass-cup":
      product = createGlassCup();
      break;
    case "travel-mug":
      product = createTravelMug();
      break;
    case "arabica-powder":
      product = createCoffeeBag("Arabica");
      break;
    case "espresso-powder":
      product = createCoffeeBag("Espresso");
      break;
    case "organic-powder":
      product = createCoffeeBag("Organic");
      break;
    default:
      product = createCeramicCup();
  }

  scene.add(product);

  // Store scene data
  productScenes[productType] = { scene, camera, renderer, product };

  // Animation loop
  function animateProduct() {
    requestAnimationFrame(animateProduct);
    product.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animateProduct();

  // Add mouse interaction
  addProductInteraction(canvas, camera, product);
}

function createCeramicCup() {
  const cupGroup = new THREE.Group();

  // Cup body
  const cupGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.4, 16);
  const cupMaterial = new THREE.MeshPhongMaterial({
    color: 0xf5f5dc,
    shininess: 30,
  });
  const cup = new THREE.Mesh(cupGeometry, cupMaterial);
  cup.castShadow = true;
  cupGroup.add(cup);

  // Handle
  const handleGeometry = new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI);
  const handleMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5dc });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(0.32, 0, 0);
  handle.rotation.z = Math.PI / 2;
  cupGroup.add(handle);

  return cupGroup;
}

function createGlassCup() {
  const cupGroup = new THREE.Group();

  // Glass body
  const cupGeometry = new THREE.CylinderGeometry(0.28, 0.25, 0.35, 16);
  const cupMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    shininess: 100,
  });
  const cup = new THREE.Mesh(cupGeometry, cupMaterial);
  cupGroup.add(cup);

  return cupGroup;
}

function createTravelMug() {
  const mugGroup = new THREE.Group();

  // Mug body
  const mugGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.6, 16);
  const mugMaterial = new THREE.MeshPhongMaterial({
    color: 0x2f4f4f,
    shininess: 20,
  });
  const mug = new THREE.Mesh(mugGeometry, mugMaterial);
  mugGroup.add(mug);

  // Lid
  const lidGeometry = new THREE.CylinderGeometry(0.26, 0.26, 0.05, 16);
  const lidMaterial = new THREE.MeshPhongMaterial({ color: 0x2f4f4f });
  const lid = new THREE.Mesh(lidGeometry, lidMaterial);
  lid.position.y = 0.325;
  mugGroup.add(lid);

  return mugGroup;
}

function createCoffeeBag(type) {
  const bagGroup = new THREE.Group();

  // Bag body
  const bagGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.15);
  let bagColor;
  switch (type) {
    case "Arabica":
      bagColor = 0x8b4513;
      break;
    case "Espresso":
      bagColor = 0x3d2914;
      break;
    case "Organic":
      bagColor = 0x228b22;
      break;
    default:
      bagColor = 0x8b4513;
  }

  const bagMaterial = new THREE.MeshPhongMaterial({ color: bagColor });
  const bag = new THREE.Mesh(bagGeometry, bagMaterial);
  bagGroup.add(bag);

  // Label
  const labelGeometry = new THREE.PlaneGeometry(0.3, 0.2);
  const labelMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
  });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.z = 0.076;
  bagGroup.add(label);

  return bagGroup;
}

function addProductInteraction(canvas, camera, product) {
  let isMouseDown = false;
  let mouseX = 0;
  let mouseY = 0;

  canvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!isMouseDown) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    product.rotation.y += deltaX * 0.01;
    product.rotation.x += deltaY * 0.01;

    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  canvas.addEventListener("wheel", (event) => {
    camera.position.z += event.deltaY * 0.001;
    camera.position.z = Math.max(1, Math.min(5, camera.position.z));
  });
}

// Navigation Functions
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Product Filter Functions
function initializeProductFilters() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productCards = document.querySelectorAll(".product-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter products
      filterProducts(category, productCards);
    });
  });
}

function filterProducts(category, productCards) {
  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.classList.remove("hidden");
      card.classList.add("show");
    } else {
      card.classList.add("hidden");
      card.classList.remove("show");
    }
  });
}

// Contact Form Functions
function initializeContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", handleFormSubmit);

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.getAttribute("name");
  const errorElement = document.getElementById(`${fieldName}-error`);

  let isValid = true;
  let errorMessage = "";

  // Required field validation
  if (!value) {
    isValid = false;
    errorMessage = `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required`;
  }

  // Email validation
  if (fieldName === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Display error
  if (errorElement) {
    errorElement.textContent = errorMessage;
    field.classList.toggle("error", !isValid);
  }

  return isValid;
}

function clearFieldError(field) {
  const fieldName = field.getAttribute("name");
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (errorElement) {
    errorElement.textContent = "";
    field.classList.remove("error");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const statusElement = document.getElementById("form-status");

  // Validate all fields
  const inputs = form.querySelectorAll("input, textarea");
  let isFormValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    showFormStatus("Please correct the errors above", "error");
    return;
  }

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitButton.disabled = true;

  // Submit to Formspree
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        showFormStatus(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        form.reset();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showFormStatus(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    })
    .finally(() => {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
}

function showFormStatus(message, type) {
  const statusElement = document.getElementById("form-status");
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    statusElement.style.display = "block";

    // Auto-hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        statusElement.style.display = "none";
      }, 5000);
    }
  }
}

// Scroll Effects
function initializeScrollEffects() {
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

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "hsla(0, 0%, 100%, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "hsla(0, 0%, 100%, 0.9)";
      navbar.style.backdropFilter = "blur(10px)";
    }
  });
}

// Animation Functions
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".product-card, .feature, .contact-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Add to cart functionality (placeholder)
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("btn-product") ||
    e.target.closest(".btn-product")
  ) {
    e.preventDefault();
    const button = e.target.classList.contains("btn-product")
      ? e.target
      : e.target.closest(".btn-product");
    const originalText = button.innerHTML;

    // Animate button
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = "#28a745";

    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "";
    }, 2000);

    // Here you would typically add the item to a cart
    console.log("Product added to cart");
  }
});

// Performance optimization: Pause 3D animations when not visible
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  } else {
    // Resume animations
    if (!isLoading) {
      // Resume animation loops
    }
  }
});

// Resize handler for all 3D scenes
window.addEventListener("resize", function () {
  // Resize hero canvas
  const heroCanvas = document.getElementById("hero-canvas");
  if (heroCanvas && heroScene) {
    // This is handled in the hero initialization
  }

  // Resize about canvas
  const aboutCanvas = document.getElementById("about-canvas");
  if (aboutCanvas && aboutScene) {
    // This is handled in the about initialization
  }

  // Resize product canvases
  Object.keys(productScenes).forEach((productType) => {
    const sceneData = productScenes[productType];
    if (sceneData && sceneData.renderer) {
      const canvas = sceneData.renderer.domElement;
      sceneData.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      sceneData.camera.updateProjectionMatrix();
      sceneData.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });
});

// Error handling for WebGL
window.addEventListener("error", function (e) {
  if (e.message && e.message.includes("WebGL")) {
    console.warn("WebGL not supported, falling back to 2D experience");
    // Hide 3D containers and show fallback content
    document
      .querySelectorAll(".hero-3d-container, .product-3d-container, .about-3d")
      .forEach((container) => {
        container.style.display = "none";
      });
  }
});

// Preload critical resources
function preloadResources() {
  // Preload fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "preload";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
  fontLink.as = "style";
  document.head.appendChild(fontLink);
}

// Initialize preloading
preloadResources();

// Export functions for potential external use
window.CoffeeShop = {
  scrollToSection,
  filterProducts,
  showFormStatus,
};
