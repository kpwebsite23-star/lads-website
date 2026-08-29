import fs from 'fs';

const pages = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 
  'estimate.html', 'testimonials.html', 'faq.html', 'contact.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the sub-footer phone number block
  content = content.replace(/<span class="divider">•<\/span>\s*<a href="tel:3163937207">316-393-7207<\/a>/g, '');

  fs.writeFileSync(file, content, 'utf8');
});
