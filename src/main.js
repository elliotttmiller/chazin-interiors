// Main entry JavaScript (ES module)
// Extracted from inline scripts in index.html for modularization and build tooling.

document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor Logic with RequestAnimationFrame for smooth tracking
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Use requestAnimationFrame for smooth cursor movement
  const animateCursor = () => {
    if (cursor) {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
    
    if (follower) {
      // Smooth follower with easing
      targetX += (mouseX - 14 - targetX) * 0.2;
      targetY += (mouseY - 14 - targetY) * 0.2;
      follower.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
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
