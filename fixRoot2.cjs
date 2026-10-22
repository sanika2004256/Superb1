const fs = require('fs');
let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

code = code.replace('return (\n    <div className="space-y-6">', 'return (\n    <>\n    <div className="space-y-6">');
code = code.replace('      )}\n    </div>\n  );\n}\n', '      )}\n    </>\n  );\n}\n');
code = code.replace('      )}\n  );\n}\n', '      )}\n    </>\n  );\n}\n');

fs.writeFileSync('src/pages/Orders.jsx', code);
console.log('Wrapped!');
