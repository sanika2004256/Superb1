const fs = require('fs');
const jsPath = 'assets/index-v29-1790684309157.js';
let content = fs.readFileSync(jsPath, 'utf8');

// 1. Array replacement
const galleryArrayStartIdx = content.indexOf('xO=[{id:`gal-cardamom-front`');
if (galleryArrayStartIdx !== -1) {
    let bracketCount = 0;
    let actualEnd = -1;
    let startBracket = content.indexOf('[', galleryArrayStartIdx);
    for(let i = startBracket; i < content.length; i++) {
        if(content[i] === '[') bracketCount++;
        if(content[i] === ']') bracketCount--;
        if(bracketCount === 0) {
            actualEnd = i + 1;
            break;
        }
    }
    const newGalleryArrayStr = `xO=[
        {id:"gal-cardamom", category:"instant-sachets", title:"Instant Cardamom Chai Premix Sachet", description:"View Front & Back", image:"/images/products/cardamom_chai_front.jpg", imageBack:"/images/products/cardamom_chai_back.jpg"},
        {id:"gal-masala", category:"instant-sachets", title:"Instant Masala Chai Premix Sachet", description:"View Front & Back", image:"/images/products/masala_chai_front.jpg", imageBack:"/images/products/masala_chai_back.jpg"},
        {id:"gal-ginger", category:"instant-sachets", title:"Instant Ginger Chai Premix Sachet", description:"View Front & Back", image:"/images/products/ginger_chai_front.jpg", imageBack:"/images/products/ginger_chai_back.jpg"},
        {id:"gal-plain", category:"instant-sachets", title:"Instant Plain Sweet Chai Sachet", description:"View Front & Back", image:"/images/products/plain_chai_front.jpg", imageBack:"/images/products/plain_chai_back.jpg"},
        {id:"gal-coffee", category:"instant-sachets", title:"Instant Coffee Premix Sachet", description:"View Front & Back", image:"/images/products/coffee_front.jpg", imageBack:"/images/products/coffee_back.jpg"}
    ]`;
    content = content.substring(0, galleryArrayStartIdx) + newGalleryArrayStr + content.substring(actualEnd);
    console.log('Replaced array');
}

// 2. Grid Image
const gridRegex = /\(0,k\.jsx\)\(\`img\`,\{src:e\.image,alt:e\.title,className:\`max-h-full max-w-full object-contain filter drop-shadow-md  transition-transform duration-500\`,loading:\`lazy\`\}\)/;
if (gridRegex.test(content)) {
    const newGridImageStr = 'e.imageBack ? (0,k.jsxs)(`div`, {className:`flex gap-2 justify-center items-center h-full w-full`, children: [(0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`}), (0,k.jsx)(`img`,{src:e.imageBack,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`})]}) : (0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`})';
    content = content.replace(gridRegex, newGridImageStr);
    console.log('Replaced grid');
}

// 3. Modal Image
const modalRegex = /\(0,k\.jsx\)\(\`img\`,\{src:o\.image,alt:o\.title,className:\`max-h-\[75vh\] w-auto object-contain rounded-lg shadow-2xl\`\}\)/;
if (modalRegex.test(content)) {
    const newModalImageStr = 'o.imageBack ? (0,k.jsxs)(`div`, {className:`flex flex-col sm:flex-row gap-4 justify-center items-center h-full`, children: [(0,k.jsx)(`img`,{src:o.image,alt:o.title,className:`max-h-[35vh] sm:max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl`}), (0,k.jsx)(`img`,{src:o.imageBack,alt:o.title,className:`max-h-[35vh] sm:max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl`})]}) : (0,k.jsx)(`img`,{src:o.image,alt:o.title,className:`max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl`})';
    content = content.replace(modalRegex, newModalImageStr);
    console.log('Replaced modal');
}

fs.writeFileSync(jsPath, content);
