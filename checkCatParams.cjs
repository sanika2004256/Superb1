const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let m = code.match(/cat=[^&\`\"\'\)]+/g);
if (m) {
    let set = new Set(m);
    console.log(Array.from(set).join('\n'));
}
