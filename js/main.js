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
  }

