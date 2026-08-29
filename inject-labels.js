import fs from 'fs';

const pages = [
  { file: 'index.html', prefix: 'A' },
  { file: 'about.html', prefix: 'B' },
  { file: 'services.html', prefix: 'C' },
  { file: 'gallery.html', prefix: 'D' },
  { file: 'estimate.html', prefix: 'E' },
  { file: 'testimonials.html', prefix: 'F' },
  { file: 'faq.html', prefix: 'G' },
  { file: 'contact.html', prefix: 'H' }
];

pages.forEach(({ file, prefix }) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove existing injected script if any
  content = content.replace(/<!-- LABELS SCRIPT -->[\s\S]*?<\/script>/g, '');
  
  const scriptToInject = `
<!-- LABELS SCRIPT -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const prefix = '${prefix}';
  const mediaElements = document.querySelectorAll('img:not(.footer-logo-img):not(.trust-badge-img):not(.trust-icon):not(.header-logo-img), video');
  
  let count = 1;
  const labels = [];
  
  mediaElements.forEach(el => {
    if (el.closest('.footer-col-trust') || el.closest('.site-header') || el.classList.contains('icon') || el.closest('.service-features-list')) return;

    const label = document.createElement('div');
    label.textContent = prefix + (count++);
    label.style.position = 'absolute';
    label.style.background = 'rgba(255, 0, 0, 0.9)';
    label.style.color = 'white';
    label.style.padding = '4px 8px';
    label.style.fontSize = '14px';
    label.style.fontWeight = 'bold';
    label.style.zIndex = '999999';
    label.style.borderRadius = '0 0 4px 0';
    label.style.pointerEvents = 'none';
    label.style.fontFamily = 'monospace';
    document.body.appendChild(label);
    
    labels.push({ el, label });
  });

  const updatePositions = () => {
    labels.forEach(({ el, label }) => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        label.style.display = 'block';
        label.style.top = (window.scrollY + rect.top) + 'px';
        label.style.left = (window.scrollX + rect.left) + 'px';
      } else {
        label.style.display = 'none';
      }
    });
  };

  window.addEventListener('resize', updatePositions);
  window.addEventListener('scroll', updatePositions);
  updatePositions();
  setInterval(updatePositions, 1000); // Check repeatedly just in case layout shifts
});
</script>
`;

  // Inject right before </body>
  content = content.replace('</body>', scriptToInject + '\n</body>');

  fs.writeFileSync(file, content, 'utf8');
});
