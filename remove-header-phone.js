import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\prest\\Documents\\antigravity\\dazzling-hertz';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Use regex to match the anchor tag containing 'btn-header-call' and everything inside it
  const regex = /<a href="tel:3163937207" class="btn btn-primary cta-btn btn-header-call"[\s\S]*?<\/a>/;
  content = content.replace(regex, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
