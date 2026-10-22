const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let parts = code.split('category:'); 
let map = {}; 
parts.forEach((p, i) => { 
    if(i>0) { 
        let cat = p.substring(0, 30).split(',')[0].replace(/`/g, ''); 
        map[cat] = (map[cat]||0)+1; 
    }
}); 
console.log(map);
