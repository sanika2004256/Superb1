const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = '(0,k.jsx)(`span`,{className:`bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs`,children:e.packSize})';
console.log(code.includes(target));

// The problem might be backticks or quotes being escaped differently. 
const splitCode = code.split('children:e.packSize})');
if (splitCode.length > 1) {
    const before = splitCode[0];
    const after = splitCode[1];
    
    // find the start of (0,k.jsx)(`span`...
    const startIdx = before.lastIndexOf('(0,k.jsx)(`span`,{className:`bg-slate-900/80');
    if (startIdx > -1) {
        const toReplace = code.substring(startIdx, before.length + 'children:e.packSize})'.length);
        code = code.replace(toReplace, 'e.packSize&&' + toReplace);
        fs.writeFileSync('assets/index-BM-yEkkk.js', code);
        console.log('Fixed successfully!');
    } else {
        console.log('Could not find start index.');
    }
}
