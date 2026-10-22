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

let runScript = `
const myHa = ${haCode};
let i = 'karak-premium';
let o = '';
let m = myHa.filter(e => {
    let t = i === 'all' || e.category === i;
    let n = o.trim().toLowerCase();
    if (!n) return t;
    let r = e.name.toLowerCase().includes(n) || e.sku.toLowerCase().includes(n) || e.packing.toLowerCase().includes(n) || e.categoryName.toLowerCase().includes(n) || e.brand.toLowerCase().includes(n);
    return t && r;
});
console.log("Filtered count for karak-premium:", m.length);
`;
fs.writeFileSync('runFilter3.js', runScript);
