const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx = code.indexOf('Quick Business Enquiry');
let startIdx = code.lastIndexOf('function', idx);
console.log(code.substring(startIdx, idx + 200));
