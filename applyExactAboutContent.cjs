const fs = require('fs');
const acorn = require('acorn');

const newJO = 'function jO({onOpenEnquiry:e}){return(0,k.jsx)("div",{className:"pt-24 sm:pt-28 pb-20 bg-white min-h-screen",children:(0,k.jsxs)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16",children:[(0,k.jsxs)("div",{className:"space-y-5",children:[(0,k.jsx)("h1",{className:"text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight",children:"Our Journey"}),(0,k.jsxs)("div",{className:"space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed",children:[(0,k.jsx)("p",{children:"SUPERB Mega Corporation’s journey began as a small owned company founded by the vision of directors. From this humble beginning, they expanded their business in many sectors like Manufacturing, Service, Food & beverages products. The first plant of instant premix manufacturing was set up in Sangli, Maharashtra. Over the period of time, the corporation successfully diversified in other sectors like agricultural equipment and pomegranate export. In 2016, the farmers network has grown to 4000-acre farmland under cultivation which can fulfill the demand of buyers worldwide with ease. SUPERB Mega Corporation became India’s leading business conglomerate within just 2 years."}),(0,k.jsx)("p",{children:"With leaps and bounds, the SUPERB Mega Corporation has already come a long way making a Global Impact with the establishment of business in Saudi Arabia, UAE, USA & Netherlands."})]})]}),(0,k.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",children:[(0,k.jsxs)("div",{className:"bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-red-100 shadow-xs hover:shadow-md transition-all flex items-start gap-4 sm:gap-5",children:[(0,k.jsx)("div",{className:"w-12 h-12 rounded-2xl bg-red-50 text-[#d92906] flex items-center justify-center shrink-0 border border-red-100",children:(0,k.jsx)(Kr,{className:"w-6 h-6"})}),(0,k.jsxs)("div",{className:"space-y-2",children:[(0,k.jsx)("h3",{className:"text-xl sm:text-2xl font-bold text-slate-900",children:"Vision"}),(0,k.jsx)("p",{className:"text-slate-600 text-xs sm:text-sm leading-relaxed",children:"To be an impeccable Corporation, upholding the values of management team. To thrive and understand the market trends to grow our business and upgrade accordingly to move swiftly in the future."})]})]}),(0,k.jsxs)("div",{className:"bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-start gap-4 sm:gap-5",children:[(0,k.jsx)("div",{className:"w-12 h-12 rounded-2xl bg-red-50 text-[#d92906] flex items-center justify-center shrink-0 border border-red-100",children:(0,k.jsx)(ya,{className:"w-6 h-6"})}),(0,k.jsxs)("div",{className:"space-y-2",children:[(0,k.jsx)("h3",{className:"text-xl sm:text-2xl font-bold text-slate-900",children:"Mission"}),(0,k.jsx)("p",{className:"text-slate-600 text-xs sm:text-sm leading-relaxed",children:"To develop & supply innovative products to enhance the quality of life of our society. To achieve absolute growth through continuous improvements & deliver a consistent experience to our network of clients"})]})]})]}),(0,k.jsxs)("div",{className:"space-y-5 pt-4",children:[(0,k.jsx)("h2",{className:"text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight",children:"Our Pillars"}),(0,k.jsx)("p",{className:"text-slate-700 text-sm sm:text-base leading-relaxed",children:"Our team members are the pillars of our corporation. We have a fantastic team of experts from vivid domains of agriculture, engineering, and pharmaceutical. Their knowledge & skills"}),(0,k.jsx)("div",{className:"rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white mt-6 max-w-4xl",children:(0,k.jsx)("img",{src:"/images/management/directors_leadership.png",alt:"Our Pillars - Board of Directors",className:"w-full h-auto object-cover object-center"})})]})]})})}';

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const jOStart = content.indexOf('function jO({onOpenEnquiry:e}){');
  const jOEnd = content.indexOf('function MO({onOpenEnquiry:e}){', jOStart);
  if (jOStart === -1 || jOEnd === -1) {
    console.log('Could not find function jO in', filePath);
    return;
  }

  content = content.substring(0, jOStart) + newJO + content.substring(jOEnd);

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Syntax error parsing patched file:', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}
