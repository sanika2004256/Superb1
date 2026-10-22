const fs = require('fs');
const code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
const textareas = code.match(/textarea.*?className:`[^`]*`/g) || [];
textareas.forEach(t => console.log(t + '\n\n'));
