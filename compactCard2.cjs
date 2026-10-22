const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v13'));
if (!f) throw new Error("Could not find index-v13.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Content Padding
code = code.replace('className:`p-5 space-y-2.5`', 'className:`p-2 sm:p-5 space-y-1 sm:space-y-2.5`');

// 2. SKU Container (hide on mobile)
code = code.replace('className:`flex items-center justify-between gap-2 text-xs`', 'className:`hidden sm:flex items-center justify-between gap-2 text-xs`');

// 3. Title font size (make text-xs on mobile)
code = code.replace('className:`block text-base font-bold text-slate-900 group-hover:text-[#d92906] transition-colors leading-snug line-clamp-2 font-serif cursor-pointer`', 'className:`block text-[11px] sm:text-base font-bold text-slate-900 group-hover:text-[#d92906] transition-colors leading-tight sm:leading-snug line-clamp-2 font-serif cursor-pointer`');

// 4. Subtitle font size (hide on mobile or make very small)
code = code.replace('className:`text-xs text-slate-500 line-clamp-2 leading-relaxed`', 'className:`hidden sm:block text-xs text-slate-500 line-clamp-2 leading-relaxed`');

// 5. MRP Box (remove border on mobile, adjust padding)
code = code.replace('className:`pt-2 border-t border-slate-100 flex items-baseline justify-between gap-2`', 'className:`pt-1 sm:pt-2 sm:border-t sm:border-slate-100 flex items-baseline justify-between gap-1 sm:gap-2`');

// 6. MRP Price size
code = code.replace('className:`text-xl font-extrabold text-[#d92906]`', 'className:`text-sm sm:text-xl font-extrabold text-[#d92906]`');

// 7. Footer Padding
code = code.replace('className:`p-5 pt-0 flex flex-col gap-2 border-t border-slate-100 mt-2`', 'className:`p-2 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-2 sm:border-t sm:border-slate-100 mt-1 sm:mt-2`');

// 8. Add to Cart button
code = code.replace('className:`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white`', 'className:`w-full py-1.5 px-2 sm:py-2.5 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1 sm:gap-2 cursor-pointer bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white`');

// 9. Details/Enquire buttons (hide on mobile)
code = code.replace('className:`flex items-center justify-between gap-2 pt-1 text-xs`', 'className:`hidden sm:flex items-center justify-between gap-2 pt-1 text-xs`');

// Check if successful
const checks = [
  'className:`p-2 sm:p-5 space-y-1 sm:space-y-2.5`',
  'className:`hidden sm:flex items-center justify-between gap-2 text-xs`',
  'className:`block text-[11px] sm:text-base',
  'className:`hidden sm:block text-xs text-slate-500',
  'className:`text-sm sm:text-xl font-extrabold text-[#d92906]`'
];

let failed = false;
for (const check of checks) {
  if (!code.includes(check)) {
    console.error("Failed to replace:", check);
    failed = true;
  }
}

if (!failed) {
    fs.writeFileSync(filePath, code);
    fs.writeFileSync('assets/' + f, code);
    console.log('Mobile product card truly compacted!');
}
