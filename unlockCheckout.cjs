const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'onClick:()=>{l();if(Object.keys(sessionStorage).some(k=>k.includes("firebase:authUser"))||Object.keys(localStorage).some(k=>k.includes("firebase:authUser"))){u(`/checkout`)}else{u(`/login`)}}';
const original = 'onClick:()=>{l(),u(`/checkout`)}';

if (code.includes(target)) {
    code = code.replace(target, original);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully unlocked the checkout page!');
} else {
    console.log('Target string not found.');
}
