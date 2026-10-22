const fs = require('fs');
const code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
const regex = /collection\([^,]*,['"]([^'"]+)['"]\)/g;
let match;
const colls = new Set();
while ((match = regex.exec(code)) !== null) {
  colls.add(match[1]);
}
console.log(Array.from(colls));
