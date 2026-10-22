const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find Ha
let idx = code.indexOf('var Ha=[');
let str = code.substring(idx + 7);
let open = 1;
let endIdx = 0;
for (let i = 1; i < str.length; i++) {
    if (str[i] === '[') open++;
    if (str[i] === ']') open--;
    if (open === 0) {
        endIdx = i;
        break;
    }
}
let haCode = str.substring(0, endIdx + 1);

console.log('Ha length (chars):', haCode.length);

let parts = haCode.split('category:');
let map = {};
parts.forEach((p, i) => {
    if (i > 0) {
        let cat = p.substring(0, 30).split(',')[0].replace(/`/g, '');
        map[cat] = (map[cat] || 0) + 1;
    }
});
console.log('Categories in Ha:', map);
