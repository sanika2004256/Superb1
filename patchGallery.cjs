const fs = require('fs');

const assetsDir = 'assets';
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
if (!jsFile) {
    console.error("JS file not found");
    process.exit(1);
}

const jsPath = `${assetsDir}/${jsFile}`;
let content = fs.readFileSync(jsPath, 'utf8');

// 1. Update Gallery Array `xO`
const galleryArrayStartIdx = content.indexOf('xO=[{id:`gal-cardamom-front`');
if (galleryArrayStartIdx === -1) {
    console.error("Gallery array not found!");
} else {
    const end = content.indexOf('}]', galleryArrayStartIdx) + 2;
    
    // 5 Sachets (Front + Back)
    const newGalleryArrayStr = `xO=[
        {id:"gal-cardamom", category:"instant-sachets", title:"Instant Cardamom Chai Premix Sachet", description:"View Front & Back", image:"/images/products/cardamom_chai_front.jpg", imageBack:"/images/products/cardamom_chai_back.jpg"},
        {id:"gal-masala", category:"instant-sachets", title:"Instant Masala Chai Premix Sachet", description:"View Front & Back", image:"/images/products/masala_chai_front.jpg", imageBack:"/images/products/masala_chai_back.jpg"},
        {id:"gal-ginger", category:"instant-sachets", title:"Instant Ginger Chai Premix Sachet", description:"View Front & Back", image:"/images/products/ginger_chai_front.jpg", imageBack:"/images/products/ginger_chai_back.jpg"},
        {id:"gal-plain", category:"instant-sachets", title:"Instant Plain Sweet Chai Sachet", description:"View Front & Back", image:"/images/products/plain_chai_front.jpg", imageBack:"/images/products/plain_chai_back.jpg"},
        {id:"gal-coffee", category:"instant-sachets", title:"Instant Coffee Premix Sachet", description:"View Front & Back", image:"/images/products/coffee_front.jpg", imageBack:"/images/products/coffee_back.jpg"}
    ]`;
    
    // We need to find the full array, since it ends with \`}]`
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
    
    if (actualEnd !== -1) {
        content = content.substring(0, galleryArrayStartIdx) + newGalleryArrayStr + content.substring(actualEnd);
        console.log("Replaced Gallery Array successfully!");
    } else {
        console.log("Could not determine end of Gallery array");
    }
}

// 2. Patch the grid image
const gridImageStr = '(0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-full object-contain filter drop-shadow-md  transition-transform duration-500`,loading:`lazy`})';
const newGridImageStr = 'e.imageBack ? (0,k.jsxs)(`div`, {className:`flex gap-2 justify-center items-center h-full w-full`, children: [(0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`}), (0,k.jsx)(`img`,{src:e.imageBack,alt:e.title,className:`max-h-full max-w-[48%] object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`})]}) : (0,k.jsx)(`img`,{src:e.image,alt:e.title,className:`max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500`,loading:`lazy`})';

if (content.includes(gridImageStr)) {
    content = content.replace(gridImageStr, newGridImageStr);
    console.log("Patched grid image successfully!");
} else {
    console.error("Grid image string not found!");
}

// 3. Patch the modal image
const modalImageStr = '(0,k.jsx)(`img`,{src:o.image,alt:o.title,className:`max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl`})';
const newModalImageStr = 'o.imageBack ? (0,k.jsxs)(`div`, {className:`flex flex-col sm:flex-row gap-4 justify-center items-center h-full`, children: [(0,k.jsx)(`img`,{src:o.image,alt:o.title,className:`max-h-[35vh] sm:max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl`}), (0,k.jsx)(`img`,{src:o.imageBack,alt:o.title,className:`max-h-[35vh] sm:max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl`})]}) : (0,k.jsx)(`img`,{src:o.image,alt:o.title,className:`max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl`})';

if (content.includes(modalImageStr)) {
    content = content.replace(modalImageStr, newModalImageStr);
    console.log("Patched modal image successfully!");
} else {
    console.error("Modal image string not found!");
}

// Optional: modify "Explore All x Gallery Photos" text or remove the categories map if it's only 1 category now
// To ensure categories work cleanly, we don't necessarily have to touch it, since the only category left is instant-sachets

fs.writeFileSync(jsPath, content);
console.log("Gallery patch applied successfully.");
