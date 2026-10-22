const fs = require('fs');
const acorn = require('acorn');

// 1. Update CSS
const cssPath = 'assets/index-BvH2rQN2.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.card-label-full')) {
  css += `
.card-label-full {
  display: inline;
}
.card-label-short {
  display: none;
}
@media (max-width: 639px) {
  .card-label-full {
    display: none !important;
  }
  .card-label-short {
    display: inline !important;
  }
}
`;
  fs.writeFileSync(cssPath, css);
  console.log('Updated CSS with card-label rules');
}

// 2. Update bundle files
const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  // Fix container class: remove pb-7 sm:pb-8
  content = content.replace(
    'p-2 sm:p-4 pb-7 sm:pb-8 flex items-center',
    'p-2 sm:p-4 flex items-center'
  );

  // Set height to 175px on mobile, 260px on desktop
  content = content.replace(
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`190px`:`260px`}',
    'style:{height:typeof window!==`undefined`&&window.innerWidth<640?`175px`:`260px`}'
  );

  // Update imgList definitions with shortLabel
  content = content.replace(
    'if(b)list.push({key:`box`,label:`Box`,src:b});if(f)list.push({key:`front`,label:`Sachet Front`,src:f});if(k)list.push({key:`back`,label:`Sachet Back`,src:k});if(list.length===0&&e.image)list.push({key:`box`,label:`Box`,src:e.image});',
    'if(b)list.push({key:`box`,label:`Box`,shortLabel:`Box`,src:b});if(f)list.push({key:`front`,label:`Sachet Front`,shortLabel:`Front`,src:f});if(k)list.push({key:`back`,label:`Sachet Back`,shortLabel:`Back`,src:k});if(list.length===0&&e.image)list.push({key:`box`,label:`Box`,shortLabel:`Box`,src:e.image});'
  );

  // Update children of pill buttons
  const oldButtonsSnippet = `children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{className:\`hidden sm:inline\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`sm:hidden\`,children:item.key===\`front\`?\`Front\`:item.key===\`back\`?\`Back\`:\`Box\`})
                  ]`;

  const newButtonsSnippet = `children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-full\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-short\`,children:item.shortLabel||item.label})
                  ]`;

  if (content.includes(oldButtonsSnippet)) {
    content = content.replace(oldButtonsSnippet, newButtonsSnippet);
    console.log(`Replaced buttons snippet in ${f}`);
  } else {
    console.log(`oldButtonsSnippet not found in ${f}`);
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
console.log('All done!');
