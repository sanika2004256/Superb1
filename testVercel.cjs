const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('https://superbmegacorp-ten.vercel.app/', {waitUntil: 'networkidle2'});
  
  // check products
  const products = await page.evaluate(() => window.LIVE_PRODUCTS);
  console.log('LIVE_PRODUCTS length:', products ? products.length : 0);
  
  await browser.close();
})();
