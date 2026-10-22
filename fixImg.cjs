const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

let targetImg = 'className:`max-h-full max-w-full object-contain rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-500`';
let newImg = 'className:`w-full h-full object-cover rounded-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-500`';

if(code.includes(targetImg)) {
    code = code.replace(targetImg, newImg);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log("Fixed image object-fit");
} else {
    console.log("Image target not found");
}
