const fs = require('fs');

const oldName = 'index-BM-yEkkk.js';
const newName = 'index-v2-' + Date.now() + '.js';

fs.renameSync('assets/' + oldName, 'assets/' + newName);
if (fs.existsSync('public/assets/' + oldName)) {
    fs.renameSync('public/assets/' + oldName, 'public/assets/' + newName);
}

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(new RegExp(oldName, 'g'), newName);
fs.writeFileSync('index.html', html);

console.log('Renamed to ' + newName);
