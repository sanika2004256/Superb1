const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const targetStr = '(0,k.jsx)(`span`,{className:`absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#d92906] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-red-100`,children:e.badge||e.categoryName})';
const replacementStr = '(e.badge||e.categoryName?' + targetStr + ':"")';

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('assets/index-BM-yEkkk.js', code);
  console.log('Fixed Empty Dash!');
} else {
  console.log('Target string not found');
}
