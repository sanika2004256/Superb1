const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find the login page content
let idx = code.indexOf('Welcome Back');
if (idx !== -1) {
    console.log(code.substring(idx - 100, idx + 800));
}
