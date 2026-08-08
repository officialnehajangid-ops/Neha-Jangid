// ===== Case Study Page Logic - Matching React CompanyWorkPage =====

// Get URL parameter
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get project slug from either 'project' or 'slug' param for backwards compatibility
function getProjectSlug() {
  return getUrlParam('project') || getUrlParam('slug');
}

// Company to projects mapping (matching React structure)
const companyProjects = {
  'google': {
    company: 'Google',
    role: 'Senior Interaction Designer',
    period: '2021 – 2025',
    nda: true,
    projects: [
      { id: 'mandala', slug: 'mandala', dataKey: 'google-mandala', title: 'Project Mandala' },
      { id: 'marketing-garage', slug: 'marketing-garage', dataKey: 'google-garage', title: 'Marketing Garage' },
      { id: 'ai-explorations', slug: 'ai-explorations', dataKey: 'google-ai-explorations', title: 'AI Explorations' }
    ]
  },
  'linkedin': {
    company: 'LinkedIn',
    role: 'Senior Product Designer',
    period: '2019 – 2021',
    projects: [
      { id: 'smb-hiring', slug: 'smb-hiring', dataKey: 'linkedin-hiring', title: 'SMB Hiring Experience' }
    ]
  },
  'apple': {
    company: 'Apple',
    role: 'UX Designer',
    period: '2018 – 2019',
    nda: true,
    projects: [
      { id: 'training-platform', slug: 'training-platform', dataKey: 'apple-atlas', title: 'Global Training Platform' }
    ]
  },
  'ebay': {
    company: 'eBay',
    role: 'Product Designer',
    period: '2017 – 2018',
    projects: [
      { id: 'returns-experience', slug: 'returns-experience', dataKey: 'ebay-returns', title: 'Returns Experience' }
    ]
  }
};

// Get company from slug
function getCompanyFromSlug(slug) {
  for (const [companyKey, companyData] of Object.entries(companyProjects)) {
    const project = companyData.projects.find(p => p.slug === slug);
    if (project) {
      return { companyKey, companyData, project };
    }
  }
  return null;
}

// Project navigation - navigate between COMPANIES
function getProjectNavigation(currentSlug) {
  const companyOrder = ['google', 'linkedin', 'apple', 'ebay'];
  const currentCompanyInfo = getCompanyFromSlug(currentSlug);
  if (!currentCompanyInfo) return { prev: null, next: null };
  
  const currentCompanyKey = currentCompanyInfo.companyKey;
  const currentCompanyIndex = companyOrder.indexOf(currentCompanyKey);
  
  const prevCompanyKey = currentCompanyIndex > 0 ? companyOrder[currentCompanyIndex - 1] : companyOrder[companyOrder.length - 1];
  const nextCompanyKey = currentCompanyIndex < companyOrder.length - 1 ? companyOrder[currentCompanyIndex + 1] : companyOrder[0];
  
  const prevCompany = companyProjects[prevCompanyKey];
  const nextCompany = companyProjects[nextCompanyKey];
  
  const prevProject = prevCompany?.projects[0];
  const nextProject = nextCompany?.projects[0];
  
  return {
    prev: prevProject ? { ...prevProject, company: prevCompany.company } : null,
    next: nextProject ? { ...nextProject, company: nextCompany.company } : null
  };
}

// Parse **bold** markdown syntax to HTML
function parseMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

// Check if content is valid (not empty or placeholder)
function hasNarrativeContent(content) {
  return content && content !== "Details coming soon.";
}

// Check if media is video
function isVideo(src) {
  return src && (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov'));
}

// Render media element (image or video)
function renderMedia(src, alt, className = '') {
  if (isVideo(src)) {
    return `<video src="${src}" autoplay loop muted playsinline class="${className}"></video>`;
  }
  return `<img src="${src}" alt="${alt}" class="${className}">`;
}

// Current active project index
let activeProjectIndex = 0;

// Load case study
function loadCaseStudy(slug) {
  const container = document.getElementById('caseStudyContent');
  const companyInfo = getCompanyFromSlug(slug);
  
  if (!companyInfo) {
    container.innerHTML = `
      <div class="cs-not-found">
        <h1>Case study not found</h1>
        <a href="index.html#work" class="cs-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to work
        </a>
      </div>
    `;
    return;
  }
  
  const dataKey = companyInfo.project.dataKey;
  const study = caseStudiesData[dataKey];
  
  if (!study) {
    container.innerHTML = `
      <div class="cs-not-found">
        <h1>Case study not found</h1>
        <a href="index.html#work" class="cs-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to work
        </a>
      </div>
    `;
    return;
  }
  
  document.title = `${study.title} - ${companyInfo.companyData.company} | Michael Tsirakis`;
  activeProjectIndex = companyInfo.companyData.projects.findIndex(p => p.slug === slug);
  
  container.innerHTML = renderCaseStudy(study, companyInfo);
  
  setupProjectTabs(companyInfo);
  setupLightbox();
  setupScrollAnimations();
  setupVideoAutoplay();
}

// Render case study HTML - matching React CompanyWorkPage layout exactly
function renderCaseStudy(study, companyInfo) {
  const { companyData, project } = companyInfo;
  const hasMultipleProjects = companyData.projects.length > 1;
  const nav = getProjectNavigation(project.slug);
  
  // Get images array
  const images = study.images || (study.heroImage ? [study.heroImage] : []);
  
  return `
    <!-- Header -->
    <header class="cs-header">
      <div class="container cs-header-container">
        <a href="index.html#work" class="cs-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </a>
        
        <div class="cs-company-header">
          <div class="cs-company-meta-row">
            <span class="cs-company-period">${companyData.period}</span>
            ${companyData.nda ? `
              <span class="cs-nda-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                NDA
              </span>
            ` : ''}
          </div>
          <h1 class="cs-company-name">${companyData.company}</h1>
          <p class="cs-company-role">${companyData.role}</p>
        </div>
      </div>
    </header>
    
    ${hasMultipleProjects ? `
    <!-- Project Tabs -->
    <div class="cs-tabs-sticky">
      <div class="container cs-tabs-container">
        <div class="cs-tabs" id="projectTabs">
          ${companyData.projects.map((p, index) => `
            <button 
              class="cs-tab ${index === activeProjectIndex ? 'active' : ''}" 
              data-slug="${p.slug}"
              data-index="${index}"
            >
              ${p.title}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    ` : ''}
    
    <!-- Animated Content Wrapper -->
    <div class="cs-content-wrapper" id="projectContent">
      
      ${study.heroImage ? `
      <!-- Hero Image/Video -->
      <section class="cs-hero-section">
        <div class="container cs-hero-container">
          <div class="cs-hero-image-wrapper cs-lightbox-trigger" data-index="0">
            ${renderMedia(study.heroImage, study.title, 'cs-hero-image')}
          </div>
        </div>
      </section>
      ` : ''}
      
      <!-- Project Info -->
      <section class="cs-project-info">
        <div class="container cs-project-info-container">
          <!-- Title, Description & Metrics - Two Column -->
          <div class="cs-info-grid cs-fade-in">
            <!-- Left - Title & Description -->
            <div class="cs-info-left">
              <h2 class="cs-project-title">${study.title}</h2>
              <p class="cs-project-description">${study.overview || study.tldr}</p>
            </div>
            
            <!-- Right - Metrics -->
            ${study.outcomes && study.outcomes.length > 0 ? `
              <div class="cs-metrics-grid">
                ${study.outcomes.slice(0, 4).map(outcome => `
                  <div class="cs-metric-item">
                    <div class="cs-metric-value">${outcome.metric}</div>
                    <div class="cs-metric-label">${outcome.label}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <!-- Role, Duration, Team -->
          <div class="cs-meta-row cs-fade-in cs-fade-delay-1">
            <div class="cs-meta-item">
              <h4>Role</h4>
              <p>${study.role}</p>
            </div>
            <div class="cs-meta-item">
              <h4>Duration</h4>
              <p>${study.duration}</p>
            </div>
            <div class="cs-meta-item team-context">
              <h4>Team</h4>
              <p>${study.teamContext || study.team || 'Cross-functional product team'}</p>
            </div>
          </div>
          
          <!-- My Contributions -->
          ${study.contributions && study.contributions.length > 0 && study.contributions[0] !== 'Details coming soon' ? `
            <div class="cs-contributions cs-fade-in cs-fade-delay-2">
              <h4>My Contributions</h4>
              <ul class="cs-contributions-list">
                ${study.contributions.map(c => `
                  <li>
                    <span class="cs-contribution-bullet"></span>
                    ${c}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
      
      <!-- Narrative Content with Inline Full-Width Images -->
      <section class="cs-narrative-section">
        
        <!-- The Challenge -->
        ${hasNarrativeContent(study.theProblem) ? `
          <div class="cs-narrative-text-container cs-fade-in">
            <span class="cs-narrative-label">The Challenge</span>
            <p class="cs-narrative-text">${parseMarkdown(study.theProblem)}</p>
          </div>
        ` : ''}
        
        <!-- Full-width image after Challenge -->
        ${images.length > 1 ? `
          <div class="cs-narrative-fullwidth-image cs-lightbox-trigger cs-fade-in" data-index="1">
            ${renderMedia(images[1], `${study.title} - Process`, 'cs-fullwidth-media')}
          </div>
        ` : ''}
        
        <!-- The Approach -->
        ${hasNarrativeContent(study.theSolution) ? `
          <div class="cs-narrative-text-container cs-fade-in">
            <span class="cs-narrative-label">The Approach</span>
            <p class="cs-narrative-text">${parseMarkdown(study.theSolution)}</p>
          </div>
        ` : ''}
        
        <!-- Full-width image after Approach -->
        ${images.length > 2 ? `
          <div class="cs-narrative-fullwidth-image cs-lightbox-trigger cs-fade-in" data-index="2">
            ${renderMedia(images[2], `${study.title} - Solution`, 'cs-fullwidth-media')}
          </div>
        ` : ''}
        
        <!-- Additional images gallery -->
        ${images.length > 3 ? `
          <div class="cs-narrative-gallery cs-fade-in">
            <div class="cs-narrative-gallery-grid">
              ${images.slice(3).map((img, index) => `
                <div class="cs-narrative-gallery-item cs-lightbox-trigger cs-fade-in" data-index="${index + 3}" style="--delay: ${index * 0.1}s">
                  ${renderMedia(img, `${study.title} - Image ${index + 4}`, 'cs-gallery-media')}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- AI Explorations Section -->
        ${study.explorations && study.explorations.length > 0 ? `
          <div class="cs-explorations-section cs-fade-in">
            <div class="container cs-explorations-container">
              <div class="cs-explorations-header">
                <span class="cs-narrative-label">Concepts</span>
                <p class="cs-explorations-intro">A collection of early-stage AI explorations pushing the boundaries of marketing technology.</p>
              </div>
              
              <div class="cs-explorations-list">
                ${study.explorations.map((exp, index) => `
                  <div class="cs-exploration-item cs-fade-in" style="--delay: ${index * 0.1}s">
                    <div class="cs-exploration-text">
                      <h4 class="cs-exploration-title">${exp.title}</h4>
                      <p class="cs-exploration-desc">${exp.description}</p>
                    </div>
                    <div class="cs-exploration-video cs-video-lightbox-trigger" data-video="${exp.video}" data-index="${index}">
                      <video src="${exp.video}" autoplay loop muted playsinline></video>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}
        
        <!-- The Outcome -->
        ${hasNarrativeContent(study.theImpact) ? `
          <div class="cs-narrative-text-container cs-fade-in">
            <span class="cs-narrative-label">The Outcome</span>
            <p class="cs-narrative-text">${parseMarkdown(study.theImpact)}</p>
          </div>
        ` : ''}
        
        <!-- Reflection Box -->
        ${hasNarrativeContent(study.theLearning) ? `
          <div class="cs-narrative-text-container cs-fade-in">
            <div class="cs-reflection-box">
              <span class="cs-narrative-label">Reflection</span>
              <p class="cs-reflection-text">${parseMarkdown(study.theLearning)}</p>
            </div>
          </div>
        ` : ''}
        
      </section>
      
    </div>
    
    <!-- Project Navigation -->
    <section class="cs-project-nav">
      <div class="container cs-project-nav-container">
        ${nav.prev ? `
          <a href="case-study.html?project=${nav.prev.slug}" class="cs-nav-card cs-nav-prev">
            <span class="cs-nav-direction">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Previous
            </span>
            <span class="cs-nav-title">${nav.prev.company}</span>
            <span class="cs-nav-project">${nav.prev.title}</span>
          </a>
        ` : '<div></div>'}
        
        ${nav.next ? `
          <a href="case-study.html?project=${nav.next.slug}" class="cs-nav-card cs-nav-next">
            <span class="cs-nav-direction">
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span class="cs-nav-title">${nav.next.company}</span>
            <span class="cs-nav-project">${nav.next.title}</span>
          </a>
        ` : '<div></div>'}
      </div>
    </section>
  `;
}

// Setup project tab switching with animation
function setupProjectTabs(companyInfo) {
  const tabs = document.querySelectorAll('.cs-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const slug = tab.dataset.slug;
      const content = document.getElementById('caseStudyContent');
      
      content.classList.add('cs-content-exit');
      
      setTimeout(() => {
        window.history.pushState({ slug }, '', `case-study.html?project=${slug}`);
        loadCaseStudy(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        requestAnimationFrame(() => {
          content.classList.remove('cs-content-exit');
          content.classList.add('cs-content-enter');
          
          setTimeout(() => {
            content.classList.remove('cs-content-enter');
          }, 300);
        });
      }, 200);
    });
  });
}

// Setup scroll animations
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.cs-fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('cs-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-50px' });
  
  elements.forEach(el => observer.observe(el));
}

// Setup lightbox for images and videos with navigation
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const swipeHint = document.getElementById('lightboxSwipeHint');
  
  // Check if swipe hint has been shown before
  const hasSeenSwipeHint = localStorage.getItem('lightbox-swipe-hint-seen');
  
  // Collect all media sources
  const allMedia = [];
  document.querySelectorAll('.cs-lightbox-trigger').forEach(trigger => {
    const img = trigger.querySelector('img');
    const video = trigger.querySelector('video');
    if (img) allMedia.push({ type: 'image', src: img.src, alt: img.alt || '' });
    if (video) allMedia.push({ type: 'video', src: video.src });
  });
  
  let currentIndex = 0;
  
  // Show swipe hint on mobile for first-time users
  function showSwipeHint() {
    if (hasSeenSwipeHint || !swipeHint || allMedia.length <= 1) return;
    
    // Only show on touch devices
    if (!('ontouchstart' in window)) return;
    
    swipeHint.classList.add('visible');
    localStorage.setItem('lightbox-swipe-hint-seen', 'true');
    
    // Auto-hide after 2.5 seconds
    setTimeout(() => {
      swipeHint.classList.remove('visible');
    }, 2500);
  }
  
  // Show media at index
  function showMedia(index) {
    if (allMedia.length === 0) return;
    currentIndex = (index + allMedia.length) % allMedia.length;
    const media = allMedia[currentIndex];
    
    if (media.type === 'video') {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = media.src;
      lightboxVideo.play();
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxImage.style.display = 'block';
      lightboxImage.src = media.src;
      lightboxImage.alt = media.alt;
    }
    
    // Update counter
    if (lightboxCounter && allMedia.length > 1) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${allMedia.length}`;
      lightboxCounter.style.display = 'block';
    }
    
    // Show/hide nav arrows
    if (lightboxPrev && lightboxNext) {
      const showNav = allMedia.length > 1;
      lightboxPrev.style.display = showNav ? 'flex' : 'none';
      lightboxNext.style.display = showNav ? 'flex' : 'none';
    }
    
    // Hide swipe hint when navigating
    if (swipeHint) swipeHint.classList.remove('visible');
  }
  
  // Image lightbox triggers
  document.querySelectorAll('.cs-lightbox-trigger').forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      showMedia(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Show swipe hint after a short delay
      setTimeout(showSwipeHint, 500);
    });
  });
  
  // Video lightbox triggers (for explorations)
  document.querySelectorAll('.cs-video-lightbox-trigger').forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const videoSrc = trigger.dataset.video;
      
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = videoSrc;
      lightboxVideo.play();
      
      // Hide navigation for exploration videos
      if (lightboxPrev) lightboxPrev.style.display = 'none';
      if (lightboxNext) lightboxNext.style.display = 'none';
      if (lightboxCounter) lightboxCounter.style.display = 'none';
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showMedia(currentIndex - 1);
    });
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showMedia(currentIndex + 1);
    });
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft' && allMedia.length > 1) {
      showMedia(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && allMedia.length > 1) {
      showMedia(currentIndex + 1);
    }
  });
  
  // Touch swipe navigation for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const minSwipeDistance = 50;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(deltaX) < minSwipeDistance || Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }
    
    if (allMedia.length <= 1) return;
    
    if (deltaX > 0) {
      // Swipe right - previous
      showMedia(currentIndex - 1);
    } else {
      // Swipe left - next
      showMedia(currentIndex + 1);
    }
  }
}

// Setup video autoplay on mobile
function setupVideoAutoplay() {
  const videos = document.querySelectorAll('video[autoplay]');
  
  // Intersection observer to play videos when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay blocked, that's ok
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });
  
  videos.forEach(video => {
    // Ensure proper attributes for mobile autoplay
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.playsInline = true;
    
    observer.observe(video);
    
    // Try to play immediately if visible
    if (video.getBoundingClientRect().top < window.innerHeight) {
      video.play().catch(() => {});
    }
  });
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
  const slug = e.state?.slug || getProjectSlug();
  if (slug) {
    loadCaseStudy(slug);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const slug = getProjectSlug();
  if (slug) {
    loadCaseStudy(slug);
  } else {
    // Default to first project
    loadCaseStudy('mandala');
  }
});
