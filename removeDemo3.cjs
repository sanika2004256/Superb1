const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const regex = /,\(0,\w+\.jsxs?\)\(div,{className:p-3\.5 bg-slate-50[^]*?children:Demo Admin\}\)\]\}\)\]\}\)/;
let match = code.match(regex);

if (match) {
    code = code.replace(match[0], '');
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully removed using regex:', match[0].length, 'characters.');
} else {
    console.log('Regex did not match.');
}
