const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let idx = code.indexOf('function $O()');
let startSubmit = code.indexOf('onSubmit:async', idx);
console.log(code.substring(startSubmit + 300, startSubmit + 600));
