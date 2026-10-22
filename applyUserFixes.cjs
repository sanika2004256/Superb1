const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove Marathi/English Button
// The button looks like: (0,k.jsx)("button",{className:"flex items-center gap-2 bg-[#d92906] hover:bg-[#b91c1c] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all",onClick:...,children:"मराठी / English"})
let langTarget = code.match(/,?\s*\(0,k\.jsx\)\(`button`,{className:`flex items-center gap-2 bg-\[#d92906\][^}]+children:`मराठी \/ English`}\)/);
if (langTarget) {
    code = code.replace(langTarget[0], '');
    console.log('Removed Language Button');
} else {
    console.log('Language Button not found');
}

// 2. Hide Factory Commercial Desk Popup
let popupTarget = /function ZD\(\{onOpenEnquiry:e\}\)\{let\[t,n\]=\(0,_\.useState\)\(!1\);return t\?null:\(0,k\.jsxs\)\(`div`,\{className:`fixed bottom-4/;
if (popupTarget.test(code)) {
    code = code.replace(popupTarget, 'function ZD({onOpenEnquiry:e}){return null;}function ZD_OLD({onOpenEnquiry:e}){let[t,n]=(0,_.useState)(!1);return t?null:(0,k.jsxs)(`div`,{className:`fixed bottom-4');
    console.log('Hid popup ZD');
} else {
    console.log('Popup not found');
}

// 3. Fix "0 products" bug & Category Tabs logic
// In feeb99a, I broke the 'All Products' tab. Let's restore the 'all' category option.
// First, find the default state.
code = code.replace(/\{initialCategory:e=`karak-premium`/, '{initialCategory:e=`all`');
console.log('Set default category to all');

// Next, add the 'All Products' tab back to `Ba` if it's missing!
// Ba=[{id:`karak-premium`,name:`Karak Premium Premix`,count:6},...]
// Actually, let's see how `Ba` is used. The tabs are mapped over `Ba`.
// If `Ba` doesn't have 'all', I'll prepend it.
let baMatch = code.match(/Ba=\[({id:`karak-premium`)/);
if (baMatch) {
    code = code.replace(/Ba=\[\{id:`karak-premium`/, 'Ba=[{id:`all`,name:`All Products`,count:93},{id:`karak-premium`');
    console.log('Added All Products tab back');
}

// 4. Ensure no limit on products shown
// `h=n?m.slice(0,8):m;` -> `h=m;`
if (code.includes('h=n?m.slice(0,8):m;')) {
    code = code.replace('h=n?m.slice(0,8):m;', 'h=m;');
    console.log('Removed 8 product limit');
}

// 5. Hide Explore Button
// We need to hide the Explore Complete Catalog button precisely.
let textIdx = code.indexOf('Explore Complete Catalog');
if (textIdx !== -1) {
    let startIdx = code.lastIndexOf('n&&(0,k.jsx)(`div`,{className:`text-center mt-14`', textIdx);
    let endIdx = code.indexOf('})})', textIdx) + 4;
    if (startIdx !== -1 && endIdx > startIdx) {
        let target = code.substring(startIdx, endIdx);
        code = code.replace(target, 'n&&(0,k.jsx)(`div`,{className:`hidden`})');
        console.log('Hid Explore button precisely');
    }
}

// 6. Visual cleanups on product cards
// Hide highlights
let hlTarget = '(0,k.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:e.highlights.map';
if (code.includes(hlTarget)) {
    code = code.replace(hlTarget, '(0,k.jsx)(`div`,{className:`hidden`,children:e.highlights.map');
    console.log('Hid highlights');
}

// Hide Nectar on product cards
let nectarTarget = 'className:`text-[10px] font-bold uppercase tracking-wider text-[#d92906] bg-red-50 px-2 py-0.5 rounded-full inline-block mb-2`,children:`Experience Nectar in Every Sip`';
if (code.includes(nectarTarget)) {
    code = code.replace(nectarTarget, 'className:`hidden`,children:`Experience Nectar in Every Sip`');
    console.log('Hid Nectar on product cards');
}

// Hide tagline
let taglineTarget = 'className:`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-white/80 shadow-xs backdrop-blur-sm truncate max-w-[85%]`,children:e.tagline';
if (code.includes(taglineTarget)) {
    code = code.replace(taglineTarget, 'className:`hidden`,children:e.tagline');
    console.log('Hid taglines');
}

// Image to object-contain
let coverTarget = 'className:`w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500`';
if (code.includes(coverTarget)) {
    code = code.replace(coverTarget, 'className:`w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500`');
    console.log('Changed to object-contain');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('All changes applied successfully!');
