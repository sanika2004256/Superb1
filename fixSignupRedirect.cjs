const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const oldSignup = 'sessionStorage.setItem("firebase:authUser", "true"); window.location.hash="#/login"; window.location.reload();';
const newSignup = 'sessionStorage.setItem("firebase:authUser", "true"); window.location.href="/checkout";';

if (code.includes(oldSignup)) {
    code = code.replace(oldSignup, newSignup);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Fixed signup redirect to /checkout');
} else {
    console.log('Old signup patch not found');
}
