const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

code = code.replace(/e\.g\. Ramesh Kulkarni/g, 'Enter your full name');
code = code.replace(/e\.g\. Ramesh Patil/g, 'Enter your full name');
code = code.replace(/e\.g\. Anand Shinde/g, 'Enter your full name');
// Let's also replace email just in case they meant all personal fake info
code = code.replace(/e\.g\. ramesh@company\.com/g, 'name@email.com');

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
console.log('Replaced all fake name placeholders!');
