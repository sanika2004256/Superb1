const fs = require('fs');

const cssRule = `
/* Refined 5-Column Gallery Grid */
.gallery-grid-5 {
  display: grid !important;
  gap: 1.25rem !important;
}
@media (min-width: 1100px) {
  .gallery-grid-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 1.25rem !important;
  }
}
@media (max-width: 1099px) and (min-width: 768px) {
  .gallery-grid-5 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 1.25rem !important;
  }
}
@media (max-width: 767px) {
  .gallery-grid-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.85rem !important;
  }
}
`;

for (const p of ['public/assets/index-BvH2rQN2.css', 'assets/index-BvH2rQN2.css']) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('.gallery-grid-5')) {
      fs.appendFileSync(p, cssRule, 'utf8');
      console.log('Appended gallery-grid-5 to', p);
    }
  }
}
