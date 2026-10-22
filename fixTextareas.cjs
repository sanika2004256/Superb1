const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Modal textarea
code = code.replace("className:`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d92906]`",
"className:`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d92906] resize-none min-h-[120px]`");

// Contact page textarea
code = code.replace("focus:bg-white transition-all ${l.message?`border-red-400",
"focus:bg-white transition-all resize-none min-h-[140px] ${l.message?`border-red-400");

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('Fixed message box sizes!');
