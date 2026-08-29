import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\prest\\Documents\\antigravity\\dazzling-hertz';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Use regex to match the entire pre-footer section
  const regex = /<!-- Pre-Footer Conversion CTA Banner -->[\s\S]*?<section class="pre-footer-cta[\s\S]*?<\/section>/;
  content = content.replace(regex, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
