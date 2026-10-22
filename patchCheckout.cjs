const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'onClick:()=>{l(),u(`/checkout`)}';
if (code.includes(target)) {
    const replaceWith = 'onClick:()=>{l();if(Object.keys(sessionStorage).some(k=>k.includes("firebase:authUser"))||Object.keys(localStorage).some(k=>k.includes("firebase:authUser"))){u(`/checkout`)}else{u(`/login`)}}';
    code = code.replace(target, replaceWith);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully patched checkout button logic.');
} else {
    console.log('Target string not found. Maybe it is different?');
    // Let's search for just `u(\`/checkout\`)`
    let idx = code.indexOf('(`/checkout`)');
    console.log('Found (`/checkout`) at', idx);
    if(idx !== -1) {
        console.log(code.substring(idx - 50, idx + 50));
    }
}
