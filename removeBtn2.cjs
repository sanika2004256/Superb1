const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let target = `,(0,k.jsxs)(\`button\`,{type:\`button\`,onClick:()=>{
    let isMr = document.cookie.includes('googtrans=/en/mr');
    let lang = isMr ? 'en' : 'mr';
    let combo = document.querySelector('.goog-te-combo');
    if(combo){
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
    }
},className:\`hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold shadow-xs hover:shadow-red-600/30 transition-all cursor-pointer shrink-0 whitespace-nowrap notranslate\`,children:[(0,k.jsx)(\`span\`,{children:\`????? / English\`})]})`;

if (code.includes(target)) {
    code = code.replace(target, '');
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Button perfectly removed!");
} else {
    // try removing newlines
    let targetNoSpaces = target.replace(/\s+/g, '');
    let codeNoSpaces = code.replace(/\s+/g, '');
    if (codeNoSpaces.includes(targetNoSpaces)) {
        console.log("Match found ignoring spaces, but exact replace failed.");
    } else {
        console.log("Target not found at all");
    }
}
