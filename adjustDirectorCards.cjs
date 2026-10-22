const fs = require('fs');
const acorn = require('acorn');

const newYO = fs.readFileSync('newYO.txt', 'utf8').trim();

try {
  acorn.parse(newYO, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('newYO.txt is 100% syntactically valid!');
} catch (e) {
  console.error('Acorn syntax error in newYO.txt:', e);
  process.exit(1);
}

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  const yOStart = content.indexOf('function yO({compactTop:e=!1}){');
  const yOEnd = content.indexOf('function SO({images:e,activeIndex:t,onClose:n,onPrev:r,onNext:i}){', yOStart);

  if (yOStart === -1 || yOEnd === -1) {
    console.log('Could not find yO bounds in', filePath);
    return;
  }

  content = content.substring(0, yOStart) + newYO + content.substring(yOEnd);

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (e) {
    console.error('Acorn syntax error for', filePath, e);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patch(p);
}
console.log('Done adjusting director cards!');
