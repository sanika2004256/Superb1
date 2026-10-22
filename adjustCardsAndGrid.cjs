const fs = require('fs');
const acorn = require('acorn');

// 1. Update CSS in both assets and public/assets
const cssFiles = [
  'assets/index-BvH2rQN2.css',
  'public/assets/index-BvH2rQN2.css'
];

const newGridCss = `/* Refined 3-Column Product Grid */
.products-grid-5,
.products-grid-3 {
  display: grid !important;
  gap: 1.5rem !important;
}
@media (min-width: 1024px) {
  .products-grid-5,
  .products-grid-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 1.75rem !important;
  }
}
@media (max-width: 1023px) and (min-width: 640px) {
  .products-grid-5,
  .products-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.25rem !important;
  }
}
@media (max-width: 639px) and (min-width: 480px) {
  .products-grid-5,
  .products-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.85rem !important;
  }
}
@media (max-width: 479px) {
  .products-grid-5,
  .products-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.65rem !important;
  }
}`;

for (const cssPath of cssFiles) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const oldGridHeader = '/* Refined 5-Column Product Grid */';
  const oldGridEnd = '/* Refined 5-Column Gallery Grid */';
  if (css.includes(oldGridHeader) && css.includes(oldGridEnd)) {
    const startIdx = css.indexOf(oldGridHeader);
    const endIdx = css.indexOf(oldGridEnd);
    css = css.substring(0, startIdx) + newGridCss + '\n\n' + css.substring(endIdx);
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log(`Updated grid CSS in ${cssPath}`);
  } else {
    // If headers differ, append the override
    css += '\n' + newGridCss + '\n';
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log(`Appended newGridCss in ${cssPath}`);
  }
}

// 2. Update JS bundles
const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Adjust image container height from 175px/260px to 150px/205px
  content = content.replace(
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`175px`:`260px`}',
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`150px`:`205px`}'
  );

  // Tighten info padding from sm:p-5 to sm:p-4 and spacing to sm:space-y-1.5
  content = content.replace(
    'className:`p-2 sm:p-5 space-y-1 sm:space-y-2.5 flex-1 flex flex-col`',
    'className:`p-2 sm:p-4 space-y-1 sm:space-y-1.5 flex-1 flex flex-col`'
  );

  // Tighten action container padding from sm:p-5 pt-0 sm:pt-0 to sm:p-4 pt-0 sm:pt-0
  content = content.replace(
    'className:`p-2 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-2 sm:border-t sm:border-slate-100 mt-auto`',
    'className:`p-2 sm:p-4 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-1.5 sm:border-t sm:border-slate-100 mt-auto`'
  );

  // Acorn validation
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn validation passed for ${f}!`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Saved ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}

console.log('All changes applied successfully!');
