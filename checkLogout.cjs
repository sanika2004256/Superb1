const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The fake logout logic probably calls localStorage.removeItem
let idx = code.indexOf('localStorage.removeItem');
if (idx !== -1) {
    console.log(code.substring(idx - 100, idx + 100));
} else {
    console.log("No localStorage.removeItem");
}
