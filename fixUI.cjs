const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Replace standard input classes
code = code.replace(/w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all/g, 
"w-full px-5 py-3.5 rounded-2xl border-0 bg-slate-50/50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)] text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d92906] focus:bg-white transition-all");

// Replace select classes
code = code.replace(/w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-\[#d92906\] focus:border-transparent transition-all/g,
"w-full px-5 py-3.5 rounded-2xl border-0 bg-slate-50/50 shadow-[inset_0_2px_6px_rgba(0,0,0,0.04)] text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d92906] focus:bg-white transition-all cursor-pointer");

// Replace submit button
code = code.replace(/w-full bg-\[#d92906\] hover:bg-\[#b91c1c\] text-white py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-red-600\/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50/g,
"w-full bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50");

// Also replace the form container box
code = code.replace(/bg-white rounded-3xl p-8 sm:p-10 border border-slate-200\/90 shadow-xl card-lift/g,
"bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white shadow-2xl card-lift relative overflow-hidden");

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('UI made modern!');
