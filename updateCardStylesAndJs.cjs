const fs = require('fs');
const acorn = require('acorn');

const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Exact Arrows String
  const oldArrows = `              imgList.length>1&&(0,k.jsxs)(k.Fragment,{children:[
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx-1+imgList.length)%imgList.length,ev),
                  className:\`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#d92906] items-center justify-center shadow-md transition-all cursor-pointer opacity-75 group-hover:opacity-100 hover:scale-110\`,
                  title:\`Previous image\`,
                  "aria-label":\`Previous image\`,
                  children:(0,k.jsx)(Mr,{className:\`w-4 h-4\`})
                }),
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx+1)%imgList.length,ev),
                  className:\`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#d92906] items-center justify-center shadow-md transition-all cursor-pointer opacity-75 group-hover:opacity-100 hover:scale-110\`,
                  title:\`Next image\`,
                  "aria-label":\`Next image\`,
                  children:(0,k.jsx)(Pr,{className:\`w-4 h-4\`})
                })
              ]}),`;

  const newArrows = `              imgList.length>1&&(0,k.jsxs)(k.Fragment,{children:[
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx-1+imgList.length)%imgList.length,ev),
                  className:\`product-card-arrow-prev\`,
                  title:\`Previous image\`,
                  "aria-label":\`Previous image\`,
                  children:(0,k.jsx)(Mr,{className:\`w-4 h-4\`})
                }),
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx+1)%imgList.length,ev),
                  className:\`product-card-arrow-next\`,
                  title:\`Next image\`,
                  "aria-label":\`Next image\`,
                  children:(0,k.jsx)(Pr,{className:\`w-4 h-4\`})
                })
              ]}),`;

  if (content.includes(oldArrows)) {
    content = content.replace(oldArrows, newArrows);
    console.log(`Replaced arrows in ${f}`);
  } else {
    console.log(`Old arrows not found in ${f}`);
  }

  // Exact Switcher String
  const oldSwitcher = `              imgList.length>1&&(0,k.jsx)(\`div\`,{
                className:\`absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-1 sm:px-1.5 py-0.5 rounded-full shadow-sm border border-slate-200/90 max-w-[92%]\`,
                onClick:ev=>ev.stopPropagation(),
                children:imgList.map((item,idx)=>(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`px-1.5 sm:px-2 py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-0.5 sm:gap-1 \${curIdx===idx?\`bg-[#d92906] text-white shadow-2xs\`:\`text-slate-600 hover:text-slate-900 hover:bg-slate-100\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-full\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-short\`,children:item.shortLabel||item.label})
                  ]
                }))
              })`;

  const newSwitcher = `              imgList.length>1&&(0,k.jsx)(\`div\`,{
                className:\`product-img-switcher\`,
                onClick:ev=>ev.stopPropagation(),
                children:imgList.map((item,idx)=>(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`product-switcher-btn \${curIdx===idx?\`active\`:\`\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`product-switcher-dot\`}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-full\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-short\`,children:item.shortLabel||item.label})
                  ]
                }))
              })`;

  if (content.includes(oldSwitcher)) {
    content = content.replace(oldSwitcher, newSwitcher);
    console.log(`Replaced switcher in ${f}`);
  } else {
    console.log(`Old switcher not found in ${f}`);
  }

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
