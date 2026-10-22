const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let popupTarget = '(0,k.jsxs)(`div`,{className:`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-bounce-slow`';
if (code.includes(popupTarget)) {
    code = code.replace(popupTarget, '(0,k.jsxs)(`div`,{className:`hidden`');
    console.log('Hid factory popup.');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
