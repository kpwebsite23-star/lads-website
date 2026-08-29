import fs from 'fs';

const fixPreFooter = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix the pre-footer title
  content = content.replace(
    /<h2 id="pre-footer-cta-title" class="cta-title">Ready to transform your property\? Call Lad today for a fast, free estimate\.<\/h2>/g,
    '<h2 id="pre-footer-cta-title" class="cta-title">Call Lad Oborny Directly</h2>'
  );
  
  // Remove the redundant community CTA
  content = content.replace(
    /<div class="community-cta text-center">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    '</div>\n        </div>\n      </div>\n    </section>'
  );

  fs.writeFileSync(file, content, 'utf8');
};

['about.html', 'index.html'].forEach(fixPreFooter);
