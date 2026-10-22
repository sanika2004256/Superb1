const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find the line that renders the accentColor gradient
// It looks like: (0,k.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-r ${n.accentColor}`}),
let targetStr = '(0,k.jsx)(`div`,{className:`absolute inset-0 bg-gradient-to-r ${n.accentColor}`}),';
if (code.includes(targetStr)) {
    code = code.replace(targetStr, '');
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    console.log('Removed gradient overlay');
} else {
    console.log('Target not found');
}
