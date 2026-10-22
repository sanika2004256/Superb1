const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const textIndex = code.indexOf('Est. 2010');

if (textIndex !== -1) {
    let context = code.substring(textIndex - 200, textIndex + 200);
    console.log("Context around Est. 2010:");
    console.log(context);
} else {
    console.log("Not found");
}
