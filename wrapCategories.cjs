const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Replace overflow-x-auto with flex-wrap for the categories container
let target = 'flex items-center gap-1.5 overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';
let replacement = 'flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:overflow-x-auto py-0.5 scroll-smooth flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    console.log('Categories container now wraps on mobile');
} else {
    console.log('Container target not found!');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
