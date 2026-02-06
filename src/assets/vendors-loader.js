// Vendors brand showcase loader
(function() {
  const showcaseContainer = document.getElementById('brand-showcase');
  if (!showcaseContainer) return;

  async function loadBrandData() {
    try {
      // Use document base URL for flexible deployment paths
      const basePath = document.querySelector('base')?.href || window.location.origin + '/chazin-interiors/';
      const jsonPath = new URL('vendors_with_images.json', basePath).href;
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const brandList = await response.json();
      renderBrandShowcase(brandList);
    } catch (error) {
      console.error('Failed to load vendor data:', error);
      showcaseContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: var(--charcoal);">
          <p>Unable to load brand information at this time.</p>
          <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">Please refresh the page or try again later.</p>
        </div>
      `;
    }
  }

  function renderBrandShowcase(brandList) {
    if (!Array.isArray(brandList) || brandList.length === 0) {
      showcaseContainer.innerHTML = '<p style="text-align: center;">No brands available.</p>';
      return;
    }

    showcaseContainer.innerHTML = '';
    
    brandList.forEach((brand, idx) => {
      const brandCard = document.createElement('a');
      brandCard.href = brand.website || '#';
      brandCard.target = '_blank';
      brandCard.rel = 'noopener noreferrer';
  brandCard.className = 'brand-card';
  // expose the brand name to assistive tech on the link
  brandCard.setAttribute('aria-label', brand.name || 'Brand');
      brandCard.setAttribute('data-index', idx);
      
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'brand-card-image-wrapper';
      
      const brandImg = document.createElement('img');
      brandImg.src = brand.brand_image || '';
      brandImg.alt = `${brand.name || 'Brand'} logo`;
      brandImg.loading = 'lazy';
      brandImg.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'brand-card-fallback';
        fallback.textContent = brand.name || 'Brand';
        imageWrapper.appendChild(fallback);
      };
      
      imageWrapper.appendChild(brandImg);
      brandCard.appendChild(imageWrapper);
      
      // Show the company name on the card (instead of category text)
      const nameBadge = document.createElement('div');
      // keep existing styling hook so CSS doesn't need changes
      nameBadge.className = 'brand-card-categories';
      nameBadge.textContent = brand.name || '';
      brandCard.appendChild(nameBadge);
      
      showcaseContainer.appendChild(brandCard);
    });
  }

  loadBrandData();
})();
