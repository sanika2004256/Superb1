const fs = require('fs');
const acorn = require('acorn');

const newBO = [
  { id: "all", name: "All Flavours (5)" },
  { id: "cardamom", name: "Cardamom Chai" },
  { id: "masala", name: "Masala Chai" },
  { id: "ginger", name: "Ginger Chai" },
  { id: "plain", name: "Plain Sweet Chai" },
  { id: "coffee", name: "Instant Coffee" }
];

const newXO = [
  {
    id: "gal-cardamom",
    category: "cardamom",
    title: "Instant Cardamom Chai Premix Sachet",
    description: "14g Single serve pouch with authentic green cardamom essence. Just add 90ml hot water.",
    image: "/images/products/cardamom_chai_front.jpg",
    imageBack: "/images/products/cardamom_chai_back.jpg"
  },
  {
    id: "gal-masala",
    category: "masala",
    title: "Instant Masala Chai Premix Sachet",
    description: "14g Single serve sachet of traditional 7-spice Kadak Chai with clove, cinnamon & ginger.",
    image: "/images/products/masala_chai_front.jpg",
    imageBack: "/images/products/masala_chai_back.jpg"
  },
  {
    id: "gal-ginger",
    category: "ginger",
    title: "Instant Ginger Chai Premix Sachet",
    description: "14g Single serve warming dry ginger tea sachet with zero synthetic colors.",
    image: "/images/products/ginger_chai_front.jpg",
    imageBack: "/images/products/ginger_chai_back.jpg"
  },
  {
    id: "gal-plain",
    category: "plain",
    title: "Instant Plain Sweet Chai Sachet",
    description: "Classic sweet milk tea instant formulation for rapid, consistent commercial service.",
    image: "/images/products/plain_chai_front.jpg",
    imageBack: "/images/products/plain_chai_back.jpg"
  },
  {
    id: "gal-coffee",
    category: "coffee",
    title: "Instant Coffee Premix Sachet",
    description: "Rich South-Indian blend instant single-serve sachet for authentic aromatic hot coffee.",
    image: "/images/products/coffee_front.jpg",
    imageBack: "/images/products/coffee_back.jpg"
  }
];

// Refined Lightbox with Front / Back switcher
const newSOString = `function SO({images:e,activeIndex:t,onClose:n,onPrev:r,onNext:i}){
  let a=t!==null&&!!e&&!!e[t];
  let[showBack,setShowBack]=(0,_.useState)(!1);
  (0,_.useEffect)(()=>{setShowBack(!1)},[t]);
  if((0,_.useEffect)(()=>{
    if(!a)return;
    let e=e=>{
      e.key===\`Escape\`&&n(),e.key===\`ArrowLeft\`&&r(),e.key===\`ArrowRight\`&&i()
    };
    return window.addEventListener(\`keydown\`,e),()=>window.removeEventListener(\`keydown\`,e)
  },[a,n,r,i]),!a)return null;
  let o=e[t];
  let curImg=showBack&&o.imageBack?o.imageBack:o.image;
  return(0,k.jsxs)(\`div\`,{className:\`fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200\`,onClick:n,children:[
    (0,k.jsx)(\`button\`,{onClick:n,className:\`absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer\`,\"aria-label\":\`Close Lightbox\`,children:(0,k.jsx)(La,{className:\`w-6 h-6\`})}),
    (0,k.jsx)(\`button\`,{onClick:e=>{e.stopPropagation(),r()},className:\`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer\`,\"aria-label\":\`Previous Sachet\`,children:(0,k.jsx)(Mr,{className:\`w-6 h-6\`})}),
    (0,k.jsx)(\`button\`,{onClick:e=>{e.stopPropagation(),i()},className:\`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer\`,\"aria-label\":\`Next Sachet\`,children:(0,k.jsx)(Pr,{className:\`w-6 h-6\`})}),
    (0,k.jsxs)(\`div\`,{className:\`max-w-xl w-full flex flex-col items-center justify-center relative z-20 my-auto\`,onClick:e=>e.stopPropagation(),children:[
      (0,k.jsxs)(\`div\`,{className:\`flex items-center gap-2 mb-3 bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/25 shadow-xl shrink-0\`,children:[
        (0,k.jsxs)(\`button\`,{type:\`button\`,onClick:()=>setShowBack(!1),className:\`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer \${!showBack?\`bg-white text-slate-900 shadow-md\`:\`text-white/80 hover:text-white\`}\`,children:[(0,k.jsx)(\`span\`,{children:\`✦ Front Pouch\`})]}),
        (0,k.jsxs)(\`button\`,{type:\`button\`,onClick:()=>setShowBack(!0),className:\`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer \${showBack?\`bg-white text-slate-900 shadow-md\`:\`text-white/80 hover:text-white\`}\`,children:[(0,k.jsx)(\`span\`,{children:\`✦ Back & Nutrition\`})]})
      ]}),
      (0,k.jsx)(\`div\`,{className:\`h-[52vh] sm:h-[58vh] max-h-[500px] w-full flex items-center justify-center\`,children:(0,k.jsx)(\`img\`,{src:curImg,alt:o.title,className:\`max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300\`})}),
      (0,k.jsxs)(\`div\`,{className:\`text-center text-white mt-4 space-y-1 shrink-0\`,children:[
        (0,k.jsx)(\`h4\`,{className:\`text-base sm:text-lg font-bold font-serif\`,children:o.title}),
        (0,k.jsx)(\`p\`,{className:\`text-xs text-slate-300 max-w-md mx-auto line-clamp-2\`,children:o.description}),
        (0,k.jsxs)(\`span\",{className:\`text-[11px] text-slate-400 block pt-0.5 font-medium\`,children:[t+1,\` of \`,e.length,\` Flavours\`]})
      ]})
    ]})
  ]})
}`;

// Refined Gallery Grid (CO)
const newCOString = `function CO({isHomePage:e=!1,compactTop:t=!1}){
  let[n,r]=(0,_.useState)(\`all\`),[i,a]=(0,_.useState)(null),[cardBacks,setCardBacks]=(0,_.useState)({}),o=(0,_.useMemo)(()=>n===\`all\`?xO:xO.filter(e=>e.category===n),[n]),s=e?o.slice(0,5):o;
  let toggleBack=(e,t)=>{
    t.stopPropagation();
    setCardBacks(r=>({...r,[e]:!r[e]}));
  };
  return(0,k.jsx)(\`section\`,{className:\`\${t?\`pt-6 sm:pt-8 lg:pt-9 pb-14 sm:pb-18\`:\`py-14 sm:py-18\`} bg-white\`,id:\`gallery\`,children:
    (0,k.jsxs)(\`div\`,{className:\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\`,children:[
      null,
      (0,k.jsx)(\`div\`,{className:\`mb-7 sm:mb-9\`,children:(0,k.jsx)(\`div\`,{className:\`flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none\`,children:bO.map(e=>(0,k.jsx)(\`button\",{onClick:()=>r(e.id),className:\`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap \${n===e.id?\`bg-[#d92906] text-white shadow-sm font-bold\`:\`bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900\`}\`,children:e.name},e.id))})}),
      (0,k.jsx)(\`div\`,{className:\`gallery-grid-5\`,children:s.map((e,t)=>{
        let isBack=!!cardBacks[e.id];
        let displayImg=isBack&&e.imageBack?e.imageBack:e.image;
        return(0,k.jsx)(oO,{animation:\`fade-up\`,delay:Math.min(t*60,360),children:
          (0,k.jsxs)(\`div\`,{onClick:()=>a(t),className:\`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/85 hover:border-red-200 flex flex-col justify-between h-full relative\`,children:[
            (0,k.jsxs)(\`div\`,{className:\`relative h-56 sm:h-60 lg:h-64 w-full bg-slate-50/90 p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b border-slate-100\`,children:[
              (0,k.jsx)(\`img\`,{src:displayImg,alt:e.title,className:\`max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105\`,loading:\`lazy\`}),
              (0,k.jsx)(\`div\`,{className:\`absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity\`}),
              (0,k.jsxs)(\`button\`,{type:\`button\`,onClick:t=>toggleBack(e.id,t),className:\`absolute top-3 left-3 bg-white/95 hover:bg-white text-slate-700 hover:text-[#d92906] text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/90 flex items-center gap-1 cursor-pointer transition-colors z-10\`,title:\`Click to toggle Front / Back view\`,children:[
                (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${isBack?\`bg-amber-500\`:\`bg-emerald-500\`}\`}),
                (0,k.jsx)(\`span\`,{children:isBack?\`Back View\`:\`Front View\`})
              ]}),
              (0,k.jsx)(\`div\`,{className:\`absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10\`,title:\`Open Lightbox\`,children:(0,k.jsx)(za,{className:\`w-3.5 h-3.5\`})})
            ]}),
            (0,k.jsxs)(\`div\`,{className:\`p-3.5 sm:p-4 bg-white text-slate-900 space-y-1\`,children:[
              (0,k.jsx)(\`span\`,{className:\`text-[10px] font-bold text-[#d92906] uppercase tracking-wider block\`,children:e.category.replace(\`-\`,\` \`)}),
              (0,k.jsx)(\`h4\`,{className:\`text-xs sm:text-sm font-bold font-serif leading-snug line-clamp-1 text-slate-900 group-hover:text-[#d92906] transition-colors\`,children:e.title}),
              (0,k.jsx)(\`p\`,{className:\`text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed\`,children:e.description})
            ]})
          ]})
        },e.id)
      })}),
      e&&(0,k.jsx)(\`div\`,{className:\`text-center mt-10\`,children:(0,k.jsxs)(T,{to:\`/gallery\`,className:\`inline-flex items-center gap-2 bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all\`,children:[(0,k.jsxs)(\`span\`,{children:[\`Explore All 5 Sachet Flavours\`]}),(0,k.jsx)(mr,{className:\`w-4 h-4\`})]})}),
      (0,k.jsx)(SO,{images:s,activeIndex:i,onClose:()=>a(null),onPrev:()=>a(e=>e===0?s.length-1:e-1),onNext:()=>a(e=>(e+1)%s.length)})
    ]})
  })
}`;

for (const p of ['public/assets/index-v29-1790684309157.js', 'assets/index-v29-1790684309157.js']) {
  let content = fs.readFileSync(p, 'utf8');

  const bOStart = content.indexOf('bO=[');
  const coIdx = content.indexOf('function CO');
  const afterCoIdx = content.indexOf('var wO=', coIdx);

  const beforeBO = content.substring(0, bOStart);
  const afterCO = content.substring(afterCoIdx);

  const galleryBlock = 'bO=' + JSON.stringify(newBO) + ';\nvar xO=' + JSON.stringify(newXO) + ';\n' + newSOString + '\n' + newCOString + '\n';

  const newFullContent = beforeBO + galleryBlock + afterCO;

  // Validate syntax with acorn
  try {
    acorn.parse(newFullContent, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`FULL BUNDLE SYNTAX VALID FOR ${p}!`);
    fs.writeFileSync(p, newFullContent, 'utf8');
    console.log(`Successfully written ${p}`);
  } catch (err) {
    console.error(`Syntax error in ${p}:`, err.message, 'at pos:', err.pos);
    process.exit(1);
  }
}
