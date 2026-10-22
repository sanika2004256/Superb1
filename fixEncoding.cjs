const fs = require('fs');

// 1. Fix the ????? in index-BM-yEkkk.js
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
code = code.replace(/\?\?\?\?\? \/ English/g, '\u092E\u0930\u093E\u0920\u0940 / English');
fs.writeFileSync('assets/index-BM-yEkkk.js', code, 'utf8');

// 2. Ensure CSS is very robust in index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('iframe.goog-te-banner-frame')) {
    html = html.replace('</style>', '  iframe.goog-te-banner-frame { display: none !important; }\n      body { position: static !important; top: 0 !important; }\n    </style>');
    fs.writeFileSync('index.html', html, 'utf8');
}
console.log('Fixed question marks and reinforced CSS');
