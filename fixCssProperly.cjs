const fs = require('fs');
let css = fs.readFileSync('public/assets/index-BvH2rQN2.css', 'utf8');
css += '\n.h-\\[320px\\] { height: 320px !important; }';
fs.writeFileSync('public/assets/index-BvH2rQN2.css', css);
