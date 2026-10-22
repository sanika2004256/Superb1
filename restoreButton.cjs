const fs = require('fs');
let code = fs.readFileSync('public/assets/index-BM-yEkkk.js', 'utf8');

const targetClass = 'className:`hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold shadow-xs hover:shadow-red-600/30 transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate`';
const newClass = 'className:`hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold shadow-xs hover:shadow-red-600/30 transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate`';

if (code.includes(targetClass)) {
    code = code.replace(targetClass, newClass);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Restored Language button with sm:inline-flex!');
} else {
    console.log('Target class not found!');
}
