const fs = require('fs');

const code = fs.readFileSync('Superb-main/assets/index-v29-1790684309157.js', 'utf8');
const switchIdx = code.indexOf('children:`Distributor Mode:`');
const start = code.lastIndexOf('(0,k.jsxs)(`div`,{className:`flex flex-col sm:flex-row', switchIdx);
const end = code.indexOf('(0,k.jsxs)(`div`,{className:`relative pt-2.5', switchIdx);
console.log('Search row snippet:');
console.log(code.slice(start, end));
