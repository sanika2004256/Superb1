const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let count = (code.match(/u\(`\/checkout`\)/g) || []).length;
console.log('u(`/checkout`) count:', count);

let count2 = (code.match(/u\('\/checkout'\)/g) || []).length;
console.log('u(\'/checkout\') count:', count2);

let count3 = (code.match(/u\("\/checkout"\)/g) || []).length;
console.log('u("/checkout") count:', count3);

let count4 = (code.match(/to:`\/checkout`/g) || []).length;
console.log('to:`/checkout` count:', count4);
