const fs = require('fs');
const acorn = require('acorn');

// 1. Update CSS files
const cssFiles = [
  'assets/index-BvH2rQN2.css',
  'public/assets/index-BvH2rQN2.css'
];

for (const cssPath of cssFiles) {
  let css = fs.readFileSync(cssPath, 'utf8');

  // Update or add product-card-perspective rules with explicit height and img containment
  const cardPerspectiveRules = `
.product-card-perspective {
  perspective: 1000px;
  -webkit-perspective: 1000px;
  height: 230px !important;
}
@media (max-width: 639px) {
  .product-card-perspective {
    height: 160px !important;
  }
}
.product-card-perspective img {
  max-height: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}
`;

  if (css.includes('.product-card-perspective {')) {
    css = css.replace(
      /\.product-card-perspective\s*\{[^}]*\}/g,
      ''
    );
  }

  css += '\n' + cardPerspectiveRules + '\n';
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log(`Updated CSS in ${cssPath}`);
}

// 2. Update JS bundles
const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Update image container height inline style to match
  content = content.replace(
    /style:\{height:typeof window!==`undefined`&&window\.innerWidth<640\?`[^`]+`:`[^`]+`\}/g,
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`160px`:`230px`}'
  );

  // Update img tag with objectFit containment
  content = content.replace(
    'className:`max-h-[82%] max-w-[85%] sm:max-h-full sm:max-w-full object-contain filter drop-shadow-md product-card-flip ${isFlipping?`product-card-flip-active`:``}`',
    'className:`max-h-full max-w-full h-full w-full object-contain filter drop-shadow-md product-card-flip ${isFlipping?`product-card-flip-active`:``}`'
  );

  // Validate with Acorn
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

console.log('All changes applied and validated successfully!');
