const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'className:`hidden sm:inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-[#d92906] px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate`';
const replacement = 'className:`inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-[#d92906] px-2 py-1.5 xl:px-4 xl:py-2 rounded-xl text-[10px] sm:text-xs xl:text-[13px] font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate`';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully made button visible on mobile!');
} else {
    console.log('Target string not found for mobile patch');
}
