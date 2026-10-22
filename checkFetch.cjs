const fs = require('fs');
const code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
const regex = /https:\/\/firestore\.googleapis\.com\/v1\/projects\/dist-7b242\/databases\/\(default\)\/documents\/enquiries.*?['"]/g;
console.log(code.match(regex));
