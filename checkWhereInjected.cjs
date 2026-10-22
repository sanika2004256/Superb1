const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('await window.signInWithEmailAndPassword');
console.log(code.substring(idx - 300, idx + 300));
