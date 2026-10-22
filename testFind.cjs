const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find all arrays that look like product arrays
let matches = code.match(/[A-Za-z0-9_]+=\[\{id:1,name:`.*?`.*?\n*/g);
if (matches) {
    console.log("Found arrays:", matches.map(m => m.substring(0, 50)));
} else {
    console.log("No product arrays found!");
}
