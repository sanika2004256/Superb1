const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const errors = [];
    page.on('console', msg => {
      console.log('CONSOLE [' + msg.type() + ']:', msg.text());
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => {
      console.log('PAGE ERROR:', err.toString());
      errors.push(err.toString());
    });

    console.log('Navigating to http://localhost:5173/about ...');
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2', timeout: 15000 });

    await new Promise(r => setTimeout(r, 1500));

    await page.screenshot({ path: 'about-screenshot.png', fullPage: true });
    console.log('Screenshot saved to about-screenshot.png. Error count:', errors.length);

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
