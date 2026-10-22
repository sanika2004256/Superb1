const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('await window.signInWithEmailAndPassword(window.auth');
if (idx !== -1) {
    console.log(code.substring(idx - 100, idx + 800));
}
