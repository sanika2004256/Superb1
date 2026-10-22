const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let matches = code.match(/[a-zA-Z0-9_]+=\[\{id:\d+,name:.*?\,/g);
console.log(matches);
