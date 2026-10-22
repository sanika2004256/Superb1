const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v12'));
if (!f) throw new Error("Could not find index-v12.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Grid layout: change back to grid-cols-2 on mobile!
code = code.replace('className:`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`', 'className:`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6`');

// 2. Product Card Container
code = code.replace('className:`group bg-white rounded-3xl overflow-hidden', 'className:`group bg-white rounded-xl sm:rounded-3xl overflow-hidden');

// 3. Image Container Height
code = code.replace('className:`relative h-60 bg-gradient-to-b', 'className:`relative h-32 sm:h-60 bg-gradient-to-b');
// Also reduce padding in image container
code = code.replace('to-slate-50 p-4 flex items-center', 'to-slate-50 p-2 sm:p-4 flex items-center');

// 4. Content Padding
code = code.replace('className:`p-4 sm:p-5 sm:pb-4`', 'className:`p-2 sm:p-5 sm:pb-4`');

// 5. Hide SKU badge container on mobile
code = code.replace('className:`mb-2 flex items-start justify-between gap-2`', 'className:`hidden sm:flex mb-2 items-start justify-between gap-2`');

// 6. Title font size
code = code.replace('className:`font-bold text-slate-800 text-base sm:text-lg mb-1 leading-snug line-clamp-2`', 'className:`font-bold text-slate-800 text-xs sm:text-lg mb-0.5 sm:mb-1 leading-tight line-clamp-2`');

// 7. Subtitle font size
code = code.replace('className:`text-xs sm:text-sm text-slate-500 line-clamp-1 uppercase tracking-wide font-medium`', 'className:`text-[9px] sm:text-sm text-slate-500 line-clamp-1 uppercase tracking-wide font-medium`');

// 8. Footer Padding
code = code.replace('className:`px-4 sm:px-5 pb-5 mt-auto`', 'className:`px-2 sm:px-5 pb-2 sm:pb-5 mt-auto`');

// 9. Price Box
code = code.replace('className:`flex items-end justify-between mb-4 bg-slate-50 p-2 sm:p-3 rounded-2xl border border-slate-100`', 'className:`flex flex-col sm:flex-row sm:items-end justify-between mb-2 sm:mb-4 bg-transparent sm:bg-slate-50 p-0 sm:p-3 rounded-none sm:rounded-2xl border-0 sm:border sm:border-slate-100`');

// 10. Price Text
code = code.replace('className:`text-xl sm:text-2xl font-bold text-[#d92906] flex items-baseline gap-0.5`', 'className:`text-sm sm:text-2xl font-bold text-[#d92906] flex items-baseline gap-0.5`');
code = code.replace('className:`text-xs text-slate-500 font-semibold mb-1`', 'className:`text-[9px] sm:text-xs text-slate-500 font-semibold mb-0 sm:mb-1`');

// 11. Add to Cart Button wrapper
code = code.replace('className:`space-y-2 sm:space-y-2.5`', 'className:`space-y-1 sm:space-y-2.5`');

// 12. Add to Cart Button inner
code = code.replace('className:`w-full py-2.5 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${', 'className:`w-full py-1.5 px-2 sm:py-2.5 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-base font-bold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 ${');

// 13. Details & Enquire Footer
code = code.replace('className:`flex items-center justify-between mt-3 pt-3 border-t border-slate-100`', 'className:`hidden sm:flex items-center justify-between mt-3 pt-3 border-t border-slate-100`');

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('Mobile product card compacted!');
