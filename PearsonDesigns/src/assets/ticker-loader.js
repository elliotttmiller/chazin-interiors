// Ticker loader: populate the home page ticker with vendor names
(function() {
  // Configuration constants for ticker animation speed
  const TICKER_SPEED_PX_PER_SEC = 80; // Pixels per second - smooth, natural scrolling speed
  const MIN_DURATION_SECONDS = 15;    // Minimum animation duration
  const DEFAULT_DURATION_SECONDS = 30; // Fallback duration if calculation fails
  const VENDOR_LIST_REPEATS = 2;      // Number of times to repeat vendor list for seamless loop

  const ticker = document.querySelector('.ticker-content');
  if (!ticker) return;

  async function loadTicker() {
    try {
      // Use import.meta.env.BASE_URL for correct path resolution in Vite
      const basePath = import.meta.env.BASE_URL || '/';
      const jsonPath = `${basePath}vendors_with_images.json`;
      console.debug('[ticker-loader] fetching vendor JSON from:', jsonPath);

      const res = await fetch(jsonPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) return;

      // Extract unique vendor names, preserve order
      const seen = new Set();
      const names = [];
      list.forEach(item => {
        const name = (item && item.name) ? item.name.toString().trim() : '';
        if (name && !seen.has(name)) {
          seen.add(name);
          names.push(name);
        }
      });

      if (names.length === 0) return;

      // To make the ticker feel continuous, repeat the list
      ticker.innerHTML = '';
      for (let r = 0; r < VENDOR_LIST_REPEATS; r++) {
        names.forEach(n => {
          const span = document.createElement('span');
          span.textContent = n.toUpperCase(); // match existing style
          ticker.appendChild(span);
        });
      }

  // Calculate an appropriate duration so perceived speed is smooth and natural.
  // distance = width of one set (total scrollWidth / repeats)
  // desiredSpeed = pixels per second. Higher value = faster scroll.
  const totalWidth = ticker.scrollWidth || 0;
  const setWidth = VENDOR_LIST_REPEATS > 0 ? (totalWidth / VENDOR_LIST_REPEATS) : totalWidth;
  const durationSeconds = setWidth > 0 
    ? Math.max(MIN_DURATION_SECONDS, Math.round(setWidth / TICKER_SPEED_PX_PER_SEC)) 
    : DEFAULT_DURATION_SECONDS;
      // Apply duration via CSS variable used by .ticker-content
      ticker.style.setProperty('--ticker-duration', `${durationSeconds}s`);
      console.debug('[ticker-loader] ticker width:', totalWidth, 'setWidth:', setWidth, 'duration(s):', durationSeconds);

    } catch (err) {
      console.error('[ticker-loader] failed to populate ticker:', err);
    }
  }

  // Run after DOMContentLoaded so ticker element exists
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadTicker);
  else loadTicker();
})();
