// Vendors brand showcase loader
// Vendors brand showcase loader with category filter toolbar
(function() {
  const showcaseContainer = document.getElementById('brand-showcase');
  const filterBar = document.getElementById('vendor-filter-bar');
  if (!showcaseContainer) return;

  // cache original brand list so we can fully re-render when needed
  let cachedBrandList = [];

  async function loadBrandData() {
    try {
      // Safely resolve base path. In bundlers (Vite) import.meta.env.BASE_URL exists,
      // but in plain browser ESM import.meta.env may be undefined and accessing
      // import.meta.env.BASE_URL would throw. Use try/catch and fallback to '/'.
      let basePath = '/';
      try {
        basePath = (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/';
      } catch (err) {
        basePath = '/';
      }
      const jsonPath = `${basePath}vendors_with_images.json`;
      const response = await fetch(jsonPath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

  const brandList = await response.json();
  cachedBrandList = Array.isArray(brandList) ? brandList.slice() : [];
  renderBrandShowcase(brandList);
  buildFilterToolbar(brandList);
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
      brandCard.setAttribute('aria-label', brand.name || 'Brand');
      brandCard.setAttribute('data-index', idx);

  // attach data-categories for filtering
  const categories = Array.isArray(brand.categories) ? brand.categories.map(c => c.trim()) : [];
  brandCard.setAttribute('data-categories', categories.join('|'));
  // store a normalized name for sorting and quick access
  brandCard.setAttribute('data-name', (brand.name || '').trim());
  // store a normalized name for sorting and quick access
  brandCard.setAttribute('data-name', (brand.name || '').trim());

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

  const nameBadge = document.createElement('div');
      nameBadge.className = 'brand-card-categories';
      nameBadge.textContent = brand.name || '';
      brandCard.appendChild(nameBadge);

      showcaseContainer.appendChild(brandCard);
    });
  }

  function buildFilterToolbar(brandList) {
    if (!filterBar) return;

    // gather unique categories preserving friendly order
    const categorySet = new Set();
    brandList.forEach(b => {
      if (Array.isArray(b.categories)) b.categories.forEach(c => categorySet.add(c.trim()));
    });

    const categories = Array.from(categorySet).sort((a,b) => a.localeCompare(b));

    // Clear any existing content
    filterBar.innerHTML = '';

    // 'All' button
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'vendor-filter-btn active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = 'All';
    allBtn.setAttribute('aria-pressed', 'true');
    allBtn.addEventListener('click', () => applyFilter('all', allBtn));
    filterBar.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'vendor-filter-btn';
      btn.dataset.category = cat;
      btn.textContent = cat;
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => applyFilter(cat, btn));
      filterBar.appendChild(btn);
    });

    // keyboard support: left/right arrow navigation inside toolbar
    filterBar.addEventListener('keydown', (ev) => {
      const keys = ['ArrowLeft','ArrowRight'];
      if (!keys.includes(ev.key)) return;
      const focusable = Array.from(filterBar.querySelectorAll('.vendor-filter-btn'));
      const idx = focusable.indexOf(document.activeElement);
      if (idx === -1) return;
      ev.preventDefault();
      if (ev.key === 'ArrowLeft') focusable[(idx - 1 + focusable.length) % focusable.length].focus();
      if (ev.key === 'ArrowRight') focusable[(idx + 1) % focusable.length].focus();
    });
  }

  function applyFilter(category, clickedBtn) {
    const buttons = filterBar ? Array.from(filterBar.querySelectorAll('.vendor-filter-btn')) : [];
    buttons.forEach(b => {
      const isActive = b === clickedBtn;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // If 'all' selected we want to fully re-render the original list (restoring removed nodes)
    if (category === 'all') {
      // FLIP: measure first rects of current items
      const currentCards = Array.from(showcaseContainer.querySelectorAll('.brand-card'));
      const firstRects = new Map();
      currentCards.forEach(card => firstRects.set(card, card.getBoundingClientRect()));

      // rebuild full list
      renderBrandShowcase(cachedBrandList);

      // after render, measure last rects and animate from first -> last
      const newCards = Array.from(showcaseContainer.querySelectorAll('.brand-card'));
      const lastRects = new Map();
      newCards.forEach(card => lastRects.set(card, card.getBoundingClientRect()));

      // invert animation for elements that existed before
      newCards.forEach(card => {
        const first = firstRects.get(card);
        const last = lastRects.get(card);
        if (!first || !last) return;
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (dx !== 0 || dy !== 0) {
          card.style.transition = 'transform 450ms cubic-bezier(.23,1,.32,1), opacity 300ms ease';
          card.style.transform = `translate(${dx}px, ${dy}px)`;
          requestAnimationFrame(() => card.style.transform = '');
        }
      });

      // cleanup
      setTimeout(() => {
        Array.from(showcaseContainer.querySelectorAll('.brand-card')).forEach(card => {
          card.style.transition = '';
          card.style.transform = '';
        });
      }, 600);

      return;
    }

    // For other categories: remove non-matching items from the DOM after animating
    const cards = Array.from(showcaseContainer.querySelectorAll('.brand-card'));
    const catLower = String(category).toLowerCase();
    const isMatch = (card) => {
      const data = (card.getAttribute('data-categories') || '').toLowerCase();
      return data.split('|').some(d => d.trim() === catLower);
    };

    const matches = cards.filter(isMatch);
    const nonMatches = cards.filter(c => !isMatch(c));

    // sort ascending A→Z by name
    const sortAscByName = (a, b) => {
      const na = (a.getAttribute('data-name') || '').toLowerCase();
      const nb = (b.getAttribute('data-name') || '').toLowerCase();
      if (na < nb) return -1;
      if (na > nb) return 1;
      return 0;
    };

    matches.sort(sortAscByName);

    // FLIP: measure first positions for all cards
    const firstRects = new Map();
    cards.forEach(card => firstRects.set(card, card.getBoundingClientRect()));

    // Reorder DOM so matches are first (append in sorted order)
    matches.forEach(card => showcaseContainer.appendChild(card));

    // measure last positions after reorder
    const lastRects = new Map();
    cards.forEach(card => lastRects.set(card, card.getBoundingClientRect()));

    // animate movement (invert transforms)
    cards.forEach(card => {
      const first = firstRects.get(card);
      const last = lastRects.get(card);
      if (!first || !last) return;
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx !== 0 || dy !== 0) {
        card.style.transition = 'transform 450ms cubic-bezier(.23,1,.32,1), opacity 300ms ease';
        card.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => { card.style.transform = ''; });
      }
    });

    // fade out non-matches while animation runs
    nonMatches.forEach(n => {
      n.style.transition = 'opacity 350ms ease, transform 350ms ease';
      n.style.opacity = '0';
      n.style.transform = 'scale(0.98)';
    });

    // After animation completes, remove non-matches from the DOM completely
    setTimeout(() => {
      nonMatches.forEach(n => {
        if (n.parentNode) n.parentNode.removeChild(n);
      });
      // cleanup transitions on remaining cards
      Array.from(showcaseContainer.querySelectorAll('.brand-card')).forEach(card => {
        card.style.transition = '';
        card.style.transform = '';
        card.style.opacity = '';
      });
    }, 500);
  }

  loadBrandData();
})();
