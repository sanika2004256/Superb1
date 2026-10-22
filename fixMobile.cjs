const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v10'));
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix grid-cols-1 to grid-cols-2
let gridTarget = 'className:`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`';
if (code.includes(gridTarget)) {
    code = code.replace(gridTarget, 'className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6`');
    console.log('Fixed product grid to grid-cols-2!');
} else {
    console.log('Grid target NOT FOUND!');
}

// 2. Disable IntersectionObserver animations by making them visible by default
let animationTarget = 'function oO({children:e,animation:t=`fade-up`,delay:n=0,duration:r=600,className:i=``,threshold:a=.12}){let[o,s]=(0,_.useState)(!1)';
if (code.includes(animationTarget)) {
    code = code.replace(animationTarget, 'function oO({children:e,animation:t=`fade-up`,delay:n=0,duration:r=600,className:i=``,threshold:a=.12}){let[o,s]=(0,_.useState)(!0)');
    console.log('Disabled scroll animations (everything visible immediately)!');
} else {
    console.log('Animation target NOT FOUND!');
}

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('All fixes applied successfully.');
