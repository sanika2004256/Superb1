const fs = require('fs');
const acorn = require('acorn');

const bODefinition = `var bO=[{"id":"all","name":"All Flavours (5)"},{"id":"cardamom","name":"Cardamom Chai"},{"id":"masala","name":"Masala Chai"},{"id":"ginger","name":"Ginger Chai"},{"id":"plain","name":"Plain Sweet Chai"},{"id":"coffee","name":"Instant Coffee"}];`;

const newFOString = `function fO({initialCategory:e=\`all\`,initialSearch:t=\`\`,isHomePage:n=!1,onOpenEnquiry:r}){let[i,a]=(0,_.useState)(e),[o,s]=(0,_.useState)(t),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(!1),f=(0,_.useRef)(null);(0,_.useEffect)(()=>{e&&a(e)},[e]),(0,_.useEffect)(()=>{t!==void 0&&s(t)},[t]);let m=(0,_.useMemo)(()=>{let seen=new Set();return Ha.filter(e=>{let matchCat=!i||i===\`all\`;if(!matchCat){let t=((e.name||\`\`)+\` \`+(e.category||\`\`)+\` \`+(e.categoryName||\`\`)+\` \`+(e.sku||\`\`)).toLowerCase();if(i===\`cardamom\`)matchCat=t.includes(\`cardamom\`);else if(i===\`masala\`)matchCat=t.includes(\`masala\`);else if(i===\`ginger\`)matchCat=t.includes(\`ginger\`);else if(i===\`plain\`)matchCat=t.includes(\`plain\`);else if(i===\`coffee\`)matchCat=t.includes(\`coffee\`);else matchCat=e.category===i||t.includes(i.toLowerCase())}let s=o.trim().toLowerCase();let key=e.uniqueKey||(e.category+\`_\`+e.sku+\`_\`+e.name)||e.id;if(!s){if(!matchCat)return!1;if(seen.has(key))return!1;seen.add(key);return!0}let r=e.name.toLowerCase().includes(s)||e.sku.toLowerCase().includes(s)||(e.packing&&e.packing.toLowerCase().includes(s))||(e.categoryName&&e.categoryName.toLowerCase().includes(s))||(e.brand&&e.brand.toLowerCase().includes(s));if(matchCat&&r){if(seen.has(key))return!1;seen.add(key);return!0}return!1})},[i,o]),h=n?m.slice(0,5):m;return(0,k.jsxs)(\`section\`,{className:\`\${n?\`py-12 sm:py-16\`:\`pt-4 sm:pt-6 pb-16\`} bg-slate-50\`,id:\`products\`,children:[(0,k.jsxs)(\`div\`,{className:\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\`,children:[null,(0,k.jsx)(\`div\`,{className:\`mb-7 sm:mb-9\`,children:(0,k.jsx)(\`div\`,{ref:f,className:\`flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 scrollbar-none\`,children:bO.map(e=>(0,k.jsx)(\`button\`,{onClick:()=>a(e.id),className:\`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap \${i===e.id?\`bg-[#d92906] text-white shadow-sm font-bold\`:\`bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900\`}\`,children:e.name},e.id))})}),h.length>0?(0,k.jsx)(\`div\`,{className:\`products-grid-5\`,\"data-product-grid\":!0,children:h.map((e,t)=>(0,k.jsx)(oO,{animation:\`fade-up\`,delay:Math.min(t*40,300),children:(0,k.jsx)(uO,{product:e,onViewDetails:e=>l(e),onEnquire:e=>r&&r(e),showDistributorPrice:!1})},e.uniqueKey||(e.category+\`_\`+e.sku+\`_\`+e.name)||e.id))}):(0,k.jsxs)(\`div\`,{className:\`text-center py-16 bg-white rounded-3xl border border-slate-200 p-8\`,children:[(0,k.jsx)(\`p\`,{className:\`text-slate-500 text-sm\`,children:\`No products found in this category.\`}),(0,k.jsx)(\`button\`,{onClick:()=>a(\`all\`),className:\`mt-4 px-4 py-2 bg-[#d92906] text-white text-xs font-bold rounded-xl hover:bg-[#b91c1c] cursor-pointer transition-colors\`,children:\`Show All Flavours\`})]}),n&&(0,k.jsx)(\`div\`,{className:\`text-center mt-10 sm:mt-12\`,children:(0,k.jsxs)(T,{to:\`/products\`,className:\`inline-flex items-center justify-center gap-2.5 bg-[#d92906] hover:bg-[#b91c1c] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer\`,children:[(0,k.jsx)(\`span\`,{children:\`View More\`}),(0,k.jsx)(mr,{className:\`w-4 h-4 text-white\`})]})})]}) ,(0,k.jsx)(dO,{product:c,onClose:()=>l(null),onEnquire:e=>r&&r(e)})]})}`;

// Verify acorn parsing of newFOString
try {
  acorn.parse(bODefinition + newFOString, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Acorn parse PASSED for bODefinition + newFOString!');
} catch (e) {
  console.error('Acorn parse error:', e);
  process.exit(1);
}

const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  // Make a timestamped backup
  fs.writeFileSync(`${f}.bak_${Date.now()}`, content);

  const fOStart = content.indexOf('function fO({');
  if (fOStart === -1) {
    console.error(`Could not find function fO in ${f}`);
    continue;
  }

  const nextMarker = 'var pO=[';
  const fOEnd = content.indexOf(nextMarker, fOStart);
  if (fOEnd === -1) {
    console.error(`Could not find var pO in ${f}`);
    continue;
  }

  // Prepend bODefinition if not already there right before fO
  const replacement = bODefinition + '\n' + newFOString;

  const newContent = content.substring(0, fOStart) + replacement + content.substring(fOEnd);

  // Validate entire new content with acorn
  try {
    acorn.parse(newContent, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Entire bundle syntax valid for ${f}!`);
    fs.writeFileSync(f, newContent, 'utf8');
    console.log(`Successfully written ${f}`);
  } catch (err) {
    console.error(`Acorn failed on bundle ${f}:`, err);
    process.exit(1);
  }
}
console.log('All done!');
