const fs = require('fs');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let textIdx = code.indexOf('Explore Complete Catalog');
let startIdx = code.lastIndexOf('n&&(0,k.jsx)(`div`,{className:`text-center mt-14`', textIdx);
let endIdx = code.indexOf('})})', textIdx) + 4;

if (startIdx !== -1 && endIdx > startIdx) {
    let target = code.substring(startIdx, endIdx);
    code = code.replace(target, 'n&&(0,k.jsx)(`div`,{className:`hidden`})');
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    console.log('Hid Explore button precisely!');
} else {
    console.log('Could not find Explore wrapper');
}
