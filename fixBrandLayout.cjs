const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let target = 'className:`flex items-start justify-between gap-4 mb-5`';
let replacement = 'className:`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5`';

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Fixed flex container for brands card");
} else {
    console.log("Target not found");
}
