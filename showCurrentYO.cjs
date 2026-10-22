const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');
const idx = content.indexOf('function yO({compactTop:e=!1}){');
const endIdx = content.indexOf('function MO({onOpenEnquiry:e}){', idx);

console.log('--- Current yO code ---');
console.log(content.substring(idx, idx + 2500));
