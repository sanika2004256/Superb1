const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

if (code.includes('targetRoute:`/products?cat=tea-premix`')) {
    code = code.replace(/targetRoute:`\/products\?cat=tea-premix`/g, 'targetRoute:`/products?cat=plus-premix`');
    console.log('Fixed tea-premix route');
}

if (code.includes('targetRoute:`/products?cat=agro-export`')) {
    code = code.replace(/targetRoute:`\/products\?cat=agro-export`/g, 'targetRoute:`/products`');
    console.log('Fixed agro-export route');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
