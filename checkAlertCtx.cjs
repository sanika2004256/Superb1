const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('alert(err.message)');
if (idx !== -1) {
    console.log(code.substring(idx - 400, idx + 200));
}
