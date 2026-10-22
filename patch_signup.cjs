const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const original = 'onSubmit:async t=>{if(t.preventDefault(),!e.trim()||!n.trim()||!i.trim()){s(`Please fill in all required fields.`);return}if(i.length<6){s(`Password must be at least 6 characters.`);return}l(!0),s(``);try{await u(e,n,i),f(`/account`)}catch(e){console.error(`Signup error`,e),s(e.message||`Registration failed. Please check your details.`)}finally{l(!1)}}';

const replacement = 'onSubmit:async t=>{t.preventDefault();if(!e.trim()||!n.trim()||!i.trim()){s(`Please fill in all required fields.`);return;}if(i.length<6){s(`Password must be at least 6 characters.`);return;}l(!0);s(``);try{let c = await window.createUserWithEmailAndPassword(window.auth, n, i); await window.setDoc(window.doc(window.db,"customers",c.user.uid), {uid:c.user.uid, name:e, email:n, password:i, role:"customer", status:"active", createdAt:window.serverTimestamp()}); sessionStorage.setItem("firebase:authUser", "true"); window.location.hash="#/login"; window.location.reload();}catch(err){console.error(err);s(err.message);}finally{l(!1);}}';

if (code.includes(original)) {
    code = code.replace(original, replacement);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Successfully patched signup with Firebase!');
} else {
    console.log('Original string not found in index-BM-yEkkk.js!');
}
