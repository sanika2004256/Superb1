const fs = require('fs');
const acorn = require('acorn');

const oldChunk = `(0,k.jsxs)(\`div\`,{className:\`bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-red-200 transition-all duration-300 hover:shadow-xl  flex flex-col justify-between group h-full\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsxs)(\`div\`,{className:\`w-full aspect-square bg-slate-100 overflow-hidden relative\`,children:[(0,k.jsx)(\`img\`,{src:e.image,alt:e.name,className:\`w-full h-full object-cover object-top  transition-transform duration-500\`,loading:\`lazy\`}),(0,k.jsx)(\`div\`,{className:\`absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70 uppercase tracking-wider\`,children:\`Board of Directors\`})]}),(0,k.jsxs)(\`div\`,{className:\`p-5 space-y-2.5\`,children:[(0,k.jsx)(\`span\`,{className:\`text-[11px] font-bold text-[#d92906] block uppercase tracking-wider leading-tight\`,children:e.designation}),(0,k.jsx)(\`h4\`,{className:\`text-lg font-bold font-serif text-slate-900 leading-snug\`,children:e.name}),(0,k.jsx)(\`p\`,{className:\`text-xs text-slate-600 leading-relaxed pt-1\`,children:e.bio})]})]}),(0,k.jsxs)(\`div\`,{className:\`p-5 pt-0 border-t border-slate-100 mt-3\`,children:[(0,k.jsx)(\`span\`,{className:\`text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2\`,children:\`Leadership Domains\`}),(0,k.jsx)(\`div\`,{className:\`flex flex-wrap gap-1.5\`,children:e.focusAreas.map((e,t)=>(0,k.jsx)(\`span\`,{className:\`text-[10.5px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md\`,children:e},t))})]})]})`;

const newChunk = `(0,k.jsxs)(\`div\`,{className:\`bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-red-200 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group h-full\`,children:[(0,k.jsxs)(\`div\`,{children:[(0,k.jsxs)(\`div\`,{className:\`w-full h-52 bg-slate-100 overflow-hidden relative\`,style:{height:\`215px\`},children:[(0,k.jsx)(\`img\`,{src:e.image,alt:e.name,className:\`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105\`,loading:\`lazy\`}),(0,k.jsx)(\`div\`,{className:\`absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70 uppercase tracking-wider\`,children:\`Board of Directors\`})]}),(0,k.jsxs)(\`div\`,{className:\`p-4 sm:p-5 space-y-2\`,children:[(0,k.jsx)(\`span\`,{className:\`text-[10.5px] font-bold text-[#d92906] block uppercase tracking-wider leading-tight\`,children:e.designation}),(0,k.jsx)(\`h4\`,{className:\`text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug\`,children:e.name}),(0,k.jsx)(\`p\`,{className:\`text-xs text-slate-600 leading-relaxed line-clamp-3 pt-0.5\`,style:{display:\`-webkit-box\`,WebkitLineClamp:3,WebkitBoxOrient:\`vertical\`,overflow:\`hidden\`,minHeight:\`3.6rem\`},title:e.bio,children:e.bio})]})]}),(0,k.jsxs)(\`div\`,{className:\`p-4 pt-2.5 border-t border-slate-100 mt-1\`,children:[(0,k.jsx)(\`span\`,{className:\`text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5\`,children:\`Leadership Domains\`}),(0,k.jsx)(\`div\`,{className:\`flex flex-wrap gap-1.5\`,children:e.focusAreas.map((e,t)=>(0,k.jsx)(\`span\`,{className:\`text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md\`,children:e},t))})]})]})`;

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes(oldChunk)) {
    console.log('Could not find oldChunk in', filePath);
    return;
  }

  content = content.replace(oldChunk, newChunk);

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn error for', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}
