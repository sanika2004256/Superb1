const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('Vizuki Hi-tech Agro');
if (idx !== -1) {
    console.log(code.substring(idx - 300, idx + 300));
}
