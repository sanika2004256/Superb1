const fs = require('fs');
const jsPath = 'assets/index-v30-1790744084187.js';
let content = fs.readFileSync(jsPath, 'utf8');

const regexStr = '(0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-full object-contain filter drop-shadow-md  transition-transform duration-300`,loading:`lazy`,onError:e=>{e.target.onerror=null,e.target.src=`/images/placeholder.png`}})';
const newGridImageStr = 'e.imageBack ? (0,k.jsxs)(`div`, {className:`flex gap-2 justify-center items-center h-full w-full`, children: [(0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-300`,loading:`lazy`}), (0,k.jsx)(`img`,{src:e.imageBack,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-300`,loading:`lazy`})]}) : (0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300`,loading:`lazy`})';

if (content.includes(regexStr)) {
    content = content.replace(regexStr, newGridImageStr);
    fs.writeFileSync(jsPath, content);
    console.log('Grid image successfully patched via string replace!');
} else {
    console.log('String did not match anything!');
    const idx = content.indexOf('loading:`lazy`,onError:e=>');
    console.log(content.substring(idx - 150, idx + 100));
}
