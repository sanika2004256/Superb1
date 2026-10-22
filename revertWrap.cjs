const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Revert wrap Categories
let wrapTarget = 'flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
if (code.includes(wrapTarget)) {
    code = code.replace(wrapTarget, 'flex items-center gap-1.5 overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden');
    console.log('Reverted flex-wrap to overflow-x-auto');
} else {
    console.log('flex-wrap target not found');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
