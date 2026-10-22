const fs = require('fs');

let file = 'public/assets/' + fs.readdirSync('public/assets').find(f => f.startsWith('index-v8'));
let code = fs.readFileSync(file, 'utf8');

// Hide Explore Button
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

fs.writeFileSync(file, code);
fs.writeFileSync(file.replace('public/assets/', 'assets/'), code);
console.log('Applied visual changes.');
