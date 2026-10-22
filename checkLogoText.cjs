const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'className:"hidden sm:block"';
const textIndex = code.indexOf('Business Conglomerate');

if (textIndex !== -1) {
    let context = code.substring(textIndex - 200, textIndex + 200);
    console.log("Context around Business Conglomerate:");
    console.log(context);
} else {
    console.log("Not found");
}
