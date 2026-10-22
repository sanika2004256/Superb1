const fs = require('fs');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove 8 product limit on Home Page
let limitTarget = 'h=n?m.slice(0,8):m;';
if (code.includes(limitTarget)) {
    code = code.replace(limitTarget, 'h=m;');
    console.log('Removed 8 product limit.');
} else {
    console.log('Limit target not found!');
}

// 2. Hide Explore Button
let exploreTarget = 'n&&(0,k.jsx)(`div`,{className:`mt-8 sm:mt-12 text-center`,children:(0,k.jsxs)(`a`,{href:`/products`,className:`inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all`,children:[(0,k.jsxs)(`span`,{children:[`Explore Complete Catalog & Commercial Price List (`,Ha.length,` SKUs)`]}),(0,k.jsx)(mr,{className:`w-4 h-4 text-amber-400`})]})})';
if (code.includes(exploreTarget)) {
    code = code.replace(exploreTarget, 'n&&(0,k.jsx)(`div`,{className:`hidden`})');
    console.log('Hid Explore button.');
} else {
    console.log('Explore button target not found!');
}

// 3. Fix Anti-Bot Images
let imgRegex = /aB=`https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/products\/\$\{e\.id\}\.jpg`/g;
code = code.replace(imgRegex, 'aB=`/images/products/${e.id}.jpg`');

let bgRegex = /backgroundImage:`url\('https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/home_slider\/\$\{e\.id\}\.jpg'\)`/g;
code = code.replace(bgRegex, "backgroundImage:`url('/images/home_slider/${e.id}.jpg')`");
console.log('Fixed Anti-Bot Images.');

// 4. Clean up Product Cards (Hide taglines, highlights, nectars, object-contain)
let taglineTarget = 'className:`text-[11px] font-bold px-2.5 py-1 rounded-full border bg-white/80 shadow-xs backdrop-blur-sm truncate max-w-[85%]`,children:e.tagline';
if (code.includes(taglineTarget)) {
    code = code.replace(taglineTarget, 'className:`hidden`,children:e.tagline');
    console.log('Hid taglines.');
}

let highlightsTarget = '(0,k.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:e.highlights.map';
if (code.includes(highlightsTarget)) {
    code = code.replace(highlightsTarget, '(0,k.jsx)(`div`,{className:`hidden`,children:e.highlights.map');
    console.log('Hid highlights.');
}

let nectarTarget = 'className:`text-[10px] font-bold uppercase tracking-wider text-[#d92906] bg-red-50 px-2 py-0.5 rounded-full inline-block mb-2`,children:`Experience Nectar in Every Sip`';
if (code.includes(nectarTarget)) {
    code = code.replace(nectarTarget, 'className:`hidden`,children:`Experience Nectar in Every Sip`');
    console.log('Hid nectar.');
}

let imgClass = 'className:`w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500`';
if (code.includes(imgClass)) {
    code = code.replace(imgClass, 'className:`w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500`');
    console.log('Changed image to object-contain.');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
console.log('Done!');
