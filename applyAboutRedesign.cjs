const fs = require('fs');
const acorn = require('acorn');

const newJO = `function jO({onOpenEnquiry:e}){let t=[{id:"fssai",title:"FSSAI Certified Quality",desc:"100% compliant with premier food safety and hygiene benchmarks, ensuring purity in every batch.",icon:Hr,color:"text-emerald-600 bg-emerald-50 border-emerald-100"},{id:"facility",title:"State-of-the-Art Plant",desc:"Modern manufacturing & packaging facility in Sangli, Maharashtra, purpose-built for scale and freshness.",icon:ni,color:"text-red-600 bg-red-50 border-red-100"},{id:"global",title:"Global Supply Reach",desc:"Trusted distribution partnerships across India, UAE, Netherlands, Saudi Arabia, and the USA.",icon:ci,color:"text-blue-600 bg-blue-50 border-blue-100"},{id:"trust",title:"Reliable B2B Partnership",desc:"Transparent commercial trade terms, swift dispatch cycles, and dedicated distributor support.",icon:ui,color:"text-amber-600 bg-amber-50 border-amber-100"}];return(0,k.jsxs)("div",{className:"pt-20 sm:pt-24 bg-slate-50 min-h-screen",children:[(0,k.jsx)("section",{className:"bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/80 py-12 sm:py-16",children:(0,k.jsxs)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4",children:[(0,k.jsx)("span",{className:"text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs",children:"About Superb Mega Corp"}),(0,k.jsx)("h1",{className:"text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-slate-900 leading-tight",children:"Pioneering Commercial Solutions Since 2010"}),(0,k.jsx)("p",{className:"text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto",children:"Superb Mega Corporation is a premier Indian business conglomerate specializing in FSSAI-certified instant tea and coffee premixes, advanced food processing, and trusted commercial supply networks across four continents."}),(0,k.jsx)("div",{className:"pt-2 flex items-center justify-center gap-3",children:(0,k.jsxs)("button",{onClick:e,className:"bg-[#d92906] hover:bg-[#b91c1c] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2",children:[(0,k.jsx)("span",{children:"Partner With Us"}),(0,k.jsx)(mr,{className:"w-4 h-4"})]})})]})}),(0,k.jsx)("section",{className:"py-12 sm:py-16",children:(0,k.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,k.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",children:[(0,k.jsxs)("div",{className:"bg-white p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden group",children:[(0,k.jsx)("div",{className:"w-12 h-12 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center shrink-0 border border-red-100/80",children:(0,k.jsx)(ya,{className:"w-6 h-6"})}),(0,k.jsx)("h3",{className:"text-xl sm:text-2xl font-bold font-serif text-slate-900",children:"Our Mission"}),(0,k.jsx)("p",{className:"text-slate-600 text-xs sm:text-sm leading-relaxed",children:"To develop and supply innovative, high-grade instant beverage solutions that enhance quality of life, delivering consistent authentic taste, absolute hygiene, and superior commercial value to our clients worldwide."})]}),(0,k.jsxs)("div",{className:"bg-white p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden group",children:[(0,k.jsx)("div",{className:"w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80",children:(0,k.jsx)(Kr,{className:"w-6 h-6"})}),(0,k.jsx)("h3",{className:"text-xl sm:text-2xl font-bold font-serif text-slate-900",children:"Our Vision"}),(0,k.jsx)("p",{className:"text-slate-600 text-xs sm:text-sm leading-relaxed",children:"To be an internationally recognized corporation upholding integrity, technological advancement, and sustainable growth, continuously adapting to modern consumer trends while setting industry benchmarks."})]})]})})}),(0,k.jsx)("section",{className:"pb-16 sm:pb-20",children:(0,k.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,k.jsxs)("div",{className:"text-center max-w-2xl mx-auto mb-10 space-y-2",children:[(0,k.jsx)("span",{className:"text-[#d92906] font-bold text-xs uppercase tracking-wider block",children:"Core Strengths"}),(0,k.jsx)("h2",{className:"text-2xl sm:text-3xl font-extrabold font-serif text-slate-900",children:"Why Choose Us"}),(0,k.jsx)("p",{className:"text-slate-500 text-xs sm:text-sm",children:"Dedicated to commercial excellence, reliability, and authentic taste in every cup."})]}),(0,k.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:t.map(e=>(0,k.jsx)("div",{className:"bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-red-200 transition-all duration-300 flex flex-col justify-between group",children:(0,k.jsxs)("div",{className:"space-y-3",children:[(0,k.jsx)("div",{className:"w-10 h-10 rounded-xl " + e.color + " border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",children:(0,k.jsx)(e.icon,{className:"w-5 h-5"})}),(0,k.jsx)("h4",{className:"font-bold text-slate-900 text-sm font-serif",children:e.title}),(0,k.jsx)("p",{className:"text-xs text-slate-600 leading-relaxed",children:e.desc})]})},e.id))})]})})]})}`;

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Desktop About Us dropdown replacement (remove Company Overview dropdown)
  const coIdx = content.indexOf('Company Overview');
  if (coIdx !== -1) {
    const dStart = content.lastIndexOf('(0,k.jsxs)(`div`,{ref:', coIdx);
    const dEnd = content.indexOf('(0,k.jsx)(T,{to:`/products`', coIdx);
    if (dStart !== -1 && dEnd !== -1) {
      const desktopCleanLink = '(0,k.jsx)(T,{to:`/about`,className:ye(ue),children:(0,k.jsx)(`span`,{children:`About Us`})}),';
      content = content.substring(0, dStart) + desktopCleanLink + content.substring(dEnd);
      console.log('Replaced Desktop About Us dropdown in', filePath);
    }
  }

  // 2. Mobile About Us accordion replacement
  const mIdx = content.indexOf('be.map');
  if (mIdx !== -1) {
    const mStart = content.lastIndexOf('(0,k.jsxs)(`div`,{children:[(0,k.jsxs)(`button`', mIdx);
    const mEnd = content.indexOf('(0,k.jsx)(T,{to:`/products`', mIdx);
    if (mStart !== -1 && mEnd !== -1) {
      const mobileCleanLink = '(0,k.jsx)(T,{to:`/about`,onClick:()=>i(!1),className:`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${ue?`text-[#d92906] bg-red-50 font-bold`:`text-slate-800 hover:bg-slate-50`}`,children:(0,k.jsx)(`span`,{children:`About Us`})}),';
      content = content.substring(0, mStart) + mobileCleanLink + content.substring(mEnd);
      console.log('Replaced Mobile About Us accordion in', filePath);
    }
  }

  // 3. Replace function jO with new redesigned About page component
  const jOStart = content.indexOf('function jO({onOpenEnquiry:e}){');
  const jOEnd = content.indexOf('function MO({onOpenEnquiry:e}){', jOStart);
  if (jOStart !== -1 && jOEnd !== -1) {
    content = content.substring(0, jOStart) + newJO + content.substring(jOEnd);
    console.log('Replaced function jO in', filePath);
  }

  // Validate syntax with acorn
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Syntax error when parsing patched code for', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patch(p);
}
