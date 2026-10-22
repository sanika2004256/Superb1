const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const targetStr = 'items:e.map(e=>({id:e.product.id,name:e.product.name,sku:e.product.sku,packSize:e.product.packSize,quantity:e.quantity,unitPrice:e.unitPrice,subtotal:e.subtotal,gstRate:e.gstRate,pricingMode:e.pricingMode,image:e.product.image}))';
const replacementStr = 'items:e.map(e=>({id:e.product.id||"",name:e.product.name||"",sku:e.product.sku||"",packSize:e.product.packSize||"",quantity:e.quantity||0,unitPrice:e.unitPrice||0,subtotal:e.subtotal||0,gstRate:e.gstRate||0,pricingMode:e.pricingMode||"retail",image:e.product.image||""}))';

if (code.includes(targetStr)) {
    code = code.split(targetStr).join(replacementStr);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('Fixed undefined properties in Checkout items mapping!');
} else {
    console.log('Target string not found.');
}
