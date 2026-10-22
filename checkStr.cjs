const fs = require('fs');
let file = fs.readdirSync('public/assets').find(f => f.startsWith('index-v19'));
let code = fs.readFileSync('public/assets/' + file, 'utf8');

let regex = /className:\`relative p-2 rounded-xl text-slate-700 hover:text-\[\#d92906\] hover:bg-slate-100 transition-colors shrink-0\`/g;
let matches = code.match(regex);
console.log(matches ? matches.length : 0);

let regex2 = /className:\`hidden sm:flex relative p-2 rounded-xl text-slate-700 hover:text-\[\#d92906\] hover:bg-slate-100 transition-colors shrink-0\`/g;
let matches2 = code.match(regex2);
console.log("With hidden sm:flex:", matches2 ? matches2.length : 0);
