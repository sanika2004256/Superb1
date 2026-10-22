const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

function checkVar(name) {
  const re = new RegExp('\\b' + name + '\\s*=', 'g');
  let match;
  console.log('--- Matches for ' + name + ' ---');
  let count = 0;
  while ((match = re.exec(content)) !== null && count < 5) {
    console.log(content.substring(Math.max(0, match.index - 20), match.index + 80));
    count++;
  }
}

checkVar('Kr');
checkVar('ya');
checkVar('mr');
