const fs = require('fs');
const https = require('https');
const path = require('path');

let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');
let m = code.match(/https:\/\/superbmegacorp\.com\/wp-content\/uploads\/[^`'"]+/g);

if (m) {
    let urls = Array.from(new Set(m));
    let downloaded = 0;
    
    urls.forEach(url => {
        let filename = path.basename(url);
        let dest = path.join('public', 'images', filename);
        
        let file = fs.createWriteStream(dest);
        https.get(url, { headers: { Cookie: 'humans_21909=1' } }, (res) => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Downloaded', filename);
                downloaded++;
                if(downloaded === urls.length) {
                    console.log('All downloaded');
                }
            });
        }).on('error', err => {
            console.error('Error downloading', filename, err);
        });
        
        // Replace in code
        let re = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        code = code.replace(re, '/images/' + filename);
    });
    
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
    console.log('Code updated!');
} else {
    console.log('No images found.');
}
