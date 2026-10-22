const fs = require('fs');
const code = fs.readFileSync('./assets/index-v29-1790684309157.js', 'utf8');

const idxs = [];
let pos = 0;
while ((pos = code.indexOf('/franchise', pos)) !== -1) {
  idxs.push(pos);
  pos += 10;
}
console.log('Found /franchise at positions:', idxs.length);
for (const idx of idxs) {
  console.log('--- Context around', idx, '---');
  console.log(code.substring(Math.max(0, idx - 80), Math.min(code.length, idx + 120)));
}
