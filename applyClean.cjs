const fs = require('fs');
let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

// 1. Vizuki Unsplash Image
code = code.replace('https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', '/images/vizuki_field.jpg');

// 2. Vizuki Machine in About Us
const aboutTarget = 'O.aboutStory.internationalPresence})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button`';
const aboutReplace = 'O.aboutStory.internationalPresence})]}),(0,k.jsx)(`img`,{src:`/images/vizuki_machine.png`,alt:`Vizuki Machine`,className:`w-full max-w-sm mx-auto mt-8 lg:mt-12 rounded-2xl shadow-xl border border-slate-200`}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button`';
if(code.includes(aboutTarget)) code = code.replace(aboutTarget, aboutReplace);

// 3. Mobile slider images
code = code.replace('style:{backgroundImage:`url(${n.bgImage})`}', 'style:{backgroundImage: window.innerWidth < 768 ? `url(${ {1:"/images/new_slide_4.png",2:"/images/new_slide_3.png",3:"/images/new_slide_2.png",4:"/images/new_slide_1.png",5:"/images/new_slide_5.png"}[n.id] })` : `url(${n.bgImage})`}');

// 4. Hide HTML text on mobile slider
const textTarget = 'max-w-2xl text-white space-y-5 sm:space-y-6';
if(code.includes(textTarget)) code = code.replace(textTarget, 'max-w-2xl text-white space-y-6 text-left flex-col items-start hidden sm:flex');

// 5. Hide gradient on mobile slider
const overlayTarget = 'absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent';
if(code.includes(overlayTarget)) code = code.replace(overlayTarget, 'absolute inset-0 hidden sm:block sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent');

// 6. Fix CSS hero-height
let css = fs.readFileSync('public/assets/index-BvH2rQN2.css', 'utf8');
css = css.replace(/hero-height\s*\{\s*height:\s*280px/g, 'hero-height { height: 220px');
fs.writeFileSync('public/assets/index-BvH2rQN2.css', css);

fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
// Also copy to assets/ and dist/assets/
fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'assets/index-v21-1790395955858.js');
fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'dist/assets/index-v21-1790395955858.js');
fs.copyFileSync('public/assets/index-BvH2rQN2.css', 'assets/index-BvH2rQN2.css');
fs.copyFileSync('public/assets/index-BvH2rQN2.css', 'dist/assets/index-BvH2rQN2.css');

console.log('Applied everything cleanly!');
