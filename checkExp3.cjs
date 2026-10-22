const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('Explore `');
if (idx !== -1) {
    let startIdx = code.lastIndexOf('className', idx);
    console.log(code.substring(startIdx - 50, idx + 50));
} else {
    idx = code.indexOf('Explore');
    if (idx !== -1) {
       console.log("Found explore");
    }
}
