const fs=require('fs'); 
const txt=fs.readFileSync('assets/index-BM-yEkkk.js','utf8'); 
const idx=txt.indexOf('Karak Premium Cardamom Tea'); 
console.log(txt.substring(Math.max(0, idx-50), idx+50));
