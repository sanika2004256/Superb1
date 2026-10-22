const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const targetStr = 'className:`hidden sm:flex flex-col shrink-0 leading-none select-none`';
const newStr = 'className:`hidden flex-col shrink-0 leading-none select-none`';

if (code.includes(targetStr)) {
    code = code.replace(targetStr, newStr);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Replaced wrapper class to fix overlap");
} else {
    console.log("Wrapper not found");
}
