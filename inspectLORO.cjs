const fs = require('fs');
const code = fs.readFileSync('./assets/index-v29-1790684309157.js', 'utf8');

function extractFunc(name) {
  const target = 'function ' + name + '(';
  const start = code.indexOf(target);
  if (start === -1) {
    console.log('Not found:', name);
    return null;
  }
  const bodyStart = code.indexOf('{', code.indexOf(')', start));
  let depth = 0;
  let end = -1;
  for (let i = bodyStart; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  console.log(name, 'range:', start, 'to', end, 'length:', end - start);
  const fnCode = code.substring(start, end);
  fs.writeFileSync('current_' + name + '.txt', fnCode);
  return fnCode;
}

extractFunc('LO');
extractFunc('RO');
