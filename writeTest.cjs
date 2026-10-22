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

// We have the JS representation of Ha array. We can eval it.
// To eval it safely, we might need to mock some things if it references external vars, but it looks like static data.
let evalCode = `
    const Ha = ${haCode};
    let i = 'plus-premix';
    let o = '';
    let m = Ha.filter(e => {
        let t = i === 'all' || e.category === i;
        let n = o.trim().toLowerCase();
        if (!n) return t;
        let r = e.name.toLowerCase().includes(n) || 
                e.sku.toLowerCase().includes(n) || 
                (e.packing && e.packing.toLowerCase().includes(n)) || 
                (e.categoryName && e.categoryName.toLowerCase().includes(n)) || 
                (e.brand && e.brand.toLowerCase().includes(n));
        return t && r;
    });
    console.log("Filtered count for plus-premix:", m.length);
`;

fs.writeFileSync('testFilter.js', evalCode);
