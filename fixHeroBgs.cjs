const fs = require('fs');

let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

const target = 'style:{backgroundImage:`url(${n.bgImage})`}';
const replacement = 'style:{backgroundImage:`url(${n.bgImage})`, backgroundPosition: window.innerWidth < 768 ? ([1,4,5].includes(n.id) ? "25% center" : "center") : "center"}';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
    try { fs.writeFileSync('assets/index-v21-1790395955858.js', code); } catch(e){}
    try { fs.writeFileSync('dist/assets/index-v21-1790395955858.js', code); } catch(e){}
    console.log('Fixed background position based on slide id');
} else {
    console.log('Target not found');
}
