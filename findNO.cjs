const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const noStart = content.indexOf('function NO({onOpenEnquiry:');
console.log('function NO start at:', noStart);

if (noStart !== -1) {
  console.log(content.substring(noStart, noStart + 1500));
}
