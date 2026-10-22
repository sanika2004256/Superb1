const fs = require('fs');
let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

// 1. Add whitespace-nowrap to the Order ID cell
code = code.replace(
  '<td className="px-6 py-5">\n                        <div className="font-bold text-slate-800 tracking-tight">#{order.orderNumber',
  '<td className="px-6 py-5 whitespace-nowrap">\n                        <div className="font-bold text-slate-800 tracking-tight">#{order.orderNumber'
);

// 2. Add SKU to Order Items in main table
code = code.replace(
  '{order.items?.map(i => `${i.quantity}x ${i.name}`).join(\', \')}',
  '{order.items?.map(i => `${i.quantity}x ${i.name} ${i.sku ? `(${i.sku})` : \'\'}`).join(\', \')}'
);

// 3. Add SKU to Order Items in Modal
code = code.replace(
  '<td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>',
  '<td className="px-4 py-3 font-medium text-slate-800">{item.name} {item.sku && <span className="text-xs text-slate-400 font-mono ml-2 block sm:inline">({item.sku})</span>}</td>'
);

// 4. Change Sort Order to Ascending (new Date(a) - new Date(b))
// First find the sort line
const sortIdx = code.indexOf('data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))');
if (sortIdx !== -1) {
    code = code.replace(
      'data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))',
      'data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))' // Ascending
    );
}

fs.writeFileSync('src/pages/Orders.jsx', code);
console.log('Fixed Orders.jsx formatting and sort!');
