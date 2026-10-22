const fs = require('fs');
let f = 'public/assets/index-v20-1790395955858.js';
let code = fs.readFileSync(f, 'utf8');

code = code.replace(/h-\[320px\] sm:h-\[600px\] lg:h-\[640px\]/g, 'hero-height');
code = code.replace(/bg-black\/30/g, 'hero-mobile-bg');
code = code.replace(/text-3xl sm:text-4xl/g, 'text-2xl sm:text-4xl');
code = code.replace(/text-base sm:text-lg md:text-xl/g, 'text-sm sm:text-lg md:text-xl');

fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
fs.unlinkSync(f);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/index-v20-1790395955858\.js/g, 'index-v21-1790395955858.js');
fs.writeFileSync('index.html', html);

console.log("Updated JS and HTML successfully.");
