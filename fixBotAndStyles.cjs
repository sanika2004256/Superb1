const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let imgRegex = /aB=`https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/products\/\$\{e\.id\}\.jpg`/g;
code = code.replace(imgRegex, 'aB=`/images/products/${e.id}.jpg`');

let bgRegex = /backgroundImage:`url\('https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/home_slider\/\$\{e\.id\}\.jpg'\)`/g;
code = code.replace(bgRegex, "backgroundImage:`url('/images/home_slider/${e.id}.jpg')`");

// 5. Hide Taglines on products
let taglineTarget = 'className:`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-white/80 shadow-xs backdrop-blur-sm truncate max-w-[85%]`,children:e.tagline';
code = code.replace(taglineTarget, 'className:`hidden`,children:e.tagline');

// 6. Hide Highlights on products
let highlightsTarget = '(0,k.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:e.highlights.map';
code = code.replace(highlightsTarget, '(0,k.jsx)(`div`,{className:`hidden`,children:e.highlights.map');

// 7. Hide "Experience Nectar" on cards
let tag2 = 'className:`text-[10px] font-bold uppercase tracking-wider text-[#d92906] bg-red-50 px-2 py-0.5 rounded-full inline-block mb-2`,children:`Experience Nectar in Every Sip`';
code = code.replace(tag2, 'className:`hidden`,children:`Experience Nectar in Every Sip`');

// 8. Change image object-cover to object-contain
let imgClass = 'className:`w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500`';
code = code.replace(imgClass, 'className:`w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500`');

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
console.log('Fixed anti-bot images and card styles');
