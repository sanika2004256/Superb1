const fs = require('fs');
let txt = fs.readFileSync('assets/index-BM-yEkkk.js','utf8');
txt = txt.replace(
  'Ha=[{id:1,name:`Karak Premium Cardamom Tea`',
  'Ha=(window.LIVE_PRODUCTS && window.LIVE_PRODUCTS.length > 0) ? window.LIVE_PRODUCTS : [{id:1,name:`Karak Premium Cardamom Tea`'
);
fs.writeFileSync('assets/index-BM-yEkkk.js', txt);
console.log('Bundle Patched successfully');
