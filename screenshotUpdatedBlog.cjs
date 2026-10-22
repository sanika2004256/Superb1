const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/blogs', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('article', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'blogs-streamlined-desktop.png', fullPage: true });
  console.log('Saved blogs-streamlined-desktop.png');

  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('article', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'blogs-streamlined-mobile.png', fullPage: true });
  console.log('Saved blogs-streamlined-mobile.png');

  await browser.close();
})();
