const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    await page.goto('http://localhost:5173/management', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'management-screenshot-mobile.png', fullPage: true });
    console.log('Mobile screenshot saved to management-screenshot-mobile.png');

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Mobile test error:', err);
    process.exit(1);
  }
})();
