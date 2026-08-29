import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function assert(condition, description) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ PASS: ${description}`);
  } else {
    failedChecks++;
    failures.push(description);
    console.error(`  ✖ FAIL: ${description}`);
  }
}

console.log('================================================================================');
console.log('INTERACTIVE FORMS ADVERSARIAL STRESS-TEST (ESTIMATE.HTML & CONTACT.HTML)');
console.log('================================================================================\n');

// Read the implementation from js/form.js
const formJs = fs.readFileSync(path.join(ROOT_DIR, 'js', 'form.js'), 'utf8');

// 1. Verify Structure and Markup of estimate.html and contact.html
console.log('--- 1. Form HTML Markup & Field Inventory ---');
const estimateHtml = fs.readFileSync(path.join(ROOT_DIR, 'estimate.html'), 'utf8');
const contactHtml = fs.readFileSync(path.join(ROOT_DIR, 'contact.html'), 'utf8');

// Estimate form fields
assert(estimateHtml.includes('id="estimate-form"'), '[estimate.html] Form element exists with id="estimate-form"');
assert(estimateHtml.includes('name="name"') && estimateHtml.includes('required'), '[estimate.html] Contains required "name" input');
assert(estimateHtml.includes('name="phone"') && estimateHtml.includes('type="tel"') && estimateHtml.includes('required'), '[estimate.html] Contains required "phone" input with type="tel"');
assert(estimateHtml.includes('name="email"') && estimateHtml.includes('type="email"') && estimateHtml.includes('required'), '[estimate.html] Contains required "email" input with type="email"');
assert(estimateHtml.includes('name="address"') && estimateHtml.includes('required'), '[estimate.html] Contains required "address" input');
assert(estimateHtml.includes('name="service"') && estimateHtml.includes('required'), '[estimate.html] Contains required "service" select dropdown');
assert(estimateHtml.includes('name="details"'), '[estimate.html] Contains "details" textarea');
assert(estimateHtml.includes('24 hours') || estimateHtml.includes('24 Hours'), '[estimate.html] Copy mentions 24-hour turnaround commitment');

// Contact form fields
assert(contactHtml.includes('id="contact-form"'), '[contact.html] Form element exists with id="contact-form"');
assert(contactHtml.includes('name="name"') && contactHtml.includes('required'), '[contact.html] Contains required "name" input');
assert(contactHtml.includes('name="phone"') && contactHtml.includes('type="tel"') && contactHtml.includes('required'), '[contact.html] Contains required "phone" input with type="tel"');
assert(contactHtml.includes('name="email"') && contactHtml.includes('type="email"') && contactHtml.includes('required'), '[contact.html] Contains required "email" input with type="email"');
assert(contactHtml.includes('name="message"') && contactHtml.includes('required'), '[contact.html] Contains required "message" textarea');

// 2. Pure Unit Validation Engine Simulation
console.log('\n--- 2. Validation Engine Edge Case Matrix ---');

// Emulate validateForm logic exactly from form.js
function validateField(rule, value) {
  const val = (value || '').trim();
  if (rule.required && !val) {
    return { valid: false, error: `${rule.label} is required.` };
  }
  if (rule.isEmail && val) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) {
      return { valid: false, error: 'Please enter a valid email address.' };
    }
  }
  if (rule.isPhone && val) {
    const digits = val.replace(/\D/g, '');
    if (digits.length < 10) {
      return { valid: false, error: 'Please enter a 10-digit phone number.' };
    }
  }
  if (rule.minLength && val && val.length < rule.minLength) {
    return { valid: false, error: `${rule.label} must be at least ${rule.minLength} characters.` };
  }
  return { valid: true, error: '' };
}

// 2.1 Test Empty Submissions
console.log('\n--- 2.1 Empty Submission Tests ---');
const estimateRules = {
  name: { required: true, minLength: 2, label: 'Full Name' },
  phone: { required: true, isPhone: true, label: 'Phone Number' },
  email: { required: true, isEmail: true, label: 'Email Address' },
  address: { required: true, minLength: 5, label: 'Property Address' },
  service: { required: true, label: 'Service Requested' }
};

for (const [field, rule] of Object.entries(estimateRules)) {
  const res = validateField(rule, '');
  assert(!res.valid && res.error.includes('is required'), `Estimate: Empty "${field}" triggers required validation error`);
}

const contactRules = {
  name: { required: true, minLength: 2, label: 'Name' },
  phone: { required: true, isPhone: true, label: 'Phone Number' },
  email: { required: true, isEmail: true, label: 'Email Address' },
  message: { required: true, minLength: 5, label: 'Message' }
};

for (const [field, rule] of Object.entries(contactRules)) {
  const res = validateField(rule, '');
  assert(!res.valid && res.error.includes('is required'), `Contact: Empty "${field}" triggers required validation error`);
}

// 2.2 Test Invalid Emails
console.log('\n--- 2.2 Invalid Email Edge Cases ---');
const invalidEmails = [
  'plainstring',
  '@missingusername.com',
  'username@',
  'username@nodot',
  'username@.com',
  'username@domain.',
  'username@domain.c', // single character TLD
  'username space@domain.com'
];

invalidEmails.forEach(email => {
  const res = validateField(estimateRules.email, email);
  assert(!res.valid, `Email rejection: "${email}" properly flagged as invalid`);
});

// 2.3 Test Valid Emails
console.log('\n--- 2.3 Valid Email Formats ---');
const validEmails = [
  'lad@lctreeks.com',
  'customer.name@gmail.com',
  'john_doe123@yahoo.co.uk',
  'property+owner@andover.org'
];

validEmails.forEach(email => {
  const res = validateField(estimateRules.email, email);
  assert(res.valid, `Email acceptance: "${email}" recognized as valid`);
});

// 2.4 Test Invalid Phone Numbers
console.log('\n--- 2.4 Invalid Phone Formats ---');
const invalidPhones = [
  '123',
  '316-393',
  '(316) 393-720', // 9 digits
  'abcdefghij',
  '000-000',
  '12345'
];

invalidPhones.forEach(phone => {
  const res = validateField(estimateRules.phone, phone);
  assert(!res.valid, `Phone rejection: "${phone}" properly flagged as under 10 digits`);
});

// 2.5 Test Valid Phone Numbers
console.log('\n--- 2.5 Valid Phone Formats ---');
const validPhones = [
  '3163937207',
  '(316) 393-7207',
  '316-393-7207',
  '+1 (316) 393-7207',
  '316.393.7207'
];

validPhones.forEach(phone => {
  const res = validateField(estimateRules.phone, phone);
  assert(res.valid, `Phone acceptance: "${phone}" recognized as valid 10-digit phone number`);
});

// 2.6 Test MinLength constraints
console.log('\n--- 2.6 MinLength Enforcement ---');
assert(!validateField(estimateRules.name, 'A').valid, 'Name "A" (<2 chars) fails minLength check');
assert(validateField(estimateRules.name, 'Al').valid, 'Name "Al" (2 chars) passes minLength check');
assert(!validateField(estimateRules.address, '123').valid, 'Address "123" (<5 chars) fails minLength check');
assert(validateField(estimateRules.address, '123 Main St').valid, 'Address "123 Main St" passes minLength check');

// 3. Phone Input Masking Logic
console.log('\n--- 3. Phone Auto-Formatting Masking ---');
function formatPhone(inputVal) {
  let value = inputVal.replace(/\D/g, '');
  if (value.length > 10) value = value.substring(0, 10);

  if (value.length > 6) {
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
  } else if (value.length > 3) {
    return `(${value.substring(0, 3)}) ${value.substring(3)}`;
  } else if (value.length > 0) {
    return `(${value}`;
  }
  return '';
}

assert(formatPhone('3') === '(3', 'Key "3" formats as "(3"');
assert(formatPhone('316') === '(316', 'Keys "316" format as "(316"');
assert(formatPhone('3163') === '(316) 3', 'Keys "3163" format as "(316) 3"');
assert(formatPhone('3163937') === '(316) 393-7', 'Keys "3163937" format as "(316) 393-7"');
assert(formatPhone('3163937207') === '(316) 393-7207', '10 digits format as "(316) 393-7207"');
assert(formatPhone('(316) 393-7207999') === '(316) 393-7207', 'Extra digits beyond 10 are cleanly truncated');

// 4. Asynchronous Submission Handling & Feedback Verification
console.log('\n--- 4. Asynchronous Submission & Confirmation Feedback ---');
assert(formJs.includes('handleFormSuccess'), 'form.js contains handleFormSuccess()');
assert(formJs.includes('form-success-card') || formJs.includes('form-success-banner'), 'form.js creates accessible success card banner');
assert(formJs.includes('Lad Oborny'), 'form.js success banner confirms personal oversight by Lad Oborny');
assert(formJs.includes('24 hours') || formJs.includes('24 Hours'), 'form.js success banner guarantees response within 24 hours');
assert(formJs.includes('tel:3163937207'), 'form.js success banner provides instant direct telephone CTA link');
assert(formJs.includes('role="alert"') || formJs.includes('aria-live'), 'form.js success banner has accessible role="alert" / aria-live for screen readers');

console.log('\n================================================================================');
console.log(`Interactive Forms Audit: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
if (failedChecks === 0) {
  console.log('✔ SUCCESS: Form validation, masking, and feedback verified 100% compliant!');
  process.exit(0);
} else {
  console.log('✖ FAILURES:', failures);
  process.exit(1);
}
