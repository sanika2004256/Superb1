const fs = require('fs');

const assetsDir = 'assets';
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
const filePath = `${assetsDir}/${jsFile}`;
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'setTimeout(()=>{m(!1),f(!0),c({name:``,email:``,phone:``,subject:`General Business Inquiry`,message:``})},700)';

const replacementStr = "fetch('https://firestore.googleapis.com/v1/projects/dist-7b242/databases/(default)/documents/enquiries',{method:'POST',body:JSON.stringify({fields:{name:{stringValue:s.name},email:{stringValue:s.email},phone:{stringValue:s.phone},message:{stringValue:s.message},subject:{stringValue:s.subject},createdAt:{stringValue:new Date().toISOString()}}})}).then(()=>{m(!1),f(!0),c({name:``,email:``,phone:``,subject:`General Business Inquiry`,message:``})})";

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully patched enquiries to Firebase!");
} else {
  console.log("Target string not found, maybe already patched?");
}
