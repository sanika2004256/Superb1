const fs = require('fs');

// 1. Fix index.html
let html = fs.readFileSync('index.html', 'utf8');
if (html.includes('class="bg-slate-50 text-slate-800 antialiased font-sans"')) {
    html = html.replace('class="bg-slate-50 text-slate-800 antialiased font-sans"', 'class="overflow-x-hidden w-full relative bg-slate-50 text-slate-800 antialiased font-sans"');
    fs.writeFileSync('index.html', html);
}

// 2. Fix JS Layout Issues
let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

// Add min-w-0 to marquee container
code = code.replace('className:`relative overflow-hidden w-full flex`', 'className:`relative overflow-hidden w-full flex min-w-0`');

// Fix grid-cols-5 blowout in stats section
code = code.replace('className:`grid grid-cols-5 divide-x divide-slate-100 items-start`', 'className:`grid grid-cols-2 lg:grid-cols-5 divide-x divide-slate-100 items-start`');

fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'assets/index-v21-1790395955858.js');
try { fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'dist/assets/index-v21-1790395955858.js'); } catch(e){}

console.log('Restored critical layout fixes!');
