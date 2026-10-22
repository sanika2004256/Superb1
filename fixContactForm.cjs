const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let badSubmit = `onSubmit: async (ev) => { ev.preventDefault(); try { await window.signInWithEmailAndPassword(window.auth, e, n); sessionStorage.setItem('firebase:authUser', 'true'); window.location.href = '/checkout'; } catch(err) { alert(err.message); } }`;
let goodSubmit = `onSubmit:f`;

if(code.includes(badSubmit)) {
    code = code.replace(badSubmit, goodSubmit);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Restored Contact form submit handler!");
} else {
    console.log("Bad submit not found");
}
