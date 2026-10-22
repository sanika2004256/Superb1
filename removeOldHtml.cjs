const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the start of the injected code
let startIdx = html.indexOf('<!-- Custom Language Toggle -->');
if (startIdx !== -1) {
    let endIdx = html.indexOf('</body>');
    let toRemove = html.substring(startIdx, endIdx);
    html = html.replace(toRemove, '');
    fs.writeFileSync('index.html', html);
    console.log('Removed old HTML toggle');
} else {
    console.log('Old toggle not found');
}
