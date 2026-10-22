const fs = require('fs');
let file = fs.readdirSync('public/assets').find(f => f.startsWith('index-v18'));
let code = fs.readFileSync('public/assets/' + file, 'utf8');

// 1. Hide Wishlist on mobile
let wlTarget = 'className:`relative p-2 rounded-xl text-slate-700 hover:text-[#d92906] hover:bg-slate-100 transition-colors shrink-0`,"aria-label":`Wishlist`';
if (code.includes(wlTarget)) {
    code = code.replace(wlTarget, 'className:`hidden sm:flex relative p-2 rounded-xl text-slate-700 hover:text-[#d92906] hover:bg-slate-100 transition-colors shrink-0`,"aria-label":`Wishlist`');
} else {
    console.log("Could not find Wishlist");
}

// 2. Hide Account on mobile
let acTarget = '(0,k.jsx)(`div`,{ref:te,className:`relative shrink-0`,children:oe?(0,k.jsxs)(`div`';
if (code.includes(acTarget)) {
    code = code.replace(acTarget, '(0,k.jsx)(`div`,{ref:te,className:`hidden sm:block relative shrink-0`,children:oe?(0,k.jsxs)(`div`');
} else {
    console.log("Could not find Account");
}

// 3. Make Search icon smaller on mobile maybe? It's w-4.5 h-4.5 which is fine.
// What about the Logo? On very small screens, maybe it needs to shrink more?
// 'className:`h-8 sm:h-9 xl:h-10 w-auto min-w-[120px] sm:min-w-[135px]'
// Actually 120px is fine.

fs.writeFileSync('public/assets/' + file, code);
console.log('Mobile nav updated!');
