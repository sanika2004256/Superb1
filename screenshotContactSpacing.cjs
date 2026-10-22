const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('.contact-dept-card', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'contact-spaced-desktop.png', fullPage: true });
  console.log('Saved contact-spaced-desktop.png');

  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForSelector('.contact-dept-card', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'contact-spaced-mobile.png', fullPage: true });
  console.log('Saved contact-spaced-mobile.png');

  await browser.close();
})();
