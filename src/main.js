// Main entry JavaScript (ES module)
// Extracted from inline scripts in index.html for modularization and build tooling.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuOverlay = document.querySelector('.mobile-nav-overlay');
  const menuClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  
  const openMobileMenu = () => {
    if (menuOverlay) {
      menuOverlay.classList.add('active');
      if (menuToggle) {
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  };
  
  const closeMobileMenu = () => {
    if (menuOverlay) {
      menuOverlay.classList.remove('active');
      if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = ''; // Restore scroll
    }
  };
  
  // Open menu
  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }
  
  // Close menu
  if (menuClose) {
    menuClose.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Custom Cursor Logic with RequestAnimationFrame for smooth tracking
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  
  let mouseX = 0;
  let mouseY = 0;

  // Smoothed positions for the dot and the follower
  let dotX = 0;
  let dotY = 0;
  let folX = 0;
  let folY = 0;

  // Easing factors (dot is quicker, follower lags a bit)
  const DOT_EASE = 0.35;
  const FOL_EASE = 0.12;

  // Center offsets (computed once, updated on resize)
  let cursorHalf = 6; // defaults match CSS (#cursor 12px)
  let followerHalf = 20; // defaults match CSS (#cursor-follower 40px)

  const updateSizes = () => {
    if (cursor) cursorHalf = cursor.offsetWidth / 2;
    if (follower) followerHalf = follower.offsetWidth / 2;
  };

  window.addEventListener('resize', updateSizes);
  updateSizes();

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Use requestAnimationFrame + lerp for smooth, synchronized motion
  const animateCursor = () => {
    // Lerp small dot towards the current mouse position (fast)
    dotX += (mouseX - dotX) * DOT_EASE;
    dotY += (mouseY - dotY) * DOT_EASE;

    // Lerp follower (slower) for a natural trailing circle
    folX += (mouseX - folX) * FOL_EASE;
    folY += (mouseY - folY) * FOL_EASE;

    if (cursor) {
      // center the element by subtracting half its dimensions
      cursor.style.transform = `translate3d(${dotX - cursorHalf}px, ${dotY - cursorHalf}px, 0)`;
    }

    if (follower) {
      follower.style.transform = `translate3d(${folX - followerHalf}px, ${folY - followerHalf}px, 0)`;
    }

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Sticky Header
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Reveals
  const revealOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.id === 'process-timeline') {
          entry.target.classList.add('active');
          document.querySelectorAll('.timeline-item').forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 300);
          });
        }
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal, #process-timeline').forEach(el => observer.observe(el));

  // Magnetic Button Effect
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // Hero Text Entry
  const title = document.getElementById('hero-title');
  if (title) {
    title.style.transition = 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
    title.style.opacity = '1';
    title.style.transform = 'translateY(0)';
  }

  // Simple Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
