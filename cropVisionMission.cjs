const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2' });
  
  const el = await page.$('section.grid');
  if (el) {
    await el.screenshot({ path: 'vision-mission-crop.png' });
    console.log('Cropped vision-mission successfully');
  } else {
    console.log('section.grid not found');
  }
  await browser.close();
})();
