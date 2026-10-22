const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove the text by making the heading hidden
let targetStr = 'children:`A Leading Business Conglomerate Delivering Value Around The Globe`';
if (code.includes(targetStr)) {
    code = code.replace(targetStr, 'className:`hidden`');
    console.log('Heading hidden');
} else {
    console.log('Target string not found');
}

// 2. The previous command already reduced the gap on mobile (gap-12 to gap-6).
// Let's verify if gap-6 is there, if not, do it.
if (code.includes('gap-12 lg:gap-16')) {
    code = code.replace(/gap-12 lg:gap-16/g, 'gap-6 lg:gap-16');
    console.log('Reduced grid gap on mobile');
}

if (code.includes('relative py-4 sm:py-0')) {
    code = code.replace(/relative py-4 sm:py-0/g, 'relative sm:py-0');
    console.log('Removed py-4 on mobile image container');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
console.log('Done');
