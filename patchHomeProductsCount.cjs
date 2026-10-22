const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v30-1790744084187.js')
];

const targetPattern = ',h=n?m.slice(0,4):m;';
const replacementPattern = ',h=n?m.slice(0,5):m;';

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist, skipping:', filePath);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  if (!code.includes(targetPattern)) {
    console.log('Target pattern not found in:', filePath);
    return;
  }

  code = code.replace(targetPattern, replacementPattern);

  // Validate syntax using acorn
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log('Successfully patched:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
