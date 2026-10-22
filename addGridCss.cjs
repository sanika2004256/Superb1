const fs = require('fs');

const cssRule = `
/* Refined 5-Column Product Grid */
.products-grid-5 {
  display: grid !important;
  gap: 1.25rem !important;
}
@media (min-width: 1100px) {
  .products-grid-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 1.25rem !important;
  }
}
@media (max-width: 1099px) and (min-width: 768px) {
  .products-grid-5 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 1.25rem !important;
  }
}
@media (max-width: 767px) and (min-width: 500px) {
  .products-grid-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1rem !important;
  }
}
@media (max-width: 499px) {
  .products-grid-5 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.75rem !important;
  }
}
`;

for (const p of ['public/assets/index-BvH2rQN2.css', 'assets/index-BvH2rQN2.css']) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('.products-grid-5')) {
      fs.appendFileSync(p, cssRule, 'utf8');
      console.log('Appended to', p);
    }
  }
}
