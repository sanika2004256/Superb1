const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find the previously patched login code
const oldLogin = "onSubmit: async (ev) => { ev.preventDefault(); try { await window.signInWithEmailAndPassword(window.auth, e, n); sessionStorage.setItem('firebase:authUser', 'true'); window.location.hash = '#/'; window.location.reload(); } catch(err) { alert(err.message); } }";
const newLogin = "onSubmit: async (ev) => { ev.preventDefault(); try { await window.signInWithEmailAndPassword(window.auth, e, n); sessionStorage.setItem('firebase:authUser', 'true'); window.location.href = '/checkout'; } catch(err) { alert(err.message); } }";

if (code.includes(oldLogin)) {
    code = code.replace(oldLogin, newLogin);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Fixed login redirect to /checkout');
} else {
    console.log('Old login patch not found');
}
