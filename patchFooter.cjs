const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js')
];

// Corrected new footer function
const newFooterFunc = `function XD({onOpenEnquiry:e}){return(0,k.jsxs)(\`footer\`,{className:\`bg-[#0b0f19] text-slate-300 pt-10 sm:pt-12 pb-6 border-t border-slate-800 relative overflow-hidden\`,children:[(0,k.jsx)(\`div\`,{className:\`absolute top-0 right-1/3 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none\`}),(0,k.jsx)(\`div\`,{className:\`absolute bottom-0 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none\`}),(0,k.jsxs)(\`div\`,{className:\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\`,children:[(0,k.jsxs)(\`div\`,{className:\`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-slate-800/80\`,children:[(0,k.jsxs)(\`div\`,{className:\`lg:col-span-7 space-y-4 max-w-xl\`,children:[(0,k.jsx)(T,{to:\`/\`,className:\`inline-block group\`,children:(0,k.jsx)(\`img\`,{src:\`/images/logo.png\`,alt:\`Superb MegaCorp Logo\`,className:\`h-9 sm:h-10 w-auto object-contain brightness-0 invert opacity-95 transition-transform\`})}),(0,k.jsx)(\`p\`,{className:\`text-xs text-slate-400 leading-relaxed\`,children:\`Superb Mega Corporation is one of India's most trusted multi-sector business conglomerates. Spearheading innovation across FSSAI-certified instant premixes, Amruttulya tea cafe franchising, precision agro machinery, and international fruit exports.\`}),(0,k.jsxs)(\`div\`,{className:\`grid grid-cols-2 gap-2 pt-1 text-[10px] sm:text-[11px] font-semibold text-slate-300\`,children:[(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg\`,children:[(0,k.jsx)(oa,{className:\`w-3.5 h-3.5 text-[#5cba3c] shrink-0\`}),(0,k.jsx)(\`span\`,{children:\`FSSAI Certified Unit\`})]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg\`,children:[(0,k.jsx)(Qr,{className:\`w-3.5 h-3.5 text-blue-400 shrink-0\`}),(0,k.jsx)(\`span\`,{children:\`GlobalGAP Export\`})]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg\`,children:[(0,k.jsx)(wr,{className:\`w-3.5 h-3.5 text-amber-400 shrink-0\`}),(0,k.jsx)(\`span\`,{children:\`Sangli MIDC Plant\`})]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg\`,children:[(0,k.jsx)(Ta,{className:\`w-3.5 h-3.5 text-emerald-400 shrink-0\`}),(0,k.jsx)(\`span\`,{children:\`40,000+ Acres Farm\`})]})]})]}),(0,k.jsxs)(\`div\`,{className:\`lg:col-span-5 space-y-3.5 max-w-md lg:ml-auto w-full\`,children:[(0,k.jsxs)(\`h4\`,{className:\`text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-serif flex items-center gap-1.5\`,children:[(0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full bg-[#5cba3c]\`}),(0,k.jsx)(\`span\`,{children:\`Commercial Desk\`})]}),(0,k.jsxs)(\`div\`,{className:\`space-y-2.5 text-xs text-slate-400\`,children:[(0,k.jsxs)(\`div\`,{className:\`flex items-start gap-2.5\`,children:[(0,k.jsx)(Si,{className:\`w-4 h-4 text-[#d92906] shrink-0 mt-0.5\`}),(0,k.jsxs)(\`div\`,{className:\`space-y-0.5\`,children:[(0,k.jsx)(\`a\`,{href:\`https://www.google.com/maps/search/?api=1&query=Survey+No.655%2F2%2C+Pune+Bangalore+Highway%2C+Nerle%2C+Sangli%2C+Maharashtra\`,target:\`_blank\`,rel:\`noopener noreferrer\`,className:\`text-slate-200 font-medium hover:text-[#5cba3c] transition-colors inline-block text-[11px] sm:text-xs\`,title:\`Open Sangli HQ on Google Maps\`,children:O.contact.addressLine1}),(0,k.jsxs)(\`p\`,{className:\`text-[11px] sm:text-xs\`,children:[O.contact.addressLine2,\`, \`,O.contact.addressCityState]}),(0,k.jsxs)(\`p\`,{className:\`text-[10px] sm:text-[11px] text-slate-500 pt-0.5\`,children:[(0,k.jsx)(\`strong\`,{children:\`Pune Desk:\`}),\` \`,(0,k.jsx)(\`a\`,{href:\`https://www.google.com/maps/search/?api=1&query=Khed+Shivapur%2C+Pune%2C+Maharashtra+412205\`,target:\`_blank\`,rel:\`noopener noreferrer\`,className:\`hover:text-amber-300 transition-colors\`,title:\`Open Pune Office on Google Maps\`,children:O.contact.puneOffice})]})]})]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-2.5\`,children:[(0,k.jsx)(Ii,{className:\`w-4 h-4 text-[#d92906] shrink-0\`}),(0,k.jsxs)(\`div\`,{className:\`flex items-baseline gap-2\`,children:[(0,k.jsx)(\`a\`,{href:\`tel:\${O.contact.tollFreeRaw}\`,className:\`text-white hover:text-amber-300 font-bold text-xs sm:text-sm\`,children:O.contact.tollFree}),(0,k.jsx)(\`span\`,{className:\`text-[10px] sm:text-[11px] text-slate-500\`,children:\`Toll-Free All India\`})]})]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-2.5\`,children:[(0,k.jsx)(bi,{className:\`w-4 h-4 text-[#d92906] shrink-0\`}),(0,k.jsx)(\`a\`,{href:\`mailto:\${O.contact.email}\`,className:\`hover:text-white text-xs text-slate-300 transition-colors\`,children:O.contact.email})]}),(0,k.jsx)(\`div\`,{className:\`pt-1.5\`,children:(0,k.jsx)(\`button\`,{onClick:e,className:\`w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md hover:shadow-red-600/30\`,children:\`Send Commercial Enquiry\`})})]})]})]}),(0,k.jsxs)(\`div\`,{className:\`pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500\`,children:[(0,k.jsxs)(\`div\`,{children:[\`© \`,new Date().getFullYear(),\` Superbmegacorp. All Rights Reserved.\`]}),(0,k.jsxs)(\`div\`,{className:\`flex items-center gap-3 sm:gap-4\`,children:[(0,k.jsx)(\`span\`,{className:\`hover:text-slate-300 transition-colors cursor-pointer\`,children:\`Privacy Policy\`}),(0,k.jsx)(\`span\`,{children:\`•\`}),(0,k.jsx)(\`span\`,{className:\`hover:text-slate-300 transition-colors cursor-pointer\`,children:\`Terms & Conditions\`}),(0,k.jsx)(\`span\`,{children:\`•\`}),(0,k.jsx)(\`span\`,{className:\`hover:text-slate-300 transition-colors cursor-pointer\`,children:\`FSSAI Compliance\`}),(0,k.jsxs)(\`button\`,{onClick:()=>{window.scrollTo({top:0,behavior:\`smooth\`})},className:\`ml-2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-[#d92906] text-slate-400 hover:text-white border border-slate-800 transition-all flex items-center gap-1 cursor-pointer\`,"aria-label":\`Scroll to top\`,children:[(0,k.jsx)(gr,{className:\`w-3 h-3\`}),(0,k.jsx)(\`span\`,{className:\`text-[10px] font-semibold hidden sm:inline\`,children:\`Top\`})]})]})]})]})]})} `;

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');
  const funcStart = code.indexOf('function XD(');
  if (funcStart === -1) {
    console.error('function XD( not found in:', filePath);
    process.exit(1);
  }
  const nextFunc = code.indexOf('function ', funcStart + 10);
  if (nextFunc === -1) {
    console.error('next function after XD not found in:', filePath);
    process.exit(1);
  }

  // Backup file
  fs.writeFileSync(filePath + '.bak_' + Date.now(), code, 'utf8');

  // Replace XD function
  code = code.substring(0, funcStart) + newFooterFunc.trim() + ' ' + code.substring(nextFunc);

  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
