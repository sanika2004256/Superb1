const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Let's use a local server to test the actual build files
        const express = require('express');
        const app = express();
        app.use(express.static('.'));
        // Fallback for SPA routing
        app.get('*', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
        const server = app.listen(3000, async () => {
            console.log('Server running on 3000');
            
            await page.goto('http://localhost:3000/products?cat=plus-premix', {waitUntil: 'networkidle0'});
            
            // Wait for the showing text
            await page.waitForSelector('.text-slate-800');
            
            const text = await page.evaluate(() => {
                const el = document.evaluate('//span[contains(text(), "Showing")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                return el ? el.parentElement.textContent : 'Not found';
            });
            
            console.log('Text on page:', text);
            
            await browser.close();
            server.close();
            process.exit(0);
        });
    } catch(e) {
        console.error('Error:', e);
        process.exit(1);
    }
})();
