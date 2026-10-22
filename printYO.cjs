const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const yOStart = content.indexOf('function yO({compactTop:e=!1}){');
const yOEnd = content.indexOf('function MO({onOpenEnquiry:e}){', yOStart);

console.log('--- Entire yO function ---');
console.log(content.substring(yOStart, yOEnd));
