const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Replace specific strings
code = code.replace('name:`All Products (92)`,count:92', 'name:`All Products (93)`,count:93');
code = code.replace('All Products Catalog (92+ SKUs)', 'All Products Catalog (93+ SKUs)');
code = code.replace('range of 92 commercial products', 'range of 93 commercial products');
code = code.replace('Search 92 products by name', 'Search 93 products by name');
code = code.replace('Show All 92 Products', 'Show All 93 Products');
code = code.replace('official 92 product commercial', 'official 93 product commercial');
code = code.replace('Explore our 92 commercial tea premixes', 'Explore our 93 commercial tea premixes');

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('Fixed hardcoded 92 to 93!');
