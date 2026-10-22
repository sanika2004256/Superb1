const fs = require('fs');

function patchFile(filePath) {
    console.log(`Patching ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make backup
    fs.writeFileSync(filePath + '.bak', content);

    // 1. Find Ba and Ha definitions
    // Look for: to our network of clients.`}},Ba=[{"id":"all","name":"All Products","count":92},...
    const baStartMarker = 'to our network of clients.`}},Ba=[';
    const baStartIdx = content.indexOf(baStartMarker);
    if (baStartIdx === -1) {
        console.error('Could not find baStartMarker in', filePath);
        return false;
    }

    const vaMarker = '],Va={effectiveDate:';
    const vaIdx = content.indexOf(vaMarker, baStartIdx);
    if (vaIdx === -1) {
        console.error('Could not find vaMarker in', filePath);
        return false;
    }

    const haMarker = '},Ha=(window.LIVE_PRODUCTS && window.LIVE_PRODUCTS.length > 0) ? window.LIVE_PRODUCTS : [';
    const haIdx = content.indexOf(haMarker, vaIdx);
    if (haIdx === -1) {
        console.error('Could not find haMarker in', filePath);
        return false;
    }

    // Find end of Ha default array
    let haArrayStart = haIdx + haMarker.length - 1; // pointing to '['
    let brackets = 0;
    let haArrayEnd = -1;
    for (let i = haArrayStart; i < content.length; i++) {
        if (content[i] === '[') brackets++;
        else if (content[i] === ']') {
            brackets--;
            if (brackets === 0) {
                haArrayEnd = i + 1; // include ']'
                break;
            }
        }
    }
    if (haArrayEnd === -1) {
        console.error('Could not find haArrayEnd in', filePath);
        return false;
    }

    // Extract Va content: from vaIdx + 2 up to haIdx + 1
    const vaContent = content.substring(vaIdx + 2, haIdx + 1); // "Va={effectiveDate: ... }"
    const haDefaultArray = content.substring(haArrayStart, haArrayEnd); // "[{...}]"

    // Construct new dynamic Ha and Ba definition
    const newDefinition = `to our network of clients.\`}},` +
        vaContent + `,` +
        `Ha=(window.LIVE_PRODUCTS && Array.isArray(window.LIVE_PRODUCTS)) ? window.LIVE_PRODUCTS : ${haDefaultArray},` +
        `Ba=(()=>{let list=[{id:"all",name:"All Products",count:Ha.length}],map={};Ha.forEach(p=>{let cat=(p.category||"General").trim(),name=(p.categoryName||p.category||"General").trim();if(!map[cat]){map[cat]={id:cat,name:name,count:0};list.push(map[cat])}map[cat].count++});return list})()`;

    // Replace the entire block from baStartIdx to haArrayEnd
    content = content.substring(0, baStartIdx) + newDefinition + content.substring(haArrayEnd);
    console.log('Successfully reordered and made Ha & Ba dynamic!');

    // 2. Dynamic description: "range of 92 commercial products" -> "range of "+Ha.length+" commercial products"
    content = content.replace(
        'Explore our complete range of 92 commercial products.',
        'Explore our complete range of `+Ha.length+` commercial products.'
    );
    content = content.replace(
        'Explore our complete range of 93 commercial products.',
        'Explore our complete range of `+Ha.length+` commercial products.'
    );

    // 3. Dynamic SKUs badges in header / navbar
    content = content.replace('children:`92+ SKUs`', 'children:Ha.length+` SKUs`');
    content = content.replace('children:`93+ SKUs`', 'children:Ha.length+` SKUs`');
    content = content.replace('children:`All Products Catalog (92+ SKUs)`', 'children:`All Products Catalog (`+Ha.length+` SKUs)`');
    content = content.replace('children:`All Products Catalog (93+ SKUs)`', 'children:`All Products Catalog (`+Ha.length+` SKUs)`');

    fs.writeFileSync(filePath, content);
    console.log(`Saved patched file: ${filePath}`);
    return true;
}

const f1 = 'public/assets/index-v29-1790684309157.js';
const f2 = 'assets/index-v29-1790684309157.js';

patchFile(f1);
patchFile(f2);
