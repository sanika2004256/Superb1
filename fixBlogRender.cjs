const fs = require('fs');

let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

const regex = /children:e\.content\.map\(\(e,t\)=>\(0,k\.jsx\)\(`p`,{children:e},t\)\)/;

if (regex.test(code)) {
    code = code.replace(regex, 'children:e.content.map((e,t)=>(0,k.jsx)(`div`,{className:`mb-4`,dangerouslySetInnerHTML:{__html:e}},t))');
    fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
    fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'assets/index-v21-1790395955858.js');
    try { fs.copyFileSync('public/assets/index-v21-1790395955858.js', 'dist/assets/index-v21-1790395955858.js'); } catch(e){}
    console.log('Replaced successfully');
} else {
    console.log('Not found with exact backticks');
}
