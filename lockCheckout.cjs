const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const original = 'onClick:()=>{l(),u(`/checkout`)}';
const target = 'onClick:()=>{l();if(Object.keys(sessionStorage).some(k=>k.includes("firebase:authUser"))||Object.keys(localStorage).some(k=>k.includes("firebase:authUser"))){u(`/checkout`)}else{u(`/login`)}}';

if (code.includes(original)) {
    code = code.replace(original, target);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully blocked the checkout page for guests!');
} else {
    console.log('Original string not found.');
}
