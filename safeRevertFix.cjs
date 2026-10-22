const fs = require('fs');
let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

// 1. Vizuki Unsplash Image
code = code.replace('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', '/images/vizuki_field.jpg');

// 2. Vizuki Machine in About Us (Safely)
const aboutTarget = 'O.aboutStory.internationalPresence})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button`';
const aboutReplace = 'O.aboutStory.internationalPresence})]}),(0,k.jsx)(`img`,{src:`/images/vizuki_machine.png`,alt:`Vizuki Machine`,className:`w-full max-w-sm mx-auto mt-8 lg:mt-12 rounded-2xl shadow-xl border border-slate-200`}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button`';
if(code.includes(aboutTarget)) code = code.replace(aboutTarget, aboutReplace);

// 3. Keep Original Images, but make them bg-contain on mobile so they NEVER cut
const coverTarget = 'absolute inset-0 bg-cover bg-center transition-transform';
const containReplace = 'absolute inset-0 bg-contain bg-no-repeat bg-top sm:bg-cover sm:bg-center transition-transform';
if(code.includes(coverTarget)) {
    code = code.replace(coverTarget, containReplace);
}

// 4. Adjust text container padding on mobile so text sits below the bg-contain image
const textTarget = 'max-w-2xl text-white space-y-5 sm:space-y-6';
const textReplace = 'max-w-2xl text-white space-y-4 sm:space-y-6 pt-52 sm:pt-0';
if(code.includes(textTarget)) {
    code = code.replace(textTarget, textReplace);
}

fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'assets/index-v21-1790395955858.js');
try { fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'dist/assets/index-v21-1790395955858.js'); } catch(e){}

console.log('Applied safe mobile fix!');
