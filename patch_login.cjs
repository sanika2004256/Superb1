const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The login form
let idx = code.lastIndexOf('Customer Portal Login');
if (idx !== -1) {
    let onSubmitIdx = code.indexOf('onSubmit:', idx);
    if (onSubmitIdx !== -1) {
        let commaIdx = code.indexOf(',', onSubmitIdx);
        let original = code.substring(onSubmitIdx, commaIdx);
        let replaceWith = `onSubmit: async (ev) => { ev.preventDefault(); try { await window.signInWithEmailAndPassword(window.auth, e, n); sessionStorage.setItem('firebase:authUser', 'true'); window.location.hash = '#/'; window.location.reload(); } catch(err) { alert(err.message); } }`;
        code = code.replace(original, replaceWith);
        fs.writeFileSync('assets/index-BM-yEkkk.js', code);
        console.log('Patched login onSubmit!');
    }
}
