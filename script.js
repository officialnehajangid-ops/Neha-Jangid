// ===== Color Schemes =====
const colorSchemes = [
  { name: "Coral Sunset", primary: "12 85% 55%", accent: "25 95% 60%", hue: 12 },
  { name: "Golden Hour", primary: "38 92% 50%", accent: "25 95% 55%", hue: 38 },
  { name: "Amber Glow", primary: "45 95% 55%", accent: "35 90% 60%", hue: 45 },
  { name: "Tangerine", primary: "25 90% 55%", accent: "15 95% 60%", hue: 25 },
  { name: "Peach Blush", primary: "18 85% 65%", accent: "8 90% 70%", hue: 18 },
  { name: "Rose Quartz", primary: "340 75% 55%", accent: "355 80% 65%", hue: 340 },
  { name: "Hot Pink", primary: "330 85% 55%", accent: "320 90% 60%", hue: 330 },
  { name: "Magenta Pop", primary: "315 85% 55%", accent: "325 90% 60%", hue: 315 },
  { name: "Purple Dream", primary: "270 75% 55%", accent: "285 85% 65%", hue: 270 },
  { name: "Indigo Night", primary: "240 70% 50%", accent: "255 80% 60%", hue: 240 },
  { name: "Violet Storm", primary: "280 80% 50%", accent: "295 85% 60%", hue: 280 },
  { name: "Lavender Haze", primary: "260 65% 60%", accent: "275 70% 65%", hue: 260 },
  { name: "Electric Blue", primary: "215 90% 55%", accent: "230 85% 65%", hue: 215 },
  { name: "Ocean Deep", primary: "200 85% 45%", accent: "210 90% 55%", hue: 200 },
  { name: "Sky Blue", primary: "195 85% 55%", accent: "205 90% 60%", hue: 195 },
  { name: "Teal Ocean", primary: "175 85% 50%", accent: "190 100% 60%", hue: 175 },
  { name: "Mint Fresh", primary: "165 75% 45%", accent: "180 80% 50%", hue: 165 },
  { name: "Forest Green", primary: "145 70% 40%", accent: "160 80% 45%", hue: 145 },
  { name: "Lime Zest", primary: "80 70% 45%", accent: "95 80% 50%", hue: 80 },
  { name: "Emerald", primary: "155 75% 45%", accent: "165 80% 50%", hue: 155 },
  { name: "Midnight Gold", primary: "50 90% 50%", accent: "40 95% 55%", hue: 50 },
  { name: "Cherry Cola", primary: "355 75% 45%", accent: "5 80% 50%", hue: 355 },
  { name: "Neon Nights", primary: "300 90% 55%", accent: "310 95% 60%", hue: 300 },
  { name: "Cyberpunk", primary: "320 95% 50%", accent: "330 100% 55%", hue: 320 },
];

let currentScheme = null;
let tooltipTimeout = null;

// Convert HSL string to HEX
function hslToHex(hslString) {
  const parts = hslString.split(' ');
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function applyColorScheme(scheme, showTooltip = true) {
  currentScheme = scheme.name;
  const root = document.documentElement;
  const isDark = !root.classList.contains('light');
  
  const hue = scheme.primary.split(' ')[0];
  
  // Set primary color and variants using HSL values
  root.style.setProperty('--primary', `hsl(${scheme.primary})`);
  root.style.setProperty('--primary-hsl', scheme.primary);
  root.style.setProperty('--primary-transparent', `hsla(${scheme.primary.replace(')', '')}, 0.5)`);
  root.style.setProperty('--primary-light', `hsla(${scheme.primary.replace(')', '')}, 0.2)`);
  root.style.setProperty('--primary-faint', `hsla(${scheme.primary.replace(')', '')}, 0.05)`);
  root.style.setProperty('--accent', `hsl(${scheme.hue + 15}, 85%, 60%)`);
  root.style.setProperty('--ring', `hsl(${scheme.primary})`);
  
  // Update gradients
  root.style.setProperty('--gradient-primary', 
    `linear-gradient(135deg, hsl(${scheme.primary}) 0%, hsl(${scheme.accent}) 100%)`
  );
  root.style.setProperty('--gradient-gold', 
    `linear-gradient(135deg, hsl(${scheme.primary}) 0%, hsl(${scheme.accent}) 100%)`
  );
  
  // Update hero gradient
  const glowOpacity = isDark ? 0.15 : 0.12;
  root.style.setProperty('--gradient-hero', 
    `radial-gradient(ellipse at 50% 0%, hsl(${hue}, 85%, 50%, ${glowOpacity}) 0%, transparent 50%)`
  );
  
  // Update glow shadow
  const shadowOpacity = isDark ? 0.25 : 0.2;
  root.style.setProperty('--shadow-glow', 
    `0 0 60px hsl(${hue}, 85%, 50%, ${shadowOpacity})`
  );
  
  // Save to localStorage for persistence across pages
  localStorage.setItem('colorScheme', scheme.name);
  
  // Convert to hex and copy to clipboard
  const hexColor = hslToHex(scheme.primary);
  
  // Get tooltip elements
  const tooltipDesktop = document.getElementById('colorTooltip');
  const tooltipMobile = document.getElementById('colorTooltipMobile');
  const allTooltips = [tooltipDesktop, tooltipMobile].filter(Boolean);
  
  // Always clear any existing timeout first
  if (tooltipTimeout) {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = null;
  }
  
  // Always hide tooltips first (reset state)
  allTooltips.forEach(function(tooltip) {
    tooltip.classList.remove('visible');
  });
  
  // Show tooltip only if requested
  if (showTooltip === true) {
    const tooltipContent = scheme.name + '<br><span style="font-size: 10px; opacity: 0.7;">' + hexColor + ' copied!</span>';
    
    // Small delay to ensure hide happened first
    setTimeout(function() {
      allTooltips.forEach(function(tooltip) {
        tooltip.innerHTML = tooltipContent;
        tooltip.classList.add('visible');
      });
    }, 10);
    
    // Copy hex to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hexColor).catch(function() {
        console.log('Clipboard copy failed, hex:', hexColor);
      });
    }
    
    // Hide after 2 seconds
    tooltipTimeout = setTimeout(function() {
      allTooltips.forEach(function(tooltip) {
        tooltip.classList.remove('visible');
      });
      tooltipTimeout = null;
    }, 2000);
  }
}

function randomizeColors() {
  var newScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  while (newScheme.name === currentScheme && colorSchemes.length > 1) {
    newScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  }
  applyColorScheme(newScheme, true);
  
  // Spin animation on both desktop and mobile buttons
  var btnDesktop = document.getElementById('colorRandomizer');
  var btnMobile = document.getElementById('colorRandomizerMobile');
  var buttons = [btnDesktop, btnMobile];
  
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];
    if (btn) {
      // Remove class first
      btn.classList.remove('spinning');
      // Force DOM reflow - this is critical for animation restart
      btn.offsetHeight;
      // Add class to trigger animation
      btn.classList.add('spinning');
      // Remove after animation completes
      (function(button) {
        setTimeout(function() {
          button.classList.remove('spinning');
        }, 650);
      })(btn);
    }
  }
}

// Initialize color scheme - check for saved preference first
const savedSchemeName = localStorage.getItem('colorScheme');
const savedScheme = savedSchemeName ? colorSchemes.find(s => s.name === savedSchemeName) : null;

if (savedScheme) {
  // Restore saved scheme without showing tooltip
  applyColorScheme(savedScheme, false);
} else {
  // First visit - pick random scheme
  const initialScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  applyColorScheme(initialScheme, false);
}

// Color randomizer button (desktop + mobile)
const colorRandomizer = document.getElementById('colorRandomizer');
const colorRandomizerMobile = document.getElementById('colorRandomizerMobile');

// Use only click event - works on both desktop and mobile
colorRandomizer?.addEventListener('click', randomizeColors);
colorRandomizerMobile?.addEventListener('click', randomizeColors);

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
}

function toggleTheme() {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  // Reapply color scheme for proper light/dark adjustments (without showing tooltip)
  if (currentScheme) {
    const scheme = colorSchemes.find(s => s.name === currentScheme);
    if (scheme) applyColorScheme(scheme, false);
  }
}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// ===== Navigation Scroll Effect =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  const scrollY = window.scrollY;
  
  // Add scrolled class to nav
  if (scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
  
  // Get all the sections including testimonials and leadership which are part of "experience"
  const experienceSection = document.getElementById('experience');
  const testimonialsSection = document.getElementById('testimonials');
  const leadershipSection = document.getElementById('leadership');
  
  // Calculate the effective end of the experience section (includes testimonials and leadership)
  let experienceEndOffset = experienceSection ? experienceSection.offsetTop + experienceSection.offsetHeight : 0;
  if (testimonialsSection) {
    experienceEndOffset = testimonialsSection.offsetTop + testimonialsSection.offsetHeight;
  }
  if (leadershipSection) {
    experienceEndOffset = leadershipSection.offsetTop + leadershipSection.offsetHeight;
  }
  
  // Update active section
  let activeFound = false;
  
  // Iterate in reverse to find the first section we've scrolled past
  const sectionsArray = Array.from(sections);
  for (let i = sectionsArray.length - 1; i >= 0; i--) {
    const section = sectionsArray[i];
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    // Skip testimonials and leadership - they're part of experience
    if (sectionId === 'testimonials' || sectionId === 'leadership') {
      continue;
    }
    
    // Special handling for experience section - include testimonials and leadership
    if (sectionId === 'experience') {
      const isInExperienceArea = scrollY >= sectionTop && scrollY < experienceEndOffset - 100;
      if (isInExperienceArea) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === 'experience') {
            link.classList.add('active');
            activeFound = true;
          }
        });
        break;
      }
    } else if (scrollY >= sectionTop) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
          link.classList.add('active');
          activeFound = true;
        }
      });
      break;
    }
  }
  
  // If no section is active (at top of page), remove all active states
  if (!activeFound) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}

window.addEventListener('scroll', updateNav);
updateNav();

// ===== Mobile Menu =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

mobileMenuToggle?.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu?.classList.toggle('active');
  document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
});

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    
    // Close menu first with animation
    mobileMenuToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
    
    // Then scroll to target after menu animation completes
    if (href && href.startsWith('#')) {
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        // Wait for menu close animation to complete
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Skip mobile menu links as they're handled separately
  if (anchor.classList.contains('mobile-menu-link')) return;
  
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Scroll Reveal Animation - Matches React framer-motion =====

// Configure which elements to animate
const animationConfig = {
  // Section headers get fade-up with slight delay
  sectionHeaders: '.section-header, .about-header, .contact-content > .section-label, .contact-content > .contact-title, .contact-content > .contact-description',
  // Cards get staggered reveal
  cards: '.work-card, .passion-card, .timeline-item, .testimonial-card-large, .leadership-card',
  // Individual elements
  fadeUp: '.hero-content > *, .about-text, .about-resume-btn, .passions-grid, .about-image-wrapper, .impact-cta, .social-links, .btn-gold.btn-large',
  // Timeline gets connected animation
  timeline: '.timeline',
};

// Create intersection observer for fade-up animations
const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-visible');
      fadeUpObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Create observer for staggered card reveals
const staggerObserver = new IntersectionObserver((entries) => {
  const visibleEntries = entries.filter(e => e.isIntersecting);
  visibleEntries.forEach((entry, index) => {
    setTimeout(() => {
      entry.target.classList.add('scroll-visible');
    }, index * 100);
    staggerObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

// Initialize scroll animations
function initScrollAnimations() {
  // Animate section headers
  document.querySelectorAll(animationConfig.sectionHeaders).forEach(el => {
    el.classList.add('scroll-fade-up');
    fadeUpObserver.observe(el);
  });
  
  // Animate cards with stagger
  document.querySelectorAll(animationConfig.cards).forEach((el, index) => {
    el.classList.add('scroll-fade-up');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    staggerObserver.observe(el);
  });
  
  // Animate individual fade-up elements
  document.querySelectorAll(animationConfig.fadeUp).forEach((el, index) => {
    // Skip hero elements - they use CSS animation already
    if (el.closest('.hero-content') && el.classList.contains('animate-fade-up')) {
      return;
    }
    el.classList.add('scroll-fade-up');
    fadeUpObserver.observe(el);
  });
  
  // About section image special handling
  const aboutImage = document.querySelector('.about-image-wrapper');
  if (aboutImage) {
    aboutImage.classList.add('scroll-fade-up');
    fadeUpObserver.observe(aboutImage);
  }
  
  // Timeline items with connected animation
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Work cards with proper stagger per row
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card, index) => {
    card.classList.add('scroll-fade-up');
    // Stagger by position (0, 1, 0, 1 pattern for 2-column grid)
    card.style.transitionDelay = `${(index % 2) * 0.1}s`;
    staggerObserver.observe(card);
  });
  
  // Passion cards with stagger
  const passionCards = document.querySelectorAll('.passion-card');
  passionCards.forEach((card, index) => {
    card.classList.add('scroll-fade-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    staggerObserver.observe(card);
  });
  
  // Leadership cards with stagger
  const leadershipCards = document.querySelectorAll('.leadership-card');
  leadershipCards.forEach((card, index) => {
    card.classList.add('scroll-fade-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    staggerObserver.observe(card);
  });
  
  // Testimonial cards with stagger
  const testimonialCards = document.querySelectorAll('.testimonial-card-large');
  testimonialCards.forEach((card, index) => {
    card.classList.add('scroll-fade-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    staggerObserver.observe(card);
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Legacy reveal support for backwards compatibility
const revealElements = document.querySelectorAll('.reveal:not(.scroll-fade-up)');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.getElementById('scrollToTop');

function updateScrollToTop() {
  if (window.scrollY > 400) {
    scrollToTopBtn?.classList.add('visible');
  } else {
    scrollToTopBtn?.classList.remove('visible');
  }
}

scrollToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', updateScrollToTop);
updateScrollToTop();

// ===== Case Study Page - Get URL Parameter =====
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// If we're on case study page, load the data
if (window.location.pathname.includes('case-study.html')) {
  const slug = getUrlParam('slug');
  if (slug && typeof loadCaseStudy === 'function') {
    loadCaseStudy(slug);
  }
}

// ===== Baby Photo Easter Egg =====
const photoEasterEgg = document.getElementById('photoEasterEgg');
const locationCity = document.getElementById('locationCity');
const locationOrigin = document.getElementById('locationOrigin');

let showBabyPhoto = false;
const supportsHover = window.matchMedia('(hover: hover)').matches;

function updatePhotoState(showBaby) {
  if (showBaby) {
    photoEasterEgg?.classList.add('show-baby');
    if (locationCity) locationCity.textContent = 'The Early Days';
    if (locationOrigin) locationOrigin.textContent = 'Designer in training 👶';
  } else {
    photoEasterEgg?.classList.remove('show-baby');
    if (locationCity) locationCity.textContent = 'Las Vegas, NV';
    if (locationOrigin) locationOrigin.textContent = 'Originally from Toronto';
  }
}

photoEasterEgg?.addEventListener('click', () => {
  showBabyPhoto = !showBabyPhoto;
  updatePhotoState(showBabyPhoto);
});

if (supportsHover) {
  photoEasterEgg?.addEventListener('mouseenter', () => {
    updatePhotoState(true);
  });
  
  photoEasterEgg?.addEventListener('mouseleave', () => {
    updatePhotoState(false);
  });
}

// ===== Work Modal / Bottom Sheet =====
const workModalData = {
  google: {
    company: "Google",
    nda: true,
    projects: [
      {
        title: "Project Mandala",
        description: "I got to shape the vision for a brand-new AI marketing tool from scratch — taking it from 'what if?' to getting the green light from execs.",
        role: "Lead Designer",
        duration: "6 months",
        teamMakeup: "2 PMs, 3 Engineers, 1 Data Scientist, 1 UX Researcher",
        contributions: [
          "Owned end-to-end design from concept to executive presentation",
          "Facilitated 12 design sprints with cross-functional stakeholders",
          "Created high-fidelity prototypes demonstrating AI capabilities",
          "Presented vision and roadmap to SVP-level leadership"
        ],
        challenge: "Marketing teams were stuck juggling disconnected tools and missing out on what AI could do for their campaigns. It was messy and frustrating.",
        approach: "I talked to stakeholders across 5 teams, ran 12 design sprints, and built prototypes that really showed what this AI could do. Then I pitched the whole vision to SVP leadership.",
        outcome: "We got the budget and a dedicated team to build it. The tool is now being developed and will eventually reach 10,000+ marketers.",
        images: ["images/mandala2.gif", "images/mandala3.gif", "images/mandala5.gif"],
        metrics: [
          { label: "Stakeholder buy-in", value: "SVP+" },
          { label: "Design sprints", value: "12" },
          { label: "Team size", value: "12" },
          { label: "Timeline", value: "6 mo" }
        ],
        skills: ["0-1 Strategy", "AI/ML Design", "Executive Presentations", "Design Sprints", "Stakeholder Management"],
        orientation: "desktop"
      },
      {
        title: "Marketing Garage",
        description: "I led the redesign of Google's internal marketing tooling platform, creating a unified system that transformed how 10,000+ marketers discover, access, and use over 200 tools.",
        role: "Lead Designer",
        duration: "19 months (June 2021 – Jan 2023)",
        teamMakeup: "8 engineers, 2 PMs, 15+ marketing stakeholders across Search, YouTube, and Cloud",
        contributions: [
          "Led all design work from discovery through launch",
          "Established four North Star Principles guiding product decisions",
          "Designed the unified tool discovery and access system",
          "Created AI-powered recommendations and smart search functionality",
          "Built the component library and interaction patterns",
          "Facilitated cross-functional workshops with eng, product, and marketing"
        ],
        challenge: "Google marketers were drowning in tool fragmentation. Over 200+ tools existed across different teams, but only 23% of users found the tools they needed effective. Marketing teams lost hours weekly searching for the right tool.",
        approach: "I started by interviewing marketers across different functions to understand their daily workflows. The breakthrough came from shadowing sessions: I watched users spend 15+ minutes searching for tools they'd used before. I developed four North Star Principles: Smart Curation, Unified Access, Contextual Discovery, and Continuous Learning.",
        outcome: "CSAT scores improved significantly as users finally found tools that matched their needs. CUJs and tool requests both increased substantially, showing higher engagement. The platform became the default starting point for new marketing hires.",
        images: ["images/mg-updates-1.gif", "images/mg-updates-2.gif", "images/mg-updates-3.gif"],
        metrics: [
          { label: "Tools unified", value: "200+" },
          { label: "User base", value: "10K+" },
          { label: "Tool effectiveness", value: "↑ CSAT" },
          { label: "Engagement", value: "↑ CUJs" }
        ],
        skills: ["Product Strategy", "AI/ML Design", "Design Systems", "Stakeholder Management", "User Research"],
        orientation: "desktop"
      },
      {
        title: "AI Explorations",
        description: "A collection of early-stage AI concepts I led at Google, exploring how generative AI could transform marketing workflows.",
        role: "Lead Designer",
        duration: "2025",
        teamMakeup: "Various cross-functional teams across Google Marketing",
        contributions: [
          "Led concept development and vision prototyping",
          "Created interactive demos for stakeholder alignment",
          "Explored novel AI interaction patterns"
        ],
        challenge: "",
        approach: "",
        outcome: "",
        images: [],
        metrics: [
          { label: "Concepts", value: "5" }
        ],
        skills: ["AI/ML Design", "Concept Development", "Vision Prototyping"],
        orientation: "desktop",
        explorations: [
          {
            id: "ai-audiences",
            title: "AI Audiences Concept",
            description: "Exploring AI-powered audience segmentation and targeting for smarter campaign delivery.",
            video: "images/ai-audiences-concept.mp4"
          },
          {
            id: "persona-agent",
            title: "GML Persona Agent",
            description: "An AI agent that generates and iterates on marketing personas through natural conversation.",
            video: "images/gml-persona-agent.mp4"
          },
          {
            id: "vision-work-3",
            title: "Creative Vision Exploration",
            description: "Conceptualizing AI-assisted creative development workflows for marketing teams.",
            video: "images/vision-work-3.mp4"
          },
          {
            id: "vision-work-4",
            title: "Campaign Intelligence",
            description: "AI-driven insights and recommendations for optimizing campaign performance.",
            video: "images/vision-work-4.mp4"
          },
          {
            id: "asset-studio",
            title: "Asset Studio MVP",
            description: "A prototype for AI-generated marketing assets with brand consistency controls.",
            video: "images/asset-studio-mvp.mp4"
          }
        ]
      }
    ]
  },
  linkedin: {
    company: "LinkedIn",
    nda: false,
    projects: [
      {
        title: "SMB Hiring Experience Redesign",
        description: "I redesigned how small businesses find and hire people on LinkedIn — making it way less intimidating and actually useful on mobile.",
        role: "Senior Product Designer",
        duration: "10 months",
        teamMakeup: "2 PMs, 5 Engineers, 2 UX Researchers, 1 Content Strategist",
        contributions: [
          "Led mobile-first redesign of the complete hiring flow",
          "Conducted 40+ contextual interviews with SMB employers",
          "Identified and prioritized 7 critical friction points",
          "Designed simplified job posting and candidate matching features"
        ],
        challenge: "Small business owners felt like LinkedIn's hiring tools were built for big companies with HR departments. They couldn't compete, and it showed in the numbers.",
        approach: "I spent time with 40+ small business owners to really understand their struggles. Found 7 major pain points and redesigned the whole mobile experience — simpler job posts, smarter matching, easier messaging.",
        outcome: "Successful hires jumped 60%. Candidates responded 185% more often, and hiring got 40% faster. The feature took off way beyond what we expected.",
        images: ["images/linkedin-future.mp4", "images/linkedin-rate.mp4", "images/linkedin-reject.mp4", "images/linkedin-yoe.mp4", "images/linkedin-message.mp4"],
        metrics: [
          { label: "Successful hires", value: "+60%" },
          { label: "Response rate", value: "+185%" },
          { label: "Time to hire", value: "-40%" },
          { label: "Adoption", value: "3x" }
        ],
        skills: ["Mobile-First Design", "B2B UX", "User Research", "Journey Mapping", "Conversion Optimization"],
        orientation: "mobile"
      }
    ]
  },
  apple: {
    company: "Apple",
    nda: true,
    projects: [
      {
        title: "Global Training Platform",
        description: "I rebuilt Apple's training platform from scratch — creating a design system that works for 500,000+ employees across the globe.",
        role: "UX Designer",
        duration: "18 months",
        teamMakeup: "3 PMs, 8 Engineers, 2 Designers, Localization Team",
        contributions: [
          "Created comprehensive design system with 200+ components",
          "Ensured WCAG AA compliance across all components",
          "Partnered with localization teams for 24-language support",
          "Led usability testing across 8 countries"
        ],
        challenge: "The old training system was all over the place — different regions had different experiences, accessibility was spotty, and it needed to work in 24 languages.",
        approach: "I built a design system with 200+ components, all accessible. Worked with localization teams to get the cultural nuances right, and tested with real employees in 8 different countries.",
        outcome: "Launched to half a million retail employees worldwide. Training completion went up 45%, and the design system ended up being used for other internal tools too.",
        images: ["images/atlas-homepage.png", "images/atlas-demo.gif", "images/atlas-mocks.png", "images/atlas-personalization.png", "images/atlas-styleguide.png"],
        metrics: [
          { label: "Global users", value: "500K+" },
          { label: "Components", value: "200+" },
          { label: "Languages", value: "24" },
          { label: "Completion", value: "+45%" }
        ],
        skills: ["Design Systems", "Accessibility", "Enterprise UX", "Localization", "Cross-cultural Design"],
        orientation: "desktop"
      }
    ]
  },
  ebay: {
    company: "eBay",
    nda: false,
    projects: [
      {
        title: "Returns Experience Transformation",
        description: "I turned eBay's frustrating returns process into something that actually built trust — especially for nervous first-time buyers.",
        role: "Product Designer",
        duration: "8 months",
        teamMakeup: "1 PM, 4 Engineers, 1 UX Researcher, Customer Support Team",
        contributions: [
          "Mapped complete returns journey across buyer/seller perspectives",
          "Analyzed support tickets to identify 12 friction points",
          "Redesigned mobile flow with progress indicators and timelines",
          "Collaborated with support team on proactive communication"
        ],
        challenge: "Returns were the biggest headache on eBay — confusing, slow, and the top reason people called support. First-time buyers were especially hesitant to trust individual sellers.",
        approach: "I mapped out the whole returns journey from both buyer and seller sides. Dug through support tickets to find 12 pain points, then redesigned the mobile flow with clear progress tracking and proactive updates.",
        outcome: "64% more people completed returns, and way faster too. Support tickets dropped 35%. NPS jumped 22 points — people actually started trusting the process.",
        images: ["images/case-study-netflix.jpg", "images/research-board.jpg", "images/process-iteration.jpg"],
        metrics: [
          { label: "Completion", value: "+64%" },
          { label: "Support tickets", value: "-35%" },
          { label: "NPS lift", value: "+22pts" },
          { label: "Time saved", value: "50%" }
        ],
        skills: ["E-commerce UX", "Journey Mapping", "Trust Design", "Support Optimization", "Mobile Design"],
        orientation: "mobile"
      }
    ]
  }
};

let currentModalCompany = null;
let currentProjectIndex = 0;
let currentImageIndex = 0;
let learnMoreOpen = false;

function openWorkModal(companyKey) {
  const data = workModalData[companyKey];
  if (!data) return;
  
  currentModalCompany = companyKey;
  currentProjectIndex = 0;
  currentImageIndex = 0;
  learnMoreOpen = false;
  
  // Update header
  document.getElementById('modalCompany').textContent = data.company;
  const ndaBadge = document.getElementById('modalNda');
  const ndaNotice = document.getElementById('modalNdaNotice');
  if (data.nda) {
    ndaBadge.style.display = 'inline-flex';
    ndaNotice.style.display = 'flex';
  } else {
    ndaBadge.style.display = 'none';
    ndaNotice.style.display = 'none';
  }
  
  // Render tabs
  renderProjectTabs(data);
  
  // Render project content
  renderProjectContent(data.projects[0]);
  
  // Show modal
  document.getElementById('workModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
  const modalContent = document.getElementById('workModalContent');
  modalContent.style.transform = '';
  modalContent.style.transition = '';
  document.getElementById('workModal').classList.remove('active');
  document.body.style.overflow = '';
  currentModalCompany = null;
}

function renderProjectTabs(data) {
  const tabsContainer = document.getElementById('modalTabs');
  
  if (data.projects.length <= 1) {
    tabsContainer.style.display = 'none';
    return;
  }
  
  tabsContainer.style.display = 'flex';
  tabsContainer.innerHTML = data.projects.map((project, index) => `
    <button class="work-modal-tab ${index === currentProjectIndex ? 'active' : ''}" onclick="switchProject(${index})">
      ${project.title}
    </button>
  `).join('');
}

function switchProject(index) {
  const data = workModalData[currentModalCompany];
  if (!data) return;
  
  currentProjectIndex = index;
  currentImageIndex = 0;
  learnMoreOpen = false;
  
  // Update tabs
  document.querySelectorAll('.work-modal-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  
  // Render project content
  renderProjectContent(data.projects[index]);
}

// Helper to check if media is a video
function isVideoFile(src) {
  return src && (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov'));
}

function renderProjectContent(project) {
  // Update carousel class based on orientation
  const carouselEl = document.getElementById('modalCarousel');
  carouselEl.classList.remove('mobile-orientation', 'desktop-orientation');
  carouselEl.classList.add(project.orientation === 'mobile' ? 'mobile-orientation' : 'desktop-orientation');
  
  // Images/Videos
  const imagesContainer = document.getElementById('modalImages');
  imagesContainer.innerHTML = project.images.map((src, index) => {
    const className = project.orientation === 'mobile' ? 'mobile-image' : '';
    if (isVideoFile(src)) {
      return `<video src="${src}" autoplay loop muted playsinline class="${className}" onclick="openLightbox(${index})"></video>`;
    }
    return `<img src="${src}" alt="${project.title}" class="${className}" onclick="openLightbox(${index})">`;
  }).join('');
  
  // Dots
  const dotsContainer = document.getElementById('modalDots');
  dotsContainer.innerHTML = project.images.map((_, i) => `
    <button class="work-modal-dot ${i === 0 ? 'active' : ''}" onclick="scrollToImage(${i})"></button>
  `).join('');
  
  // Setup scroll listener for dots
  imagesContainer.onscroll = () => {
    const scrollLeft = imagesContainer.scrollLeft;
    const width = imagesContainer.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImageIndex) {
      currentImageIndex = newIndex;
      updateDots();
    }
  };
  
  // Title & Description
  document.getElementById('modalProjectTitle').textContent = project.title;
  document.getElementById('modalProjectDesc').textContent = project.description;
  
  // Meta tags - Role, Duration, Team
  document.getElementById('modalMetaTags').innerHTML = `
    <span class="work-modal-meta-tag work-modal-meta-tag--primary">${project.role}</span>
    <span class="work-modal-meta-tag">${project.duration}</span>
    <span class="work-modal-meta-tag">${project.teamMakeup}</span>
  `;
  
  // Key Metrics - Hero style grid
  document.getElementById('modalMetrics').innerHTML = project.metrics.map((m, i) => `
    <div class="work-modal-metric" style="animation-delay: ${i * 0.1}s">
      <span class="work-modal-metric-value">${m.value}</span>
      <span class="work-modal-metric-label">${m.label}</span>
    </div>
  `).join('');
  
  // Challenge & Approach - Side by side cards
  document.getElementById('modalChallengeApproach').innerHTML = `
    <div class="work-modal-info-card">
      <div class="work-modal-info-header">
        <span class="work-modal-info-dot work-modal-info-dot--challenge"></span>
        <h5 class="work-modal-info-label">The Challenge</h5>
      </div>
      <p class="work-modal-info-text">${project.challenge}</p>
    </div>
    <div class="work-modal-info-card">
      <div class="work-modal-info-header">
        <span class="work-modal-info-dot work-modal-info-dot--approach"></span>
        <h5 class="work-modal-info-label">My Approach</h5>
      </div>
      <p class="work-modal-info-text">${project.approach}</p>
    </div>
  `;
  
  // What I Did - Enhanced list with styled items
  document.getElementById('modalContributions').innerHTML = `
    <h5 class="work-modal-contributions-header">
      <span class="work-modal-contributions-line"></span>
      What I Did
    </h5>
    <ul class="work-modal-contribution-list">
      ${project.contributions.map((c, i) => `
        <li class="work-modal-contribution-item" style="animation-delay: ${0.2 + i * 0.05}s">
          <span class="work-modal-contribution-bullet">
            <span class="work-modal-contribution-dot"></span>
          </span>
          <span>${c}</span>
        </li>
      `).join('')}
    </ul>
  `;
  
  // The Result - Premium highlight box
  document.getElementById('modalResult').innerHTML = `
    <div class="work-modal-result-glow"></div>
    <div class="work-modal-result-content">
      <h5 class="work-modal-result-label">
        <svg class="work-modal-result-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        The Result
      </h5>
      <p class="work-modal-result-text">${project.outcome}</p>
    </div>
  `;
  
  // Skills - Tag cloud style
  document.getElementById('modalSkills').innerHTML = project.skills.map((s, i) => `
    <span class="work-modal-skill" style="animation-delay: ${0.4 + i * 0.03}s">${s}</span>
  `).join('');
}

function scrollToImage(index) {
  const imagesContainer = document.getElementById('modalImages');
  const width = imagesContainer.offsetWidth;
  imagesContainer.scrollTo({ left: width * index, behavior: 'smooth' });
  currentImageIndex = index;
  updateDots();
}

function updateDots() {
  document.querySelectorAll('.work-modal-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentImageIndex);
  });
}

function toggleLearnMore() {
  learnMoreOpen = !learnMoreOpen;
  document.getElementById('learnMoreContent').classList.toggle('open', learnMoreOpen);
  document.getElementById('learnMoreChevron').classList.toggle('open', learnMoreOpen);
}

// Lightbox with swipe and pinch-to-zoom
let lightboxScale = 1;
let lightboxTouchStart = null;
let lightboxTouchEnd = null;
let lightboxInitialPinchDistance = null;
let lightboxIsPinching = false;
const LIGHTBOX_MIN_SWIPE = 50;
const LIGHTBOX_MIN_SCALE = 1;
const LIGHTBOX_MAX_SCALE = 4;

function updateLightboxMedia(src) {
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxVideo = document.getElementById('lightboxVideo');
  
  if (isVideoFile(src)) {
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'block';
    lightboxVideo.src = src;
    lightboxVideo.play();
  } else {
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
    lightboxImage.style.display = 'block';
    lightboxImage.src = src;
  }
}

function openLightbox(imageIndex) {
  const data = workModalData[currentModalCompany];
  if (!data) return;
  
  const project = data.projects[currentProjectIndex];
  currentImageIndex = imageIndex;
  lightboxScale = 1;
  updateLightboxTransform();
  
  updateLightboxMedia(project.images[imageIndex]);
  document.getElementById('lightboxCounter').textContent = `${imageIndex + 1} / ${project.images.length}`;
  updateLightboxHint();
  document.getElementById('workLightbox').classList.add('active');
  
  // Add touch listeners
  const container = document.getElementById('lightboxImageContainer');
  container.addEventListener('touchstart', handleLightboxTouchStart, { passive: false });
  container.addEventListener('touchmove', handleLightboxTouchMove, { passive: false });
  container.addEventListener('touchend', handleLightboxTouchEnd, { passive: true });
}

function closeLightbox() {
  lightboxScale = 1;
  updateLightboxTransform();
  document.getElementById('workLightbox').classList.remove('active');
  
  // Pause video if playing
  const lightboxVideo = document.getElementById('lightboxVideo');
  if (lightboxVideo) {
    lightboxVideo.pause();
  }
  
  const container = document.getElementById('lightboxImageContainer');
  container.removeEventListener('touchstart', handleLightboxTouchStart);
  container.removeEventListener('touchmove', handleLightboxTouchMove);
  container.removeEventListener('touchend', handleLightboxTouchEnd);
}

function updateLightboxTransform() {
  const container = document.getElementById('lightboxImageContainer');
  container.style.transform = `scale(${lightboxScale})`;
  container.classList.toggle('pinching', lightboxIsPinching);
}

function updateLightboxHint() {
  const hint = document.getElementById('lightboxHint');
  if (lightboxScale > 1) {
    hint.textContent = 'Double-tap to reset';
  } else {
    hint.textContent = 'Pinch to zoom • Swipe to navigate';
  }
}

function getDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

function handleLightboxTouchStart(e) {
  if (e.touches.length === 2) {
    lightboxIsPinching = true;
    lightboxInitialPinchDistance = getDistance(e.touches);
    e.preventDefault();
  } else if (e.touches.length === 1 && lightboxScale === 1) {
    lightboxTouchEnd = null;
    lightboxTouchStart = e.touches[0].clientX;
  }
}

function handleLightboxTouchMove(e) {
  if (e.touches.length === 2 && lightboxInitialPinchDistance !== null) {
    const currentDistance = getDistance(e.touches);
    const newScale = Math.min(LIGHTBOX_MAX_SCALE, Math.max(LIGHTBOX_MIN_SCALE, lightboxScale * (currentDistance / lightboxInitialPinchDistance)));
    lightboxScale = newScale;
    lightboxInitialPinchDistance = currentDistance;
    updateLightboxTransform();
    e.preventDefault();
  } else if (e.touches.length === 1 && lightboxScale === 1) {
    lightboxTouchEnd = e.touches[0].clientX;
  }
}

function handleLightboxTouchEnd() {
  lightboxIsPinching = false;
  lightboxInitialPinchDistance = null;
  
  // Snap back if too small
  if (lightboxScale < 1.1) {
    lightboxScale = 1;
  }
  updateLightboxTransform();
  updateLightboxHint();
  
  // Handle swipe
  if (lightboxScale === 1 && lightboxTouchStart !== null && lightboxTouchEnd !== null) {
    const distance = lightboxTouchStart - lightboxTouchEnd;
    if (distance > LIGHTBOX_MIN_SWIPE) {
      nextLightboxImage();
    } else if (distance < -LIGHTBOX_MIN_SWIPE) {
      prevLightboxImage();
    }
  }
  
  lightboxTouchStart = null;
  lightboxTouchEnd = null;
}

function handleLightboxDoubleTap() {
  if (lightboxScale > 1) {
    lightboxScale = 1;
  } else {
    lightboxScale = 2.5;
  }
  updateLightboxTransform();
  updateLightboxHint();
}

function handleLightboxBackdropClick(e) {
  if (e.target.id === 'workLightbox') {
    if (lightboxScale > 1) {
      lightboxScale = 1;
      updateLightboxTransform();
      updateLightboxHint();
    } else {
      closeLightbox();
    }
  }
}

function prevLightboxImage() {
  if (lightboxScale > 1) return;
  
  const data = workModalData[currentModalCompany];
  if (!data) return;
  
  const project = data.projects[currentProjectIndex];
  currentImageIndex = currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
  
  updateLightboxMedia(project.images[currentImageIndex]);
  document.getElementById('lightboxCounter').textContent = `${currentImageIndex + 1} / ${project.images.length}`;
}

function nextLightboxImage() {
  if (lightboxScale > 1) return;
  
  const data = workModalData[currentModalCompany];
  if (!data) return;
  
  const project = data.projects[currentProjectIndex];
  currentImageIndex = currentImageIndex === project.images.length - 1 ? 0 : currentImageIndex + 1;
  
  updateLightboxMedia(project.images[currentImageIndex]);
  document.getElementById('lightboxCounter').textContent = `${currentImageIndex + 1} / ${project.images.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (document.getElementById('workLightbox').classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
  } else if (document.getElementById('workModal').classList.contains('active')) {
    if (e.key === 'Escape') closeWorkModal();
  }
});

// ===== Swipe-to-Dismiss for Bottom Sheet =====
let swipeStartY = 0;
let swipeCurrentY = 0;
let isSwiping = false;
const SWIPE_THRESHOLD = 100; // pixels to trigger dismiss
const SWIPE_VELOCITY_THRESHOLD = 0.5; // pixels per ms
let swipeStartTime = 0;

function initSwipeToDismiss() {
  const modalContent = document.getElementById('workModalContent');
  const modalHeader = document.querySelector('.work-modal-header');
  const modalScroll = document.querySelector('.work-modal-scroll');
  
  if (!modalContent || !modalHeader) return;
  
  // Only enable swipe on the header/handle area
  modalHeader.addEventListener('touchstart', handleSwipeStart, { passive: true });
  modalHeader.addEventListener('touchmove', handleSwipeMove, { passive: false });
  modalHeader.addEventListener('touchend', handleSwipeEnd, { passive: true });
  
  // Also allow swipe when scrolled to top
  if (modalScroll) {
    modalScroll.addEventListener('touchstart', (e) => {
      if (modalScroll.scrollTop === 0) {
        handleSwipeStart(e);
      }
    }, { passive: true });
    
    modalScroll.addEventListener('touchmove', (e) => {
      if (isSwiping || modalScroll.scrollTop === 0) {
        handleSwipeMove(e);
      }
    }, { passive: false });
    
    modalScroll.addEventListener('touchend', handleSwipeEnd, { passive: true });
  }
}

function handleSwipeStart(e) {
  if (!document.getElementById('workModal').classList.contains('active')) return;
  if (window.innerWidth >= 768) return; // Only on mobile
  
  swipeStartY = e.touches[0].clientY;
  swipeStartTime = Date.now();
  isSwiping = false;
  
  const modalContent = document.getElementById('workModalContent');
  modalContent.style.transition = 'none';
}

function handleSwipeMove(e) {
  if (!document.getElementById('workModal').classList.contains('active')) return;
  if (window.innerWidth >= 768) return;
  
  swipeCurrentY = e.touches[0].clientY;
  const deltaY = swipeCurrentY - swipeStartY;
  
  // Only allow swiping down
  if (deltaY > 0) {
    isSwiping = true;
    e.preventDefault();
    
    const modalContent = document.getElementById('workModalContent');
    // Apply resistance as user swipes further
    const resistance = 0.5;
    const translateY = deltaY * resistance;
    modalContent.style.transform = `translateY(${translateY}px)`;
    
    // Fade backdrop based on swipe distance
    const backdrop = document.querySelector('.work-modal-backdrop');
    const opacity = Math.max(0, 0.7 - (deltaY / 500));
    backdrop.style.background = `hsla(0, 0%, 0%, ${opacity})`;
  }
}

function handleSwipeEnd(e) {
  if (!isSwiping) return;
  if (window.innerWidth >= 768) return;
  
  const deltaY = swipeCurrentY - swipeStartY;
  const swipeTime = Date.now() - swipeStartTime;
  const velocity = deltaY / swipeTime;
  
  const modalContent = document.getElementById('workModalContent');
  const backdrop = document.querySelector('.work-modal-backdrop');
  
  modalContent.style.transition = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
  backdrop.style.transition = 'background 0.3s ease';
  
  // Dismiss if swiped past threshold or with enough velocity
  if (deltaY > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
    modalContent.style.transform = 'translateY(100%)';
    backdrop.style.background = 'hsla(0, 0%, 0%, 0)';
    
    setTimeout(() => {
      closeWorkModal();
      backdrop.style.background = '';
      backdrop.style.transition = '';
    }, 300);
  } else {
    // Snap back
    modalContent.style.transform = '';
    backdrop.style.background = '';
    
    setTimeout(() => {
      modalContent.style.transition = '';
      backdrop.style.transition = '';
    }, 300);
  }
  
  isSwiping = false;
  swipeStartY = 0;
  swipeCurrentY = 0;
}

// Initialize swipe-to-dismiss when DOM is ready
document.addEventListener('DOMContentLoaded', initSwipeToDismiss);
// Also try immediately in case DOM is already loaded
if (document.readyState !== 'loading') {
  initSwipeToDismiss();
}

// ===== Page Transitions =====
function initPageTransitions() {
  // Create transition overlay if it doesn't exist
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }

  // Wrap main content for enter animation
  const mainContent = document.querySelector('main') || document.body;
  
  // Add page-entering class initially, then remove after load
  mainContent.classList.add('page-content', 'page-entering');
  
  // Trigger enter animation after a brief delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mainContent.classList.remove('page-entering');
      mainContent.classList.add('page-entered');
    });
  });

  // Handle all internal navigation links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip external links, anchor links, javascript links, and special links
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.hasAttribute('download') ||
        link.target === '_blank') {
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateWithTransition(href);
    });
  });
}

function navigateWithTransition(href) {
  const overlay = document.querySelector('.page-transition-overlay');
  const mainContent = document.querySelector('.page-content');
  
  if (!overlay) {
    // Fallback: navigate directly if overlay doesn't exist
    window.location.href = href;
    return;
  }

  // Start exit transition
  overlay.classList.add('transitioning-out');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(-10px)';
  }

  // Navigate after transition
  setTimeout(() => {
    window.location.href = href;
  }, 300);
}

// Handle browser back/forward with transition
window.addEventListener('pageshow', (event) => {
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) {
    overlay.classList.remove('transitioning-out');
    overlay.classList.add('transitioning-in');
    
    // Remove transitioning-in class after animation completes
    setTimeout(() => {
      overlay.classList.remove('transitioning-in');
    }, 300);
  }
  
  // Re-trigger enter animation on back/forward navigation
  if (event.persisted) {
    const mainContent = document.querySelector('.page-content');
    if (mainContent) {
      mainContent.classList.remove('page-entered');
      mainContent.classList.add('page-entering');
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainContent.classList.remove('page-entering');
          mainContent.classList.add('page-entered');
        });
      });
    }
  }
});

// Initialize page transitions when DOM is ready
document.addEventListener('DOMContentLoaded', initPageTransitions);
if (document.readyState !== 'loading') {
  initPageTransitions();
}
