const fs = require('fs');
let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

code = code.replace('table className="w-full text-left border-collapse whitespace-nowrap"', 'table className="w-full text-left border-collapse"');

fs.writeFileSync('src/pages/Orders.jsx', code);
console.log('Fixed!');
