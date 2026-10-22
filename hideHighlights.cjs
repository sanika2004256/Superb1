const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target1 = '(0,k.jsx)(`div`,{className:`space-y-2 mb-6`,children:e.highlights.map';
if (code.includes(target1)) {
    code = code.replace(target1, '(0,k.jsx)(`div`,{className:`hidden`,children:e.highlights.map');
    console.log('Highlights hidden on cards');
} else {
    console.log('Target 1 not found');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
