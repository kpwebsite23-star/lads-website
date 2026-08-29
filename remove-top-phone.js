import fs from 'fs';

const pages = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 
  'estimate.html', 'testimonials.html', 'faq.html', 'contact.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the top-bar-actions div and its contents completely
  // We'll use a regex that safely captures the <div class="top-bar-actions"> ... </div> block.
  content = content.replace(/<div class="top-bar-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>\n    </div>');

  fs.writeFileSync(file, content, 'utf8');
});
