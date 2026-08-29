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

pages.forEach(page => {
  if (!fs.existsSync(page.file)) return;
  
  let content = fs.readFileSync(page.file, 'utf8');
  let imgCount = 1;
  
  content = content.replace(/<img[^>]+src="assets\/images\/([^">]+)"[^>]*>/gi, (match, srcPath) => {
    if (srcPath.includes('logo') || srcPath.includes('badges') || srcPath.includes('icons')) {
      return match;
    }
    const label = `${page.prefix}${imgCount}`;
    imgCount++;
    return match.replace(`assets/images/${srcPath}`, `https://via.placeholder.com/800x600?text=${label}+-+${srcPath.split('/').pop().replace(/\.[^/.]+$/, "")}`);
  });
  
  content = content.replace(/background-image:\s*url\(['"]?assets\/images\/([^)'"]+)['"]?\)/gi, (match, srcPath) => {
    if (srcPath.includes('logo') || srcPath.includes('badges') || srcPath.includes('icons')) {
      return match;
    }
    const label = `${page.prefix}${imgCount}`;
    imgCount++;
    return `background-image: url('https://via.placeholder.com/1920x1080?text=${label}+-+${srcPath.split('/').pop().replace(/\.[^/.]+$/, "")}')`;
  });

  fs.writeFileSync(page.file, content, 'utf8');
});
