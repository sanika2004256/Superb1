const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Fix className:hidden 2xl:inline,children:Sign In
code = code.replace(/className:hidden 2xl:inline,children:Sign In/g, 'className:`hidden 2xl:inline`,children:`Sign In`');

// Fix className:hidden
code = code.replace(/className:hidden,children:\[/g, 'className:`hidden`,children:[');

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
console.log('Fixed syntax errors');
