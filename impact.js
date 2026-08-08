// ===== Impact Page Scripts =====

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  scrollProgress.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// Animated Counter with Intersection Observer
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted', 'counting');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const decimals = parseInt(element.dataset.decimals) || 0;
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startValue = 0;
  
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = startValue + (target - startValue) * easedProgress;
    
    if (decimals > 0) {
      element.textContent = currentValue.toFixed(decimals);
    } else {
      element.textContent = Math.round(currentValue);
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.classList.remove('counting');
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Fade in animations on scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  initScrollAnimations();
  updateScrollProgress();
});
