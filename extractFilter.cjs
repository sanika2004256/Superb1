const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Find Ha
let idx = code.indexOf('var Ha=[');
let str = code.substring(idx + 7);
let open = 1;
let endIdx = 0;
for (let i = 1; i < str.length; i++) {
    if (str[i] === '[') open++;
    if (str[i] === ']') open--;
    if (open === 0) {
        endIdx = i;
        break;
    }
}
let haCode = str.substring(0, endIdx + 1);

// Find the filter function body inside fO
let filterIdx = code.indexOf('Ha.filter(e=>{');
let filterEnd = code.indexOf('}),[i,o]');
let filterBody = code.substring(filterIdx + 14, filterEnd);

console.log("Filter body:");
console.log(filterBody);

let testScript = `
    const Ha = ${haCode};
    let i = 'plus-premix';
    let o = '';
    let m = Ha.filter(e => {
        ${filterBody}
    });
    console.log("m.length =", m.length);
`;

fs.writeFileSync('runFilter.js', testScript);
