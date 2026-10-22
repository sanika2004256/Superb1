const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let regex = /placeholder:`(e\.g\.[^`]+)`/g;
let matches = [...code.matchAll(regex)];

if(matches.length > 0) {
    matches.forEach(m => console.log(m[1]));
} else {
    console.log('No matches');
}

let regex2 = /placeholder:`([^`]+)`/g;
let matches2 = [...code.matchAll(regex2)];
console.log("All placeholders:");
matches2.map(m=>m[1]).filter(x=>x.toLowerCase().includes('anand') || x.toLowerCase().includes('john') || x.toLowerCase().includes('ramesh')).forEach(x => console.log(x));

