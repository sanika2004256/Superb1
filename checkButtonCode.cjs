const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let idx1 = code.indexOf('(0,k.jsxs)(`button`,{type:`button`,onClick:()=>{');
if (idx1 !== -1) {
    console.log(code.substring(idx1, idx1 + 700));
}
