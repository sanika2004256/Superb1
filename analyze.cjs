const fs = require('fs');
const content = fs.readFileSync('assets/' + fs.readdirSync('assets').find(f => f.startsWith('index') && f.endsWith('.js')), 'utf8');

const regex = /collection\([a-zA-Z0-9_]+,\s*['"]([^'"]+)['"]/g;
let match;
const collections = new Set();
while ((match = regex.exec(content)) !== null) {
  collections.add(match[1]);
}
console.log("Collections: ", Array.from(collections));

console.log("Contains 'orders': ", content.includes('orders'));
console.log("Contains 'enquiries': ", content.includes('enquiries'));
console.log("Contains 'contacts': ", content.includes('contacts'));
console.log("Contains 'inquiries': ", content.includes('inquiries'));
