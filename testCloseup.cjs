const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  
  const frame = await page.$('.directors-gold-frame');
  if (frame) {
    await frame.screenshot({ path: 'directors-card-closeup.png' });
    console.log('Saved closeup to directors-card-closeup.png');
  } else {
    console.log('Element not found');
  }
  await browser.close();
})();
