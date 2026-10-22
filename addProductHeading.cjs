const fs = require('fs');
const acorn = require('acorn');

const oldNO = `function NO({onOpenEnquiry:e}){let[t]=Kn(),n=t.get(\`cat\`)||\`all\`,r=t.get(\`q\`)||\`\`;return(0,k.jsx)(\`div\`,{className:\`pt-20 sm:pt-24\`,children:(0,k.jsx)(fO,{initialCategory:n,initialSearch:r,isHomePage:!1,onOpenEnquiry:e})})}`;

const newNO = `function NO({onOpenEnquiry:e}){let[t]=Kn(),n=t.get(\`cat\`)||\`all\`,r=t.get(\`q\`)||\`\`;return(0,k.jsxs)(\`div\`,{className:\`pt-20 sm:pt-24 bg-slate-50 min-h-screen\`,children:[(0,k.jsx)(\`div\`,{className:\`bg-gradient-to-b from-stone-50/70 via-white to-slate-50/80 border-b border-slate-200/70 py-10 sm:py-14 text-center\`,children:(0,k.jsxs)(\`div\`,{className:\`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3\`,children:[(0,k.jsx)(\`span\`,{className:\`text-[#d92906] font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-red-50/90 px-3.5 py-1 rounded-full border border-red-200/70 inline-block shadow-2xs\`,children:\`Authentic Quality & Taste\`}),(0,k.jsx)(\`h1\`,{className:\`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-serif\`,children:\`Our Products\`}),(0,k.jsx)(\`p\`,{className:\`text-slate-600 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto leading-relaxed\`,children:\`Explore our premium instant tea and coffee premixes made with pure, natural ingredients for authentic flavor in every cup.\`})]})}),(0,k.jsx)(fO,{initialCategory:n,initialSearch:r,isHomePage:!1,onOpenEnquiry:e})]})}`;

try {
  acorn.parse(newNO, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('newNO is 100% syntactically valid!');
} catch (e) {
  console.error('Syntax error:', e);
  process.exit(1);
}

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes(oldNO)) {
    console.log('Could not find oldNO in', filePath);
    return;
  }

  content = content.replace(oldNO, newNO);

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax valid for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn error in', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}
console.log('Done!');
