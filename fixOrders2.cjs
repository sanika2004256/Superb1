const fs = require('fs');

let code = fs.readFileSync('src/pages/Orders.jsx', 'utf8');

// The code currently has the syntax error at the end. Let's fix it by wrapping in a fragment or putting it inside the div.
// Currently it looks like:
// </div>
// {/* Order Details Modal */}
// {isModalOpen && ...}
// );
// }

// Let's replace the last bit.
const badEndIdx = code.lastIndexOf('</div>\n      {/* Order Details Modal */}');
if (badEndIdx !== -1) {
    const endStr = code.substring(badEndIdx);
    const newEnd = endStr.replace('</div>\n      {/* Order Details Modal */}', '      {/* Order Details Modal */}').replace('  );\n}\n', '    </div>\n  );\n}\n');
    code = code.substring(0, badEndIdx) + newEnd;
    fs.writeFileSync('src/pages/Orders.jsx', code);
    console.log('Fixed JSX syntax error!');
} else {
    console.log('Could not find bad syntax block');
}
