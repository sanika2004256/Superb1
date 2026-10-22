const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const targetStr = '(0,k.jsx)(`span`,{className:`bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs`,children:e.packSize})';
if (code.includes(targetStr)) {
    code = code.split(targetStr).join('e.packSize&&' + targetStr);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('REPLACED SUCCESSFULLY!');
} else {
    console.log('TARGET STRING NOT FOUND. Let us search for children:e.packSize})');
    const idx = code.indexOf('children:e.packSize})');
    if (idx !== -1) {
       console.log('Found it around: ', code.substring(idx - 150, idx + 20));
    }
}
