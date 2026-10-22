const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The missing comma is between ]})]}) and (0,k.jsxs)(div,{className:	ext-center
const brokenStr = ']})]})(0,k.jsxs)(div,{className:	ext-center';
const fixedStr = ']})]}),(0,k.jsxs)(div,{className:	ext-center';

if (code.includes(brokenStr)) {
    code = code.replace(brokenStr, fixedStr);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Fixed syntax error by adding comma.');
} else {
    console.log('Broken string not found.');
}
