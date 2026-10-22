const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js')
];

const targetStr = '(0,k.jsxs)(`div`,{className:`w-full h-52 bg-slate-100 overflow-hidden relative`,style:{height:`215px`},children:[(0,k.jsx)(`img`,{src:e.image,alt:e.name,className:`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105`,loading:`lazy`}),(0,k.jsx)(`div`,{className:`absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70 uppercase tracking-wider`,children:`Board of Directors`})]})';

const replacementStr = '(0,k.jsxs)(`div`,{className:`w-full aspect-square bg-slate-100 overflow-hidden relative`,children:[(0,k.jsx)(`img`,{src:e.image,alt:e.name,className:`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105`,loading:`lazy`}),(0,k.jsx)(`div`,{className:`absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-slate-200/70 uppercase tracking-wider`,children:`Board of Directors`})]})';

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  if (!code.includes(targetStr)) {
    console.log('Target string not found in:', filePath);
    return;
  }

  code = code.replace(targetStr, replacementStr);

  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
