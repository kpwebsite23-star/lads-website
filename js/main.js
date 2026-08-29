/**
 * LC Tree and Landscaping, LLC — Main Application Script
 * Sticky Header Elevation, Mobile Drawer Navigation, Active Links, Slider, Utilities
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileNav();
    initActiveNavLinks();
    initCopyrightYear();
    initBeforeAfterSliders();
    initSmoothScroll();
    initPhoneTracking();
  });

  /**
   * 1. Sticky Header Scroll Elevation & Shadow
   */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  /**
   * 2. Mobile Drawer Navigation & Accessibility
   */
  function initMobileNav() {
    const header = document.querySelector('.site-header');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!header || !toggleBtn || !mainNav) return;

    // Create backdrop if not existing
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      header.insertAdjacentElement('afterend', backdrop);
    }

    const openMenu = () => {
      header.classList.add('nav-open');
      document.body.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
      header.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });

    // Close on inner link navigation (except dropdown toggles)
    const navLinks = mainNav.querySelectorAll('a:not(.has-dropdown > a)');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeMenu();
        }
      });
    });

    // Mobile Services Dropdown Click Toggle
    const dropdownParents = mainNav.querySelectorAll('.has-dropdown');
    dropdownParents.forEach((parent) => {
      const parentLink = parent.querySelector('.nav-link');
      if (parentLink) {
        parentLink.addEventListener('click', (e) => {
          if (window.innerWidth < 1024) {
            // Allow navigation if clicking on link text vs chevron, or toggle submenu
            const isSubmenuOpen = parent.classList.contains('dropdown-open');
            parent.classList.toggle('dropdown-open', !isSubmenuOpen);
            parentLink.setAttribute('aria-expanded', String(!isSubmenuOpen));
          }
        });
      }
    });

    // Auto-close when resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && header.classList.contains('nav-open')) {
        closeMenu();
      }
    });
  }

  /**
   * 3. Active Page Navigation Link Highlighting
   */
  function initActiveNavLinks() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPage = href.split('#')[0];
      if (
        linkPage === pageName ||
        (pageName === '' && linkPage === 'index.html') ||
        (pageName === 'index.html' && linkPage === '')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * 4. Auto-Updating Copyright Year
   */
  function initCopyrightYear() {
    const yearElements = document.querySelectorAll('#current-year, .current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach((el) => {
      el.textContent = currentYear;
    });
  }

  /**
   * 5. Before / After Interactive Image Sliders
   */
  function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-container');
    sliders.forEach((container) => {
      const afterWrap = container.querySelector('.after-img-wrap');
      const handleBtn = container.querySelector('.slider-handle-button');
      const rangeInput = container.querySelector('.slider-handle-control');

      if (rangeInput && afterWrap) {
        const updateSlider = (value) => {
          afterWrap.style.width = `${value}%`;
          if (handleBtn) {
            handleBtn.style.left = `${value}%`;
          }
        };

        rangeInput.addEventListener('input', (e) => {
          updateSlider(e.target.value);
        });

        updateSlider(50);
      }
    });
  }

  /**
   * 6. Smooth Scrolling for Anchor Links with Header Offset
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Focus target element for screen readers / keyboard
          targetEl.setAttribute('tabindex', '-1');
          targetEl.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * 7. Phone Click & Telephony Tracking
   */
  function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const phoneNumber = link.getAttribute('href').replace('tel:', '');
        console.log(`[LC Tree] Call initiated to: ${phoneNumber}`);
      });
    });
  }
})();



/* --- Merged from js/faq.js --- */

/**
 * LC Tree and Landscaping, LLC — FAQ Accordion Module (js/faq.js)
 * 
 * Features:
 * 1. Accessible Accordion with ARIA Attributes (aria-expanded, aria-controls)
 * 2. Smooth Height Transitions for Expanding/Collapsing Panels
 * 3. Full Keyboard Accessibility (Enter, Space, Up/Down Arrow, Home, End)
 * 4. Single or Multi-Panel Expansion Support
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});

function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion') || document.querySelector('.faq-accordion, .accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item, .accordion-item');
  const triggers = accordion.querySelectorAll('.faq-question-btn, .faq-trigger, .accordion-trigger, .accordion-header button');

  triggers.forEach((trigger, index) => {
    // Ensure initial ARIA bindings
    const controlsId = trigger.getAttribute('aria-controls') || `faq-answer-${index + 1}`;
    let panel = document.getElementById(controlsId);
    if (!panel) {
      panel = trigger.closest('.faq-item, .accordion-item')?.querySelector('.faq-answer, .accordion-panel, .faq-body');
      if (panel && !panel.id) panel.id = controlsId;
    }

    if (!trigger.hasAttribute('aria-expanded')) {
      trigger.setAttribute('aria-expanded', 'false');
    }
    if (panel && trigger.getAttribute('aria-expanded') === 'false') {
      panel.hidden = true;
      panel.style.maxHeight = '0';
    }

    // Toggle event
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      togglePanel(trigger, panel, triggers, items);
    });

    // Keyboard navigation per WAI-ARIA Accordion Pattern
    trigger.addEventListener('keydown', (e) => {
      let targetIndex = null;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % triggers.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = (index - 1 + triggers.length) % triggers.length;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = triggers.length - 1;
          break;
      }

      if (targetIndex !== null && triggers[targetIndex]) {
        triggers[targetIndex].focus();
      }
    });
  });
}

function togglePanel(trigger, panel, allTriggers, allItems) {
  const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
  const parentItem = trigger.closest('.faq-item, .accordion-item');

  // Optional accordion mode: close other panels
  allTriggers.forEach(otherTrigger => {
    if (otherTrigger !== trigger) {
      otherTrigger.setAttribute('aria-expanded', 'false');
      const otherItem = otherTrigger.closest('.faq-item, .accordion-item');
      if (otherItem) otherItem.classList.remove('is-open', 'active');
      const otherControlsId = otherTrigger.getAttribute('aria-controls');
      const otherPanel = otherControlsId ? document.getElementById(otherControlsId) : otherItem?.querySelector('.faq-answer, .accordion-panel');
      if (otherPanel) {
        otherPanel.style.maxHeight = '0';
        setTimeout(() => {
          if (otherTrigger.getAttribute('aria-expanded') === 'false') {
            otherPanel.hidden = true;
          }
        }, 250);
      }
    }
  });

  if (isExpanded) {
    // Collapse
    trigger.setAttribute('aria-expanded', 'false');
    if (parentItem) parentItem.classList.remove('is-open', 'active');
    if (panel) {
      panel.style.maxHeight = '0';
      setTimeout(() => {
        if (trigger.getAttribute('aria-expanded') === 'false') {
          panel.hidden = true;
        }
      }, 250);
    }
  } else {
    // Expand
    trigger.setAttribute('aria-expanded', 'true');
    if (parentItem) parentItem.classList.add('is-open', 'active');
    if (panel) {
      panel.hidden = false;
      const scrollHeight = panel.scrollHeight;
      panel.style.maxHeight = `${scrollHeight + 40}px`;
    }
  }
}


/* --- Merged from js/gallery.js --- */

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


/* --- Merged from js/form.js --- */

/**
 * LC Tree and Landscaping, LLC — Lead Capture & Contact Form Module (js/form.js)
 * 
 * Features:
 * 1. Real-time Client-side Form Validation
 * 2. Automatic US Phone Number Formatting ((316) 555-0123)
 * 3. Accessible Error States & Inline Feedback
 * 4. Asynchronous Submission Handling with Loading State & 24-Hour Guarantee Confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  initEstimateForms();
  initContactForms();
  initPhoneFormatting();
});

/**
 * 1. Phone Number Input Masking & Auto-Formatting
 */
function initPhoneFormatting() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"], #phone');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // strip non-digits
      if (value.length > 10) value = value.substring(0, 10);

      if (value.length > 6) {
        e.target.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
      } else if (value.length > 3) {
        e.target.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      } else if (value.length > 0) {
        e.target.value = `(${value}`;
      }
    });
  });
}

/**
 * 2. Estimate Form Handling (estimate.html)
 */
function initEstimateForms() {
  const form = document.getElementById('estimate-form') || document.querySelector('form[action*="estimate"], .estimate-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm(form, {
      name: { required: true, minLength: 2, label: 'Full Name' },
      phone: { required: true, isPhone: true, label: 'Phone Number' },
      email: { required: true, isEmail: true, label: 'Email Address' },
      address: { required: true, minLength: 5, label: 'Property Address' },
      service: { required: true, label: 'Service Requested' }
    });

    if (isValid) {
      handleFormSuccess(form, 'estimate');
    }
  });

  setupLiveValidation(form);
}

/**
 * 3. Quick Contact Form Handling (contact.html)
 */
function initContactForms() {
  const form = document.getElementById('contact-form') || document.querySelector('form[action*="contact"], .contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm(form, {
      name: { required: true, minLength: 2, label: 'Name' },
      phone: { required: true, isPhone: true, label: 'Phone Number' },
      email: { required: true, isEmail: true, label: 'Email Address' },
      service: { required: false, label: 'Service' },
      message: { required: true, minLength: 5, label: 'Message' }
    });

    if (isValid) {
      handleFormSuccess(form, 'contact');
    }
  });

  setupLiveValidation(form);
}

/**
 * Live validation on input blur/change
 */
function setupLiveValidation(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateSingleField(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateSingleField(input);
      }
    });
  });
}

function validateSingleField(input) {
  const name = input.name || input.id;
  const value = input.value.trim();
  const formGroup = input.closest('.form-group, .field-group, .form-field') || input.parentElement;
  let errorEl = formGroup ? formGroup.querySelector('.form-error-msg, .error-feedback') : null;

  let isValid = true;
  let errorMsg = '';

  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMsg = 'This field is required.';
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address.';
    }
  } else if (input.type === 'tel' && value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      isValid = false;
      errorMsg = 'Please enter a valid 10-digit phone number.';
    }
  } else if (name === 'service' && input.tagName.toLowerCase() === 'select') {
    if (!value || value === '' || value === 'select') {
      isValid = false;
      errorMsg = 'Please select a service.';
    }
  }

  if (!isValid) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    if (!errorEl && formGroup) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg text-error';
      errorEl.setAttribute('role', 'alert');
      formGroup.appendChild(errorEl);
    }
    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.style.display = 'block';
    }
  } else {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  return isValid;
}

function validateForm(form, rules) {
  let isAllValid = true;
  let firstInvalidInput = null;

  for (const [fieldName, rule] of Object.entries(rules)) {
    const input = form.elements[fieldName] || form.querySelector(`[name="${fieldName}"], #${fieldName}`);
    if (!input) continue;

    const value = input.value ? input.value.trim() : '';
    const formGroup = input.closest('.form-group, .field-group, .form-field') || input.parentElement;
    let errorEl = formGroup ? formGroup.querySelector('.form-error-msg, .error-feedback') : null;
    let isValid = true;
    let errorMsg = '';

    if (rule.required && !value) {
      isValid = false;
      errorMsg = `${rule.label} is required.`;
    } else if (rule.isEmail && value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (rule.isPhone && value) {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        isValid = false;
        errorMsg = 'Please enter a 10-digit phone number.';
      }
    } else if (rule.minLength && value && value.length < rule.minLength) {
      isValid = false;
      errorMsg = `${rule.label} must be at least ${rule.minLength} characters.`;
    }

    if (!isValid) {
      isAllValid = false;
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (!errorEl && formGroup) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error-msg text-error';
        errorEl.setAttribute('role', 'alert');
        formGroup.appendChild(errorEl);
      }
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.style.display = 'block';
      }
      if (!firstInvalidInput) firstInvalidInput = input;
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }
  }

  if (firstInvalidInput) {
    firstInvalidInput.focus();
  }

  return isAllValid;
}

/**
 * Handle Successful Submission with Visual Banner
 */
function handleFormSuccess(form, type) {
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending Request...';
  }

  const nameInput = form.elements['name'] || form.querySelector('[name="name"], #name, #full_name');
  const clientName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Neighbor';

  setTimeout(() => {
    // Hide or replace form with success state
    let successContainer = document.getElementById('form-success-banner') || form.parentElement.querySelector('.form-success-card');

    if (!successContainer) {
      successContainer = document.createElement('div');
      successContainer.id = 'form-success-banner';
      successContainer.className = 'form-success-card card';
      successContainer.setAttribute('role', 'alert');
      successContainer.setAttribute('aria-live', 'polite');
      form.parentNode.insertBefore(successContainer, form);
    }

    const titleText = type === 'estimate' 
      ? `Thank you, ${clientName}! Your Estimate Request is Received.`
      : `Thank you, ${clientName}! Your Message Has Been Sent.`;

    const subText = type === 'estimate'
      ? `Owner <strong>Lad Oborny</strong> will review your property details and contact you <strong>within 24 hours</strong> to schedule your convenient on-site consultation.`
      : `Owner <strong>Lad Oborny</strong> will get back to you <strong>within 24 hours</strong>. For immediate storm emergencies, call directly at <a href="tel:3163937207" class="text-amber"><strong>(316) 393-7207</strong></a>.`;

    successContainer.innerHTML = `
      <div class="success-icon-wrap">
        <svg class="icon icon-success" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 class="success-title">${titleText}</h3>
      <p class="success-description">${subText}</p>
      <div class="success-actions">
        <a href="tel:3163937207" class="btn btn-primary btn-sm">Call Lad Directly</a>
      </div>
    `;

    successContainer.style.display = 'block';
    form.style.display = 'none';
    form.reset();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}
