import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\prest\\Documents\\antigravity\\dazzling-hertz';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/Lad understands/g, 'Our team understands');
  content = content.replace(/Lad believes/g, 'We believe');
  content = content.replace(/Lad can inspect/g, 'our team can inspect');
  content = content.replace(/Learn More About Lad &amp; Our Story/g, 'Learn More About Us');
  content = content.replace(/Lad and his crew/g, 'The crew');
  content = content.replace(/Lad is honest/g, 'The team is honest');
  content = content.replace(/I called Lad/g, 'I called them');
  content = content.replace(/Lad brought in/g, 'They brought in');
  content = content.replace(/Lad's team/g, 'The team');
  content = content.replace(/Lad was not only/g, 'They were not only');
  content = content.replace(/Helps Lad review/g, 'Helps us review');
  content = content.replace(/Call or text Lad/g, 'Call or text us');
  content = content.replace(/assets\/images\/lad-oborny\.svg/g, 'assets/images/owner-profile.svg'); // Assuming we want to rename the image in HTML
  
  // Condense paragraphs
  
  fs.writeFileSync(filePath, content, 'utf8');
}
