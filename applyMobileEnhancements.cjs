const fs = require('fs');
const acorn = require('acorn');

console.log('--- 1. Updating CSS Files ---');
const cssFiles = [
  'assets/index-BvH2rQN2.css',
  'public/assets/index-BvH2rQN2.css'
];

const mobileCssRules = `
/* ========================================================
   COMPREHENSIVE MOBILE VIEW POLISH & ADJUSTMENTS
   ======================================================== */

/* 1. Hero Mobile Overlay & Typography */
@media (max-width: 639px) {
  .hero-height {
    height: 520px !important;
  }
  .hero-mobile-bg {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.88) 55%, rgba(15, 23, 42, 0.96) 100%) !important;
  }
  .hero-height h1 {
    font-size: 1.65rem !important;
    line-height: 1.25 !important;
  }
  .hero-height p {
    font-size: 0.875rem !important;
    line-height: 1.45 !important;
    max-width: 100% !important;
  }
}

/* 2. Stats Section Mobile Layout */
@media (max-width: 767px) {
  .stats-card-container {
    padding: 12px 10px !important;
    border-radius: 16px !important;
  }
  .stats-grid-row {
    gap: 8px !important;
  }
  .stats-item-col {
    padding: 10px 8px !important;
    border-radius: 12px !important;
  }
  .stats-item-col:nth-child(5) {
    grid-column: span 2 !important;
    max-width: 100% !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 12px !important;
    padding: 12px 14px !important;
    text-align: left !important;
  }
  .stats-item-col:nth-child(5) .stats-icon-badge {
    margin-bottom: 0 !important;
    flex-shrink: 0 !important;
  }
  .stats-item-col:nth-child(5) .stats-num-wrap {
    justify-content: flex-start !important;
    margin-bottom: 2px !important;
  }
  .stats-item-col:nth-child(5) .stats-label {
    text-align: left !important;
  }
  .stats-item-col:nth-child(5) .stats-desc {
    text-align: left !important;
  }
}

/* 3. Brand Cards Mobile Elegance */
@media (max-width: 599px) {
  .brand-card-item {
    border-radius: 16px !important;
    padding: 20px 16px !important;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06) !important;
    border: 1px solid rgba(226, 232, 240, 0.85) !important;
    margin-bottom: 12px !important;
  }
  .brand-card-img-wrap {
    max-width: 150px !important;
    height: 125px !important;
    margin-bottom: 14px !important;
  }
  .brand-card-category {
    font-size: 17px !important;
    text-align: center !important;
    margin-bottom: 4px !important;
  }
  .brand-card-title {
    font-size: 14.5px !important;
    text-align: center !important;
    margin-bottom: 8px !important;
  }
  .brand-card-desc {
    font-size: 13px !important;
    text-align: center !important;
    line-height: 1.45 !important;
    margin-bottom: 14px !important;
    color: #64748b !important;
  }
  .brand-card-btn {
    width: 100% !important;
    padding: 11px 16px !important;
    border-radius: 10px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
  }
}

/* 4. Product Cards Mobile Optimization */
@media (max-width: 639px) {
  .product-card-arrow-prev,
  .product-card-arrow-next {
    display: none !important;
  }
  .product-card-perspective {
    height: 165px !important;
  }
  .product-img-switcher {
    bottom: 6px !important;
    padding: 2px 5px !important;
    gap: 3px !important;
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  }
  .product-switcher-btn {
    padding: 2px 6px !important;
    font-size: 9px !important;
    font-weight: 700 !important;
  }
}

/* 5. Executive Director Cards on Mobile */
@media (max-width: 639px) {
  .director-card-img-wrap,
  #management .aspect-square {
    aspect-ratio: auto !important;
    height: 220px !important;
  }
}

/* 6. Product Details Modal Mobile Handling */
@media (max-width: 639px) {
  .max-h-\\[92vh\\] {
    max-height: 90vh !important;
    -webkit-overflow-scrolling: touch !important;
  }
}
`;

for (const f of cssFiles) {
  let css = fs.readFileSync(f, 'utf8');
  // Avoid duplicate append
  if (!css.includes('COMPREHENSIVE MOBILE VIEW POLISH')) {
    css += '\n' + mobileCssRules;
    fs.writeFileSync(f, css, 'utf8');
    console.log(`Updated CSS in ${f}`);
  } else {
    console.log(`CSS already contains mobile rules in ${f}`);
  }
}

console.log('\n--- 2. Updating JS Files ---');
const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // A. Ticker: responsive badge
  const oldTicker = '(0,k.jsx)(`span`,{children:`Key Specializations`})';
  const newTicker = '(0,k.jsx)(`span`,{className:`hidden sm:inline`,children:`Key Specializations`}),(0,k.jsx)(`span`,{className:`sm:hidden`,children:`Specials`})';
  if (content.includes(oldTicker)) {
    content = content.replace(oldTicker, newTicker);
    console.log(`Updated Ticker badge in ${f}`);
  }

  // B. Hero CTA Buttons: full-width / stacked touch targets on mobile
  const oldHeroButtons = `n.primaryCta&&(0,k.jsxs)(\`div\`,{className:\`flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-3\`,children:[(0,k.jsxs)(T,{to:n.primaryCta.link,className:\`bg-[#d92906] hover:bg-[#b91c1c] text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group\`,children:[(0,k.jsx)(\`span\`,{children:n.primaryCta.text}),(0,k.jsx)(mr,{className:\`w-4 h-4 group-hover:translate-x-1 transition-transform\`})]}),n.secondaryCta&&(0,k.jsx)(\`button\`,{onClick:e,className:\`bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer\`,children:(0,k.jsx)(\`span\`,{children:n.secondaryCta.text})})]})`;
  const newHeroButtons = `n.primaryCta&&(0,k.jsxs)(\`div\`,{className:\`flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2 sm:pt-3 w-full sm:w-auto\`,children:[(0,k.jsxs)(T,{to:n.primaryCta.link,className:\`bg-[#d92906] hover:bg-[#b91c1c] text-white px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 group\`,children:[(0,k.jsx)(\`span\`,{children:n.primaryCta.text}),(0,k.jsx)(mr,{className:\`w-4 h-4 group-hover:translate-x-1 transition-transform\`})]}),n.secondaryCta&&(0,k.jsx)(\`button\`,{onClick:e,className:\`bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer\`,children:(0,k.jsx)(\`span\`,{children:n.secondaryCta.text})})]})`;
  if (content.includes(oldHeroButtons)) {
    content = content.replace(oldHeroButtons, newHeroButtons);
    console.log(`Updated Hero CTA buttons in ${f}`);
  }

  // C. Director Image Container & Eager Loading
  const oldDirContainer = '(0,k.jsxs)(`div`,{className:`w-full aspect-square bg-slate-100 overflow-hidden relative`,children:[(0,k.jsx)(`img`,{src:e.image,alt:e.name,className:`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105`,loading:`lazy`})';
  const newDirContainer = '(0,k.jsxs)(`div`,{className:`w-full aspect-square bg-slate-100 overflow-hidden relative director-card-img-wrap`,children:[(0,k.jsx)(`img`,{src:e.image,alt:e.name,className:`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105`,loading:`eager`})';
  if (content.includes(oldDirContainer)) {
    content = content.replace(oldDirContainer, newDirContainer);
    console.log(`Updated Director card container in ${f}`);
  }

  // D. Brand Image Eager Loading
  const oldBrandImg = 'children: (0,k.jsx)("img", {\n                      src: item.img,\n                      alt: item.brand,\n                      loading: "lazy"\n                    })';
  const newBrandImg = 'children: (0,k.jsx)("img", {\n                      src: item.img,\n                      alt: item.brand,\n                      loading: "eager"\n                    })';
  if (content.includes(oldBrandImg)) {
    content = content.replace(oldBrandImg, newBrandImg);
    console.log(`Updated Brand img eager loading in ${f}`);
  }

  // Acorn Syntax Validation
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn: Syntax is 100% VALID for ${f}`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Successfully written: ${f}`);
  } catch (err) {
    console.error(`Acorn Syntax Error in ${f}:`, err);
    process.exit(1);
  }
}

console.log('\nAll mobile enhancements applied successfully!');
