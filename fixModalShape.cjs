const fs = require('fs');
let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

code = code.replace(
  'className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"',
  'className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"'
);

code = code.replace(
  'className="p-6 border-b border-slate-100 flex justify-between items-center"',
  'className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white z-10"'
);

code = code.replace(
  '            </div>\n            \n            <div className="p-6 space-y-6">',
  '            </div>\n            \n            <div className="p-6 space-y-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">'
);

code = code.replace(
  'className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end"',
  'className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0"'
);

fs.writeFileSync('src/pages/Orders.jsx', code);
console.log('Fixed Modal Shape!');
