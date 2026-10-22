const fs = require('fs');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Hide Marathi button instead of removing it!
let marathiTarget = 'className:`hidden md:inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-[#d92906] px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate`';
if (code.includes(marathiTarget)) {
    code = code.replace(marathiTarget, 'className:`hidden`');
    console.log('Hid Marathi button');
} else {
    console.log('Marathi button not found!');
}

// 2. Hide ZD popup safely
code = code.replace(/function ZD\(\{onOpenEnquiry:e\}\)\{let\[t,n\]=\(0,_\.useState\)\(!1\);return t\?null:\(0,k\.jsxs\)\(\`div\`,\{className:\`fixed bottom-4/g, 'function ZD({onOpenEnquiry:e}){return null;}function ZD_OLD({onOpenEnquiry:e}){let[t,n]=(0,_.useState)(!1);return t?null:(0,k.jsxs)(`div`,{className:`fixed bottom-4');
console.log('Hid ZD Popup');

// 3. Change initialCategory to 'all'
code = code.replace('{initialCategory:e=`karak-premium`', '{initialCategory:e=`all`');
console.log('Default category set to all');

// 4. Add 'all' tab back to Ba
let baIndex = code.indexOf('Ba=[{id:`karak-premium`');
if (baIndex !== -1) {
    code = code.replace('Ba=[{id:`karak-premium`', 'Ba=[{id:`all`,name:`All Products`,count:93},{id:`karak-premium`');
    console.log('Restored All Products tab');
} else {
    console.log('Ba array not found!');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('All safe modifications applied.');
