const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target1 = 'onClick:()=>{se(),m(!1)}';
const rep1 = 'onClick:()=>{sessionStorage.removeItem("firebase:authUser");localStorage.removeItem("firebase:authUser");se();m(!1);}';

const target2 = 'onClick:()=>{t(),s(`/`)}';
const rep2 = 'onClick:()=>{sessionStorage.removeItem("firebase:authUser");localStorage.removeItem("firebase:authUser");t();s(`/`);}';

code = code.replace(target1, rep1);
code = code.replace(target2, rep2);

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('Successfully patched both sign out buttons!');
