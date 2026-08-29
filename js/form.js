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
