const fs = require('fs');

if (fs.existsSync('diff.txt')) {
  const content = fs.readFileSync('diff.txt', 'utf8');
  let idx = 0;
  while ((idx = content.indexOf('function jO', idx)) !== -1) {
    console.log('Found in diff.txt at', idx);
    console.log(content.substring(idx, idx + 1000));
    idx += 11;
  }
} else {
  console.log('diff.txt not found');
}
