const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

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

// manually parse all category values from the string representation
let parts = haCode.split('category:');
let cats = [];
for (let i = 1; i < parts.length; i++) {
    let cat = parts[i].substring(0, 30).split(',')[0].trim();
    cats.push(cat);
}
console.log('Sample categories:', cats.slice(0, 15));
