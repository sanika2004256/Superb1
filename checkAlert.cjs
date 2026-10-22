const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('alert');
if (idx !== -1) {
    console.log(code.substring(idx - 100, idx + 100));
} else {
    console.log("No alert found in customer JS");
}
