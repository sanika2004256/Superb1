const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const regex = /fetch\('https:\/\/firestore\.googleapis\.com[^\)]*\)/g;
const matches = code.match(regex);
if (matches) {
    matches.forEach(m => console.log(m + '\n\n'));
}
