const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://superbmegacorp.vercel.app/products?cat=plus-premix', {waitUntil: 'networkidle2'});
        
        await page.waitForTimeout(2000);
        const text = await page.evaluate(() => {
            return document.body.innerText;
        });
        
        if (text.includes('Showing 0 of 93')) {
            console.log('BUG EXISTS ON LIVE SITE!');
        } else if (text.includes('Showing 7 of 93')) {
            console.log('WORKING ON LIVE SITE!');
        } else {
            console.log('COULD NOT FIND TEXT');
        }
        
        await browser.close();
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
})();
