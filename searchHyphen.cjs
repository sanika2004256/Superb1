const fs = require('fs');
const code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const regex = /\|\|['"`]-['"`]/g;
console.log(code.match(regex));

// Also let's print the entire span that renders e.packSize to see if the '-' is there
const idx = code.indexOf('children:e.packSize');
if (idx > -1) {
    console.log("Found e.packSize context: ", code.substring(idx - 150, idx + 50));
}
