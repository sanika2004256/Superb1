const fs = require('fs');

const file = 'assets/index-v2-1790307818931.js';
let code = fs.readFileSync(file, 'utf8');

// 1. Hide ZD Popup
let popupTarget = 'function ZD({onOpenEnquiry:e}){let[t,n]=(0,_.useState)(!1);return t?null:(0,k.jsxs)(`div`,{className:`fixed bottom-4';
if (code.includes(popupTarget)) {
    code = code.replace(/function ZD\(\{onOpenEnquiry:e\}\)\{let\[t,n\]=\(0,_\.useState\)\(!1\);return t\?null:\(0,k\.jsxs\)\(`div`,\{className:`fixed bottom-4/g, 'function ZD({onOpenEnquiry:e}){return null;}function ZD_OLD({onOpenEnquiry:e}){let[t,n]=(0,_.useState)(!1);return t?null:(0,k.jsxs)(`div`,{className:`fixed bottom-4');
    console.log('Hid popup ZD');
} else {
    console.log('Popup not found');
}

// 2. Remove text from eO
code = code.replace(/title:`A Sip of Heaven – Experience Nectar in Every Sip`/g, 'title:``');
code = code.replace(/subtitle:`India\'s fastest growing Amruttulya Tea cafe franchise chain. Serving millions of refreshing, authentic cups daily.`/g, 'subtitle:``');
console.log('Removed text');

fs.writeFileSync(file, code);
if (fs.existsSync('public/' + file)) {
    fs.writeFileSync('public/' + file, code);
}
console.log('Done');
