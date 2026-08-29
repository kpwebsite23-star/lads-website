import fs from 'fs';
import path from 'path';

const dir = 'c:\\Users\\prest\\Documents\\antigravity\\dazzling-hertz';

// Fix grammar
let testimonials = fs.readFileSync(path.join(dir, 'testimonials.html'), 'utf8');
testimonials = testimonials.replace(/knows his craft/g, 'knows their craft');
testimonials = testimonials.replace(/he was at our house/g, 'they were at our house');
testimonials = testimonials.replace(/He removed the limb/g, 'They removed the limb');
testimonials = testimonials.replace(/his machine/g, 'their machine');
testimonials = testimonials.replace(/but he was also/g, 'but they were also');
fs.writeFileSync(path.join(dir, 'testimonials.html'), testimonials, 'utf8');

// Shorten services.html descriptions
let services = fs.readFileSync(path.join(dir, 'services.html'), 'utf8');
services = services.replace(/Our highly trained crew utilizes advanced rigging techniques, bucket trucks, and zero-impact felling methods to safely remove dead, diseased, or hazardous trees from confined residential spaces without damaging your lawn, fences, or adjacent structures\./g, 'We safely remove dead or hazardous trees from confined residential spaces without damaging your property.');
services = services.replace(/We follow ISA best practices to elevate canopies, clear limbs away from roofs and power lines, thin interior branches for better wind filtration, and remove deadwood—enhancing both the structural integrity and aesthetic beauty of your mature trees\./g, 'We elevate canopies, clear limbs from structures, and remove deadwood to enhance the health and beauty of your trees.');
services = services.replace(/After a tree is removed, the remaining stump is both an eyesore and a hazard\. We use commercial-grade stump grinders to process stumps and surface roots deep below grade, leaving the area ready for fresh topsoil, sod, or mulch\./g, 'We grind stumps and surface roots below grade, leaving the area clean and ready for new landscaping.');
services = services.replace(/Beyond arboriculture, we offer comprehensive landscaping solutions including mulch installation, ornamental shrub pruning, decorative bed shaping, and seasonal property cleanups to dramatically elevate your home's curb appeal\./g, 'We offer comprehensive landscaping, mulch installation, and property cleanups to elevate your home\'s curb appeal.');
fs.writeFileSync(path.join(dir, 'services.html'), services, 'utf8');

// Shorten about.html bio
let about = fs.readFileSync(path.join(dir, 'about.html'), 'utf8');
const oldBio = `<p class="bio-lead">LC Tree and Landscaping was founded with a simple yet uncompromising standard: provide residential and commercial clients with the highest caliber of tree care, uncompromising safety protocols, and personalized customer care that larger corporate franchises simply cannot match.</p>
              <p>Having lived and worked in the <strong>South Central Kansas</strong> areas for years, Our team understands the specific climate challenges Kansas properties face — from brutal summer droughts to devastating spring ice storms and violent prairie wind shears. He knows how local oak, elm, maple, and pine species react to stress, and what it takes to protect mature shade trees while safeguarding adjacent roofs and structures.</p>
              <p>We believe that exceptional tree care is measured not just by what is removed from the canopy, but by what is preserved on the ground. Every job is approached with the principle of leaving the client's lawn cleaner than we found it — raking every twig, chipping all brush, and treating every property with genuine respect.</p>`;

const newBio = `<p class="bio-lead">LC Tree and Landscaping was founded to provide residential and commercial clients with the highest caliber of tree care and uncompromising safety. We know how Kansas trees react to stress, and what it takes to protect them while safeguarding your property. We leave every lawn cleaner than we found it.</p>`;
about = about.replace(oldBio, newBio);
fs.writeFileSync(path.join(dir, 'about.html'), about, 'utf8');

// Shorten index hero
let index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
index = index.replace(/Expert Tree Care &amp; Landscaping in South Central Kansas\./g, 'Expert Tree Care &amp; Landscaping');
index = index.replace(/Trusted, safe, and professional tree removal, precision trimming, and comprehensive landscaping services for residential and commercial properties\. We are fully insured and committed to immaculate cleanups\./g, 'Quality tree removal, trimming, and landscaping. Safe, affordable, and hassle-free.');
fs.writeFileSync(path.join(dir, 'index.html'), index, 'utf8');

