const fs = require('fs');
const acorn = require('acorn');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const yOStart = content.indexOf('function yO({compactTop:e=!1}){');
const yOEnd = content.indexOf('function SO({images:e,activeIndex:t,onClose:n,onPrev:r,onNext:i}){', yOStart);

const originalYO = content.substring(yOStart, yOEnd).trim();
console.log('Original yO length:', originalYO.length);

try {
  acorn.parse(originalYO, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Original yO is VALID!');
} catch (e) {
  console.log('Original parse error:', e.message, 'at pos:', e.pos);
}
