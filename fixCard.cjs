const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Hide the Explore button footer container completely.
// Let's replace the whole Explore button Link with 'hidden' class, just to be safe.
// Or replace the pt-4 container:
let footerTarget = 'className:`pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0`';
if (code.includes(footerTarget)) {
    code = code.replace(footerTarget, 'className:`hidden`');
    console.log('Hid card footer (Explore button)');
} else {
    console.log('Footer target not found!');
}

// 2. Adjust Image from object-cover to object-contain
let imgTarget = 'className:`w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500`';
if (code.includes(imgTarget)) {
    code = code.replace(imgTarget, 'className:`w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500`');
    console.log('Changed image to object-contain');
} else {
    console.log('Image target not found!');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
