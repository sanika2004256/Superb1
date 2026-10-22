const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The language button has "????? / English"
let idx = code.indexOf('\\u092E\\u0930\\u093E\\u0920\\u0940 / English');
if (idx !== -1) {
    console.log(code.substring(idx - 400, idx + 100));
} else {
    console.log("Language button text not found");
}
