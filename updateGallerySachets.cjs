const fs = require('fs');
const acorn = require('acorn');

const newXO = [
  {id:"gal-cardamom-front",category:"instant-sachets",title:"Instant Cardamom Chai Premix Sachet (Front)",description:"14g Single serve pouch with authentic green cardamom essence. Just add 90ml hot water.",image:"/images/products/cardamom_chai_front.jpg"},
  {id:"gal-cardamom-back",category:"instant-sachets",title:"Instant Cardamom Chai Premix Sachet (Back)",description:"Back view showing nutritional values, FSSAI licensing, and brewing instructions.",image:"/images/products/cardamom_chai_back.jpg"},
  {id:"gal-cardamom-box",category:"premix-boxes",title:"Instant Cardamom Chai Premix Box (10 Sachets)",description:"Premium retail packaging containing 10 single serve cardamom chai sachets.",image:"/images/products/box_cardamom.png"},
  {id:"gal-masala-front",category:"instant-sachets",title:"Instant Masala Chai Premix Sachet (Front)",description:"14g Single serve sachet of traditional 7-spice Kadak Chai.",image:"/images/products/masala_chai_front.jpg"},
  {id:"gal-masala-back",category:"instant-sachets",title:"Instant Masala Chai Premix Sachet (Back)",description:"Nutritional facts, shelf life details and commercial batch markings.",image:"/images/products/masala_chai_back.jpg"},
  {id:"gal-masala-box",category:"premix-boxes",title:"Instant Masala Chai Premix Box (10 Sachets)",description:"Premium retail packaging containing 10 single serve masala chai sachets.",image:"/images/products/box_masala.png"},
  {id:"gal-ginger-front",category:"instant-sachets",title:"Instant Ginger Chai Premix Sachet (Front)",description:"14g Single serve warming dry ginger tea sachet with zero synthetic colors.",image:"/images/products/ginger_chai_front.jpg"},
  {id:"gal-ginger-back",category:"instant-sachets",title:"Instant Ginger Chai Premix Sachet (Back)",description:"Detailed ingredient composition and brewing instructions for single cup ginger chai.",image:"/images/products/ginger_chai_back.jpg"},
  {id:"gal-ginger-box",category:"premix-boxes",title:"Instant Ginger Chai Premix Box (10 Sachets)",description:"Premium retail packaging containing 10 single serve ginger chai sachets.",image:"/images/products/box_ginger.png"},
  {id:"gal-plain-front",category:"instant-sachets",title:"Instant Plain Sweet Chai Sachet (Front)",description:"Classic sweet milk tea instant formulation for rapid service.",image:"/images/products/plain_chai_front.jpg"},
  {id:"gal-plain-back",category:"instant-sachets",title:"Instant Plain Sweet Chai Sachet (Back)",description:"FSSAI manufacturing specifications and allergen advisory information.",image:"/images/products/plain_chai_back.jpg"},
  {id:"gal-plain-box",category:"premix-boxes",title:"Instant Plain Chai Premix Box (10 Sachets)",description:"Premium retail packaging containing 10 single serve plain sweet chai sachets.",image:"/images/products/box_plain.png"},
  {id:"gal-coffee-front",category:"instant-sachets",title:"Instant Coffee Premix Sachet (Front)",description:"Rich South-Indian blend instant single-serve sachet for instant hot coffee.",image:"/images/products/coffee_front.jpg"},
  {id:"gal-coffee-back",category:"instant-sachets",title:"Instant Coffee Premix Sachet (Back)",description:"Preparation guide and nutritional panel for single cup instant coffee.",image:"/images/products/coffee_back.jpg"},
  {id:"gal-coffee-box",category:"premix-boxes",title:"Instant Coffee Premix Box (10 Sachets)",description:"Premium retail packaging containing 10 single serve coffee premix sachets.",image:"/images/products/box_coffee.png"}
];

const newBO = [
  {id:"all",name:"All Media"},
  {id:"instant-sachets",name:"Instant Chai & Coffee Sachets (14g)"},
  {id:"premix-boxes",name:"Retail Premix Boxes (10 Sachets)"}
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

  // 3. Remove Header banner from CO
  const hMatch = content.indexOf('Authentic Media Gallery');
  if (hMatch !== -1) {
    const hStart = content.lastIndexOf('(0,k.jsx)(oO,', hMatch);
    const closeIdx = content.indexOf(')]})}),', hMatch);
    if (hStart !== -1 && closeIdx !== -1) {
      const hEnd = closeIdx + 7; // includes ')]})}),'
      content = content.substring(0, hStart) + 'null,' + content.substring(hEnd);
      console.log('Removed Authentic Media Gallery header from', filePath);
    }
  } else {
    console.log('Authentic Media Gallery header not found (might already be removed) in', filePath);
  }

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
