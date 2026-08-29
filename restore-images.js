import fs from 'fs';

const pages = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 
  'estimate.html', 'testimonials.html', 'faq.html', 'contact.html'
];

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/src="https:\/\/via\.placeholder\.com\/800x600\?text=[A-Z]\d+\+-\+([^"]+)"/g, (match, filename) => {
    let path = 'assets/images/';
    if (filename.startsWith('gal-')) {
      path += 'gallery/' + filename + '.svg';
    } else {
      path += filename + '.svg';
    }
    return `src="${path}"`;
  });

  content = content.replace(/url\(['"]?https:\/\/via\.placeholder\.com\/1920x1080\?text=[A-Z]\d+\+-\+([^)'"]+)['"]?\)/g, (match, filename) => {
    let path = 'assets/images/';
    if (filename.startsWith('gal-')) {
      path += 'gallery/' + filename + '.svg';
    } else {
      path += filename + '.svg';
    }
    return `url('${path}')`;
  });

  fs.writeFileSync(file, content, 'utf8');
});
