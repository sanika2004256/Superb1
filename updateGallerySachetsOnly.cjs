const fs = require('fs');
const acorn = require('acorn');

const newXO = [
  {id:"gal-cardamom-front",category:"cardamom",title:"Instant Cardamom Chai Premix Sachet (Front)",description:"14g Single serve pouch with authentic green cardamom essence. Just add 90ml hot water.",image:"/images/products/cardamom_chai_front.jpg"},
  {id:"gal-cardamom-back",category:"cardamom",title:"Instant Cardamom Chai Premix Sachet (Back)",description:"Back view showing nutritional values, FSSAI licensing, and brewing instructions.",image:"/images/products/cardamom_chai_back.jpg"},
  {id:"gal-masala-front",category:"masala",title:"Instant Masala Chai Premix Sachet (Front)",description:"14g Single serve sachet of traditional 7-spice Kadak Chai.",image:"/images/products/masala_chai_front.jpg"},
  {id:"gal-masala-back",category:"masala",title:"Instant Masala Chai Premix Sachet (Back)",description:"Nutritional facts, shelf life details and commercial batch markings.",image:"/images/products/masala_chai_back.jpg"},
  {id:"gal-ginger-front",category:"ginger",title:"Instant Ginger Chai Premix Sachet (Front)",description:"14g Single serve warming dry ginger tea sachet with zero synthetic colors.",image:"/images/products/ginger_chai_front.jpg"},
  {id:"gal-ginger-back",category:"ginger",title:"Instant Ginger Chai Premix Sachet (Back)",description:"Detailed ingredient composition and brewing instructions for single cup ginger chai.",image:"/images/products/ginger_chai_back.jpg"},
  {id:"gal-plain-front",category:"plain",title:"Instant Plain Sweet Chai Sachet (Front)",description:"Classic sweet milk tea instant formulation for rapid service.",image:"/images/products/plain_chai_front.jpg"},
  {id:"gal-plain-back",category:"plain",title:"Instant Plain Sweet Chai Sachet (Back)",description:"FSSAI manufacturing specifications and allergen advisory information.",image:"/images/products/plain_chai_back.jpg"},
  {id:"gal-coffee-front",category:"coffee",title:"Instant Coffee Premix Sachet (Front)",description:"Rich South-Indian blend instant single-serve sachet for instant hot coffee.",image:"/images/products/coffee_front.jpg"},
  {id:"gal-coffee-back",category:"coffee",title:"Instant Coffee Premix Sachet (Back)",description:"Preparation guide and nutritional panel for single cup instant coffee.",image:"/images/products/coffee_back.jpg"}
];

const newBO = [
  {id:"all",name:"All Sachets"},
  {id:"cardamom",name:"Cardamom Chai"},
  {id:"masala",name:"Masala Chai"},
  {id:"ginger",name:"Ginger Chai"},
  {id:"plain",name:"Plain Sweet Chai"},
  {id:"coffee",name:"Instant Coffee"}
];

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace bO
  const bOStart = content.indexOf('bO=[');
  if (bOStart === -1) {
    console.log('bO not found in', filePath);
    return;
  }
  let bOEnd = -1;
  let bCount = 0;
  for (let i = content.indexOf('[', bOStart); i < content.length; i++) {
    if (content[i] === '[') bCount++;
    if (content[i] === ']') bCount--;
    if (bCount === 0) {
      bOEnd = i + 1;
      break;
    }
  }

  // 2. Replace xO
  const xOStart = content.indexOf('xO=[', bOEnd);
  if (xOStart === -1) {
    console.log('xO not found in', filePath);
    return;
  }
  let xOEnd = -1;
  let xCount = 0;
  for (let i = content.indexOf('[', xOStart); i < content.length; i++) {
    if (content[i] === '[') xCount++;
    if (content[i] === ']') xCount--;
    if (xCount === 0) {
      xOEnd = i + 1;
      break;
    }
  }

  content = content.substring(0, bOStart) +
            'bO=' + JSON.stringify(newBO) + ',' +
            'xO=' + JSON.stringify(newXO) +
            content.substring(xOEnd);

  console.log('Replaced bO and xO in', filePath);

  // Validate syntax
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Syntax error when parsing patched code for', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}
