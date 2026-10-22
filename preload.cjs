const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
code = code.replace('<head>', '<head>\n    <link rel="preload" as="image" href="/images/logo.png" />');
fs.writeFileSync('index.html', code);
console.log('Added preload');
