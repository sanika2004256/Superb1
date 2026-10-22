const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = '(0,k.jsx)(`span`,{children:`Enquire Now`})]}),';
const newButton = `(0,k.jsx)(\`span\`,{children:\`Enquire Now\`})]}),(0,k.jsxs)(\`button\`,{type:\`button\`,onClick:()=>{
    let isMr = document.cookie.includes('googtrans=/en/mr');
    let lang = isMr ? 'en' : 'mr';
    let combo = document.querySelector('.goog-te-combo');
    if(combo){
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
    }
},className:\`hidden 2xl:inline-flex items-center gap-1.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-[#d92906] px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate\`,children:[(0,k.jsx)(\`span\`,{children:\`????? / English\`})]}),`;

if (code.includes(target)) {
    code = code.replace(target, newButton);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully added Language Toggle button to navigation!');
} else {
    console.log('Target string not found in index-BM-yEkkk.js');
}
