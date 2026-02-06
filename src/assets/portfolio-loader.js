/**
 * Portfolio Loader and Modal Viewer
 * Loads portfolio projects and handles the interactive modal gallery
 */

// Portfolio Modal State
let portfolioData = null;
let currentProjectIndex = 0;
let currentImageIndex = 0;

/**
 * Load portfolio data from JSON
 */
async function loadPortfolioData() {
  try {
    const basePath = import.meta.env.BASE_URL;
    const response = await fetch(`${basePath}chazin_portfolio/portfolio_index.json`);
    if (!response.ok) {
      throw new Error(`Failed to load portfolio: ${response.status}`);
    }
    portfolioData = await response.json();
    return portfolioData;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return null;
  }
}

/**
 * Initialize portfolio grid on the page
 */
async function initializePortfolioGrid() {
  const gridContainer = document.getElementById('portfolio-grid');
  if (!gridContainer) return;

  const data = await loadPortfolioData();
  if (!data || !data.projects) {
    console.error('No portfolio data available');
    return;
  }

  // Clear loading state
  gridContainer.innerHTML = '';

  // Create portfolio cards
  data.projects.forEach((project, index) => {
    const card = createPortfolioCard(project, index);
    gridContainer.appendChild(card);
  });
}

/**
 * Create a portfolio card element
 */
function createPortfolioCard(project, index) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View ${project.title} project`);

  // Get the first image as thumbnail
  const thumbnail = project.images && project.images.length > 0 
    ? project.images[0] 
    : null;

  const basePath = import.meta.env.BASE_URL;
  // Fix Windows path separators in local_path
  const imagePath = thumbnail 
    ? `${basePath}chazin_portfolio/${project.title}/${thumbnail.filename}`
    : '';

  card.innerHTML = `
    <div class="portfolio-card-image">
      ${thumbnail ? `
        <img src="${imagePath}" 
             alt="${project.title}" 
             loading="lazy"
             decoding="async">
      ` : '<div class="portfolio-card-placeholder"></div>'}
      <div class="portfolio-card-overlay">
        <h3>${project.title}</h3>
        <span class="mono">${project.total_images} Images</span>
      </div>
    </div>
  `;

  // Click handler to open modal
  const openModal = () => {
    currentProjectIndex = index;
    currentImageIndex = 0;
    openPortfolioModal();
  };

  card.addEventListener('click', openModal);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  return card;
}

/**
 * Open the portfolio modal
 */
function openPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal || !portfolioData) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  updateModalContent();
  
  // Focus trap
  const closeBtn = modal.querySelector('.portfolio-modal-close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Close the portfolio modal
 */
function closePortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Update modal content with current project and image
 */
function updateModalContent() {
  if (!portfolioData || !portfolioData.projects[currentProjectIndex]) return;

  const project = portfolioData.projects[currentProjectIndex];
  const modal = document.getElementById('portfolio-modal');
  
  // Update project title
  const titleEl = modal.querySelector('.portfolio-modal-title');
  if (titleEl) {
    titleEl.textContent = project.title;
  }

  // Update image counter
  const counterEl = modal.querySelector('.portfolio-modal-counter');
  if (counterEl) {
    counterEl.textContent = `${currentImageIndex + 1} / ${project.total_images}`;
  }

  // Update main image
  const imgEl = modal.querySelector('.portfolio-modal-image');
  if (imgEl && project.images[currentImageIndex]) {
    const basePath = import.meta.env.BASE_URL;
    const image = project.images[currentImageIndex];
    const imagePath = `${basePath}chazin_portfolio/${project.title}/${image.filename}`;
    
    // Fade out
    imgEl.style.opacity = '0';
    
    // Load new image
    setTimeout(() => {
      imgEl.src = imagePath;
      imgEl.alt = image.alt || project.title;
      
      // Fade in when loaded
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
    }, 200);
  }

  // Update navigation buttons state
  updateNavigationState();
}

/**
 * Update navigation button states
 */
function updateNavigationState() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal || !portfolioData) return;

  const project = portfolioData.projects[currentProjectIndex];
  const prevBtn = modal.querySelector('.portfolio-modal-prev');
  const nextBtn = modal.querySelector('.portfolio-modal-next');

  if (prevBtn) {
    prevBtn.disabled = currentImageIndex === 0;
  }

  if (nextBtn) {
    nextBtn.disabled = currentImageIndex >= project.total_images - 1;
  }
}

/**
 * Navigate to previous image
 */
function navigatePrevious() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateModalContent();
  }
}

/**
 * Navigate to next image
 */
function navigateNext() {
  const project = portfolioData.projects[currentProjectIndex];
  if (project && currentImageIndex < project.total_images - 1) {
    currentImageIndex++;
    updateModalContent();
  }
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(e) {
  const modal = document.getElementById('portfolio-modal');
  if (!modal || !modal.classList.contains('active')) return;

  switch(e.key) {
    case 'Escape':
      closePortfolioModal();
      break;
    case 'ArrowLeft':
      navigatePrevious();
      break;
    case 'ArrowRight':
      navigateNext();
      break;
  }
}

/**
 * Initialize modal event listeners
 */
function initializeModalListeners() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  // Close button
  const closeBtn = modal.querySelector('.portfolio-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePortfolioModal);
  }

  // Navigation buttons
  const prevBtn = modal.querySelector('.portfolio-modal-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', navigatePrevious);
  }

  const nextBtn = modal.querySelector('.portfolio-modal-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateNext);
  }

  // Backdrop click to close
  const backdrop = modal.querySelector('.portfolio-modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closePortfolioModal);
  }

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const imageContainer = modal.querySelector('.portfolio-modal-image-container');
  if (imageContainer) {
    imageContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imageContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        navigateNext();
      } else {
        // Swipe right - previous image
        navigatePrevious();
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializePortfolioGrid();
  initializeModalListeners();
});
