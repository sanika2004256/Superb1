const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx1 = code.indexOf("fetch('https://firestore.googleapis.com");
console.log('--- FETCH 1 ---');
console.log(code.substring(idx1, idx1 + 400));

let idx2 = code.indexOf("fetch('https://firestore.googleapis.com", idx1 + 1);
console.log('--- FETCH 2 ---');
console.log(code.substring(idx2, idx2 + 400));
