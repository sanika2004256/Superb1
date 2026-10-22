const fs = require('fs');
let code = fs.readFileSync('src/admin/App.jsx', 'utf8');

code = code.replace(/import CustomerRegister from '\.\.\/pages\/CustomerRegister';\r?\n/, '');
code = code.replace(/\s*<Route path="\/register" element=\{!user \? <CustomerRegister \/> : <Navigate to="\/dashboard" \/>\} \/>\r?\n/, '');

fs.writeFileSync('src/admin/App.jsx', code);
console.log('Removed CustomerRegister');
