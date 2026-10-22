const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v') && f.endsWith('.js'));
if (!f) throw new Error("Could not find index-v*.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix Stats Section (5 columns into responsive grid)
let statsGridTarget = 'grid grid-cols-5 divide-x divide-slate-100 items-start';
if (code.includes(statsGridTarget)) {
    code = code.replace(statsGridTarget, 'grid grid-cols-2 lg:grid-cols-5 gap-y-6 lg:gap-y-0 lg:divide-x divide-slate-100 items-start');
    console.log('Fixed stats grid columns!');
} else {
    // maybe it was already modified by another script
    let fallbackGridTarget = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-slate-100 items-start';
    if(code.includes(fallbackGridTarget)){
        code = code.replace(fallbackGridTarget, 'grid grid-cols-2 lg:grid-cols-5 gap-y-6 lg:gap-y-0 lg:divide-x divide-slate-100 items-start');
        console.log('Fixed fallback stats grid columns!');
    } else {
        console.log('Stats grid target NOT FOUND!');
    }
}

// 2. Fix Key Specializations ticker on mobile
let tickerContainerTarget = 'w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 flex items-center gap-4';
if (code.includes(tickerContainerTarget)) {
    code = code.replace(tickerContainerTarget, 'w-full max-w-[1560px] 2xl:max-w-[1680px] mx-auto px-2 sm:px-6 lg:px-8 2xl:px-12 flex flex-col sm:flex-row items-center gap-2 sm:gap-4');
    console.log('Fixed ticker container!');
} else {
    console.log('Ticker container NOT FOUND!');
}

let tickerPillTarget = 'flex items-center gap-2 bg-[#d92906] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shrink-0 shadow-xs';
if (code.includes(tickerPillTarget)) {
    code = code.replace(tickerPillTarget, 'flex items-center gap-1.5 sm:gap-2 bg-[#d92906] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0 shadow-xs z-10');
    console.log('Fixed ticker pill!');
} else {
    console.log('Ticker pill NOT FOUND!');
}

// 3. Fix "Board of Directors" spacing and layout if needed
// Let's check for Board of Directors container in the code
let boardTarget = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto';
if (code.includes(boardTarget)) {
    // it's probably fine, but we can make gap smaller on mobile
    code = code.replace(boardTarget, 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto');
    console.log('Fixed board of directors grid gap!');
}

fs.writeFileSync(filePath, code);
try {
    fs.writeFileSync('assets/' + f, code);
} catch(e) {}
try {
    fs.writeFileSync('dist/assets/' + f, code);
} catch(e) {}

console.log('Mobile layout fixes applied.');
