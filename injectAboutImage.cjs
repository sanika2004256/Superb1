const fs = require('fs');
let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

const target = 'O.aboutStory.internationalPresence]})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button';
// WAIT, the string was: O.aboutStory.internationalPresence})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button
const actualTarget = 'O.aboutStory.internationalPresence]})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button'.replace(']}]})', ')]})');

const target2 = 'O.aboutStory.internationalPresence})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button';

const replacement = 'O.aboutStory.internationalPresence]}),(0,k.jsx)(`img`,{src:`/images/vizuki_machine.png`,alt:`Vizuki Machine`,className:`w-full max-w-sm mx-auto mt-8 lg:mt-12 rounded-2xl shadow-xl border border-slate-200`})]}),(0,k.jsx)(`div`,{className:`pt-2`,children:(0,k.jsx)(`button';

if (code.includes(target2)) {
    code = code.replace(target2, replacement);
    fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
    try { fs.writeFileSync('assets/index-v21-1790395955858.js', code); } catch(e){}
    try { fs.writeFileSync('dist/assets/index-v21-1790395955858.js', code); } catch(e){}
    console.log('Successfully injected image!');
} else {
    console.log('Target not found in JS bundle');
}
