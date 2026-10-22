const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let p = code.split('category:`plus-premix`');
console.log('Matches for exact `plus-premix`:', p.length - 1);

let p2 = code.split('category:');
let cats = [];
for (let i=1; i<p2.length; i++) {
    let cat = p2[i].substring(0, 30).split(',')[0];
    if (cat.includes('plus-premix')) {
        cats.push(cat);
    }
}
console.log('Exact string in code:', cats.map(c => JSON.stringify(c)));
