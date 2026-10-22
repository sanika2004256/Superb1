const fs = require('fs');
const acorn = require('acorn');

const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  // 1. Update card image height & max-size for mobile
  content = content.replace(
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`150px`:`260px`}',
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`175px`:`260px`}'
  );

  content = content.replace(
    'className:`max-h-full max-w-full object-contain filter drop-shadow-md product-card-flip',
    'className:`max-h-[82%] max-w-[85%] sm:max-h-full sm:max-w-full object-contain filter drop-shadow-md product-card-flip'
  );

  // 2. Update pill switcher labels for mobile responsiveness
  const oldPillButton = `(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 \${curIdx===idx?\`bg-[#d92906] text-white shadow-2xs\`:\`text-slate-600 hover:text-slate-900 hover:bg-slate-100\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{children:item.label})
                  ]
                })`;

  const newPillButton = `(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`px-1.5 sm:px-2 py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-0.5 sm:gap-1 \${curIdx===idx?\`bg-[#d92906] text-white shadow-2xs\`:\`text-slate-600 hover:text-slate-900 hover:bg-slate-100\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{className:\`hidden sm:inline\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`sm:hidden\`,children:item.key===\`front\`?\`Front\`:item.key===\`back\`?\`Back\`:\`Box\`})
                  ]
                })`;

  if (content.includes(oldPillButton)) {
    content = content.replace(oldPillButton, newPillButton);
    console.log(`Updated pill buttons for mobile in ${f}`);
  } else {
    console.log(`oldPillButton not found in ${f}`);
  }

  // Acorn validation
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn validation passed for ${f}!`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Successfully saved ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}
