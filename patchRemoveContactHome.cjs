const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const filesToPatch = [
  path.join(__dirname, 'assets/index-v29-1790684309157.js'),
  path.join(__dirname, 'public/assets/index-v29-1790684309157.js')
];

const targetStr = '(0,k.jsx)(CO,{isHomePage:!0}),(0,k.jsx)(TO,{}),(0,k.jsx)(OO,{isHomePage:!0}),(0,k.jsx)(kO,{})';
const replacementStr = '(0,k.jsx)(CO,{isHomePage:!0}),(0,k.jsx)(TO,{}),(0,k.jsx)(OO,{isHomePage:!0})';

filesToPatch.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  if (!code.includes(targetStr)) {
    console.error('Target string not found in:', filePath);
    process.exit(1);
  }

  // Backup file
  fs.writeFileSync(filePath + '.bak_' + Date.now(), code, 'utf8');

  // Replace
  code = code.replace(targetStr, replacementStr);

  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Acorn: Syntax is 100% VALID for', filePath);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Acorn syntax error for', filePath, err.message);
    process.exit(1);
  }
});
