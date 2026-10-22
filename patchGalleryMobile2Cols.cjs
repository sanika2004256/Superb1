const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js')
];

const newCOString = `function CO({isHomePage:e=!1,compactTop:t=!1}){
  let[n,r]=(0,_.useState)(\`all\`),[i,a]=(0,_.useState)(null),[cardBacks,setCardBacks]=(0,_.useState)({}),o=(0,_.useMemo)(()=>n===\`all\`?xO:xO.filter(e=>e.category===n),[n]),s=e?o.slice(0,5):o;
  let toggleBack=(e,t)=>{
    t.stopPropagation();
    setCardBacks(r=>({...r,[e]:!r[e]}));
  };
  return(0,k.jsx)(\`section\`,{className:\`\${t?\`pt-6 sm:pt-8 lg:pt-9 pb-14 sm:pb-18\`:\`py-14 sm:py-18\`} bg-white\`,id:\`gallery\`,children:
    (0,k.jsxs)(\`div\`,{className:\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\`,children:[
      null,
      (0,k.jsx)(\`div\`,{className:\`mb-7 sm:mb-9\`,children:(0,k.jsx)(\`div\`,{className:\`flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none\`,children:bO.map(e=>(0,k.jsx)(\`button\`,{onClick:()=>r(e.id),className:\`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap \${n===e.id?\`bg-[#d92906] text-white shadow-sm font-bold\`:\`bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900\`}\`,children:e.name},e.id))})}),
      (0,k.jsx)(\`div\`,{className:\`gallery-grid-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5\`,children:s.map((e,t)=>{
        let isBack=!!cardBacks[e.id];
        let displayImg=isBack&&e.imageBack?e.imageBack:e.image;
        return(0,k.jsx)(oO,{animation:\`fade-up\`,delay:Math.min(t*60,360),children:
          (0,k.jsxs)(\`div\`,{onClick:()=>a(t),className:\`group bg-white rounded-xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/85 hover:border-red-200 flex flex-col justify-between h-full relative\`,children:[
            (0,k.jsxs)(\`div\`,{className:\`relative h-44 sm:h-60 lg:h-64 w-full bg-slate-50/90 p-2 sm:p-4 flex items-center justify-center overflow-hidden border-b border-slate-100\`,children:[
              (0,k.jsx)(\`img\`,{src:displayImg,alt:e.title,className:\`max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105\`,loading:\`lazy\`}),
              (0,k.jsx)(\`div\`,{className:\`absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity\`}),
              (0,k.jsxs)(\`button\`,{type:\`button\`,onClick:t=>toggleBack(e.id,t),className:\`absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 hover:bg-white text-slate-700 hover:text-[#d92906] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs border border-slate-200/80 flex items-center gap-1 cursor-pointer transition-colors z-10\`,title:\`Click to toggle Front / Back view\`,children:[
                (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${isBack?\`bg-amber-500\`:\`bg-emerald-500\`}\`}),
                (0,k.jsx)(\`span\`,{children:isBack?\`Back View\`:\`Front View\`})
              ]}),
              (0,k.jsx)(\`div\`,{className:\`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/70 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10\`,title:\`Open Lightbox\`,children:(0,k.jsx)(za,{className:\`w-3 h-3 sm:w-3.5 sm:h-3.5\`})})
            ]}),
            (0,k.jsxs)(\`div\`,{className:\`p-2.5 sm:p-4 bg-white text-slate-900 space-y-0.5 sm:space-y-1\`,children:[
              (0,k.jsx)(\`span\`,{className:\`text-[9px] sm:text-[10px] font-bold text-[#d92906] uppercase tracking-wider block\`,children:e.category.replace(\`-\`,\` \`)}),
              (0,k.jsx)(\`h4\`,{className:\`text-xs sm:text-sm font-bold font-serif leading-snug line-clamp-1 sm:line-clamp-2 text-slate-900 group-hover:text-[#d92906] transition-colors\`,children:e.title}),
              (0,k.jsx)(\`p\`,{className:\`text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed\`,children:e.description})
            ]})
          ]})
        },e.id)
      })}),
      e&&(0,k.jsx)(\`div\`,{className:\`text-center mt-10\`,children:(0,k.jsxs)(T,{to:\`/gallery\`,className:\`inline-flex items-center gap-2 bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all\`,children:[(0,k.jsxs)(\`span\`,{children:[\`Explore All 5 Sachet Flavours\`]}),(0,k.jsx)(mr,{className:\`w-4 h-4\`})]})}),
      (0,k.jsx)(SO,{images:s,activeIndex:i,onClose:()=>a(null),onPrev:()=>a(e=>e===0?s.length-1:e-1),onNext:()=>a(e=>(e+1)%s.length)})
    ]})
  })
}`;

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  const coIdx = content.indexOf('function CO(');
  if (coIdx === -1) {
    console.log('function CO( not found in:', filePath);
    return;
  }

  const afterCoIdx = content.indexOf('var wO=', coIdx);
  if (afterCoIdx === -1) {
    console.log('var wO= not found in:', filePath);
    return;
  }

  const beforeCO = content.substring(0, coIdx);
  const afterCO = content.substring(afterCoIdx);

  const updatedContent = beforeCO + newCOString + '\n' + afterCO;

  try {
    acorn.parse(updatedContent, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax 100% VALID for', filePath);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
