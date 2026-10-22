const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const foStart = content.indexOf('function fO(');
console.log('function fO start at:', foStart);

if (foStart !== -1) {
  console.log(content.substring(foStart, foStart + 1500));
}
