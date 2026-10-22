const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The login logic
let target = 'await c(e,n),d(`/account`)';
let replace = 'await window.signInWithEmailAndPassword(window.auth, e, n); sessionStorage.setItem("firebase:authUser", "true"); d(`/checkout`)';

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Fixed Login form Firebase Auth");
} else {
    console.log("Target not found");
}
