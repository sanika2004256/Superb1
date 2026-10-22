const fs = require('fs');
let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v18'));
let code = fs.readFileSync('public/assets/' + f, 'utf8');

let count = 0;
let regex = /href:\s*[`"']\/products[`"']/g;
let match;
while ((match = regex.exec(code)) !== null) {
    count++;
    console.log(code.substring(Math.max(0, match.index - 50), match.index + 100));
}
console.log('Total:', count);
