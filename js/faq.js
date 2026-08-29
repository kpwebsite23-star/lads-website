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
