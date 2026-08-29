import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\prest\\Documents\\antigravity\\dazzling-hertz';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remove specific names and titles globally
  content = content.replace(/Lad Oborny, Owner (and|&amp;|&) Operator/g, 'Our Owner & Operator');
  content = content.replace(/Lad Oborny — Owner (and|&amp;|&) Operator/g, 'Meet the Owner');
  content = content.replace(/owner Lad Oborny/gi, 'our owner');
  content = content.replace(/Lad Oborny/g, 'Our Team');
  content = content.replace(/by Lad\./g, 'by our team.');
  content = content.replace(/Call Lad Directly/g, 'Call Us Directly');
  content = content.replace(/<p class="footer-owner"><strong>Owner:<\/strong> Our Team<\/p>/g, '');
  content = content.replace(/<p class="footer-owner"><strong>Owner:<\/strong> Lad Oborny<\/p>/g, '');
  content = content.replace(/Locally Owned by Our Team/g, 'Locally Owned & Operated');
  content = content.replace(/Locally Owned by Lad Oborny/g, 'Locally Owned & Operated');
  
  // 2. Remove location constraints
  content = content.replace(/in East Wichita, Andover, or surrounding areas/gi, 'in your area');
  content = content.replace(/East Wichita, Andover, and surrounding communities/gi, 'South Central Kansas');
  content = content.replace(/East Wichita and Andover/gi, 'South Central Kansas');
  content = content.replace(/East Wichita &amp; Andover/gi, 'South Central Kansas');
  content = content.replace(/East Wichita & Andover/gi, 'South Central Kansas');
  content = content.replace(/Andover and East Wichita/gi, 'South Central Kansas');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
