const fs = require('fs');
const acorn = require('acorn');

const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  // Add pb-7 sm:pb-8 to the image container
  content = content.replace(
    'className:`relative bg-gradient-to-b from-slate-100/90 to-slate-50 p-2 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden product-card-perspective select-none`',
    'className:`relative bg-gradient-to-b from-slate-100/90 to-slate-50 p-2 sm:p-4 pb-7 sm:pb-8 flex items-center justify-center cursor-pointer overflow-hidden product-card-perspective select-none`'
  );

  // Set height to 185px on mobile, 260px on desktop
  content = content.replace(
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`175px`:`260px`}',
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`190px`:`260px`}'
  );

  // Position switcher at bottom-1.5 sm:bottom-2
  content = content.replace(
    'className:`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full shadow-sm border border-slate-200/90`',
    'className:`absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-1 sm:px-1.5 py-0.5 rounded-full shadow-sm border border-slate-200/90 max-w-[92%]`'
  );

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Syntax valid for ${f}`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Saved ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}
