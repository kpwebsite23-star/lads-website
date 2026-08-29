/**
 * LC Tree and Landscaping, LLC — Gallery & Portfolio Module (js/gallery.js)
 * 
 * Features:
 * 1. Filterable Portfolio Grid (All, Tree Removal, Trimming, Stump Grinding, Landscaping)
 * 2. Accessible Lightbox Modal with Keyboard Navigation (Left/Right, Escape) & Backdrop Click
 * 3. Interactive Before/After Image Comparison Slider with Touch & Mouse Drag Support
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightboxModal();
  initBeforeAfterSliders();
});

/**
 * 1. Gallery Filtering Engine
 */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn, .filter-btn, [data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-card, [data-category]');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetFilter = btn.getAttribute('data-filter') || 'all';

      // Update active state on buttons
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategories = (item.getAttribute('data-category') || '').toLowerCase().split(' ');
        const matches = targetFilter === 'all' || itemCategories.includes(targetFilter.toLowerCase());

        if (matches) {
          item.classList.remove('is-hidden');
          item.style.display = '';
          // Trigger slight reflow for smooth fade-in
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.classList.add('is-hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (item.classList.contains('is-hidden')) {
              item.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });
}

/**
 * 2. Accessible Lightbox Modal
 */
function initLightboxModal() {
  const modal = document.getElementById('gallery-lightbox') || document.querySelector('.lightbox-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img, #lightbox-image');
  const modalTitle = modal.querySelector('.lightbox-title, #lightbox-title');
  const modalCaption = modal.querySelector('.lightbox-caption, #lightbox-caption');
  const modalCategory = modal.querySelector('.lightbox-category, #lightbox-category');
  const closeBtn = modal.querySelector('.lightbox-close, [data-close-lightbox]');
  const prevBtn = modal.querySelector('.lightbox-prev, [data-prev-lightbox]');
  const nextBtn = modal.querySelector('.lightbox-next, [data-next-lightbox]');
  
  const triggers = Array.from(document.querySelectorAll('.gallery-card, .gallery-item, [data-lightbox]'));
  let currentIndex = 0;
  let visibleTriggers = [];

  function updateVisibleTriggers() {
    visibleTriggers = triggers.filter(item => {
      const isHidden = item.classList.contains('is-hidden') || item.style.display === 'none';
      return !isHidden;
    });
  }

  function openLightbox(index) {
    updateVisibleTriggers();
    if (!visibleTriggers.length) return;

    currentIndex = (index + visibleTriggers.length) % visibleTriggers.length;
    const currentItem = visibleTriggers[currentIndex];

    const img = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('.gallery-card-title, .project-title, h3');
    const descEl = currentItem.querySelector('.gallery-card-desc, .project-desc, p');
    const catEl = currentItem.querySelector('.gallery-badge, .badge, .category-tag');

    const src = currentItem.getAttribute('data-full-img') || (img ? img.getAttribute('src') : '');
    const alt = img ? img.getAttribute('alt') : 'LC Tree Project Image';
    const title = titleEl ? titleEl.textContent.trim() : 'LC Tree & Landscaping Project';
    const desc = descEl ? descEl.textContent.trim() : '';
    const cat = catEl ? catEl.textContent.trim() : (currentItem.getAttribute('data-category') || '');

    if (modalImg) {
      modalImg.src = src;
      modalImg.alt = alt;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalCaption) modalCaption.textContent = desc;
    if (modalCategory) modalCategory.textContent = cat;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (visibleTriggers[currentIndex]) {
      const focusTarget = visibleTriggers[currentIndex].querySelector('a, button') || visibleTriggers[currentIndex];
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
    }
  }

  function showNext() {
    updateVisibleTriggers();
    if (visibleTriggers.length <= 1) return;
    openLightbox(currentIndex + 1);
  }

  function showPrev() {
    updateVisibleTriggers();
    if (visibleTriggers.length <= 1) return;
    openLightbox(currentIndex - 1);
  }

  // Trigger clicks
  triggers.forEach((item, idx) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View details for project ${idx + 1}`);

    item.addEventListener('click', (e) => {
      // If clicking directly on a sub-link or button, don't trigger modal
      if (e.target.closest('a:not(.gallery-card-link), button:not(.gallery-card)')) return;
      updateVisibleTriggers();
      const pos = visibleTriggers.indexOf(item);
      openLightbox(pos !== -1 ? pos : 0);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateVisibleTriggers();
        const pos = visibleTriggers.indexOf(item);
        openLightbox(pos !== -1 ? pos : 0);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
  }

  // Backdrop click to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-backdrop') || e.target.classList.contains('modal-overlay')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}

/**
 * 3. Interactive Before/After Image Comparison Slider
 */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-slider, .comparison-slider');

  sliders.forEach(slider => {
    const beforeImg = slider.querySelector('.slider-image-before, .before-image');
    const handle = slider.querySelector('.slider-handle, .comparison-handle');
    const rangeInput = slider.querySelector('.slider-range, input[type="range"]');

    if (!beforeImg || !handle) return;

    function setPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      beforeImg.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      handle.setAttribute('aria-valuenow', Math.round(clamped));
      if (rangeInput) rangeInput.value = clamped;
    }

    if (rangeInput) {
      rangeInput.addEventListener('input', (e) => {
        setPosition(parseFloat(e.target.value));
      });
    }

    // Direct drag support on slider container
    let isDragging = false;

    function updateFromEvent(clientX) {
      const rect = slider.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setPosition(percent);
    }

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateFromEvent(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateFromEvent(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        isDragging = true;
        updateFromEvent(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches || !e.touches[0]) return;
      updateFromEvent(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Initial position: 50%
    setPosition(50);
  });
}
