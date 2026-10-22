const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v16'));
if (!f) throw new Error("Could not find index-v16.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Hero Section Height
code = code.replace(
  'className:`relative w-full h-[540px] sm:h-[600px] lg:h-[640px] overflow-hidden bg-slate-950 select-none`',
  'className:`relative w-full h-[320px] sm:h-[600px] lg:h-[640px] overflow-hidden bg-slate-950 select-none`'
);

// 2. Remove group-hover:scale- animations on mobile
code = code.replace(/group-hover:scale-(\d+)/g, 'sm:group-hover:scale-$1');

// 3. Typography and padding on "Why Choose Superb" (and other sections)
code = code.replace(
  'text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif',
  'text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif'
);

code = code.replace(
  'text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight', // Hero Title
  'text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight'
);

// Card padding in various places
code = code.replace(/p-6 sm:p-8/g, 'p-4 sm:p-8');
code = code.replace(/p-6 sm:p-7/g, 'p-4 sm:p-7');

// Card icon sizes
code = code.replace(/w-12 h-12 sm:w-14 sm:h-14/g, 'w-10 h-10 sm:w-14 sm:h-14');
code = code.replace(/mb-5 sm:mb-6/g, 'mb-3 sm:mb-6');

// "Verified Standard" padding
code = code.replace(/pt-4 mt-auto border-t border-slate-100/g, 'pt-3 sm:pt-4 mt-auto border-t border-slate-100');

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('Mobile view improvements applied!');
