const fs = require('fs');

function applyChanges() {
    let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

    // 1. Remove 8 product limit
    let hTarget = 'h=n?m.slice(0,8):m;';
    if (code.includes(hTarget)) {
        code = code.replace(hTarget, 'h=m;');
        console.log('Removed 8 product limit.');
    } else {
        console.log('Could not find 8 product limit.');
    }

    // 2. Hide "Explore Complete Catalog" button
    let btnTarget = 'n&&(0,k.jsx)(`div`,{className:`mt-12 sm:mt-16 text-center`,children:(0,k.jsxs)(T,{to:`/products`,onClick:()=>window.scrollTo(0,0),className:`group inline-flex items-center gap-3 bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1`,children:[`Explore Complete Catalog & Commercial Price List (93 SKUs)`,(0,k.jsx)(Sr,{className:`w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform`})]})})';
    if (code.includes(btnTarget)) {
        code = code.replace(btnTarget, 'n&&(0,k.jsx)(`div`,{className:`hidden`})');
        console.log('Hid Explore button.');
    } else {
        console.log('Could not find Explore button.');
    }

    // 3. Hide Factory Popup
    let popupTarget = '(0,k.jsxs)(`div`,{className:`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-bounce-slow`';
    if (code.includes(popupTarget)) {
        code = code.replace(popupTarget, '(0,k.jsxs)(`div`,{className:`hidden`');
        console.log('Hid factory popup.');
    }

    // 4. Update Images to avoid Anti-bot
    let imgRegex = /aB=\`https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/products\/\$\{e\.id\}\.jpg\`/g;
    code = code.replace(imgRegex, 'aB=`/images/products/${e.id}.jpg`');

    let bgRegex = /backgroundImage:\`url\('https:\/\/s3\.ap-south-1\.amazonaws\.com\/graysuit-kuber-dev\/home_slider\/\$\{e\.id\}\.jpg'\)\`/g;
    let newBg = 'backgroundImage:`url(' + "'" + '/images/home_slider/${e.id}.jpg' + "'" + ')`';
    code = code.replace(bgRegex, newBg);
    
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

    // Save
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    console.log('All changes applied successfully!');
}

applyChanges();
