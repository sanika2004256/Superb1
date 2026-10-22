const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = "setTimeout(()=>{u(!1),c(!0)},600)";
const replacement = "fetch('https://firestore.googleapis.com/v1/projects/dist-7b242/databases/(default)/documents/enquiries?key=AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc',{method:'POST',body:JSON.stringify({fields:{name:{stringValue:r.name},email:{stringValue:r.email},phone:{stringValue:r.phone},message:{stringValue:r.message},subject:{stringValue:r.interest},createdAt:{stringValue:new Date().toISOString()}}})}).then(()=>{u(!1),c(!0)})";

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Fixed Modal Form Submission!');
} else {
    console.log('Target not found');
}
