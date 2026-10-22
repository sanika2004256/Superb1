const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Sign Out');
if (idx !== -1) {
    console.log(code.substring(idx - 200, idx + 100));
} else {
    console.log("No Sign Out found.");
}
