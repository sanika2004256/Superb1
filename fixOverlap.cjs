const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v14'));
if (!f) throw new Error("Could not find index-v14.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// Hide badge on mobile to prevent overlap with favorite icon
code = code.replace('className:`absolute top-3 left-3 bg-white/95 backdrop-blur-xs', 'className:`hidden sm:block absolute top-3 left-3 bg-white/95 backdrop-blur-xs');

// Also, let's make the heart icon slightly smaller on mobile, and the 1 KG badge slightly smaller
// Heart container: className:`absolute top-3 right-3 flex items-center gap-1.5`
code = code.replace('className:`absolute top-3 right-3 flex items-center gap-1.5`', 'className:`absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5`');

// 1 KG badge: text-[10px] -> text-[9px] sm:text-[10px], px-2.5 -> px-1.5 sm:px-2.5
code = code.replace('text-white text-[10px] font-bold px-2.5 py-1', 'text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1');

// Show Back button: hide on mobile
code = code.replace('className:`absolute bottom-3 right-3 bg-white/90', 'className:`hidden sm:flex absolute bottom-3 right-3 bg-white/90');

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('Fixed overlap!');
