const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 850 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  console.log('Navigating to http://localhost:5173/gallery ...');
  await page.goto('http://localhost:5173/gallery', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot grid
  await page.screenshot({ path: 'verify_gallery_grid.png' });
  console.log('Saved verify_gallery_grid.png');

  // Click first card to open Lightbox
  await page.evaluate(() => {
    const card = document.querySelector('.grid .cursor-pointer');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot front view in Lightbox
  await page.screenshot({ path: 'verify_gallery_modal_front.png' });
  console.log('Saved verify_gallery_modal_front.png');

  // Click Back & Nutrition tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const backBtn = btns.find(b => b.textContent.includes('Back & Nutrition'));
    if (backBtn) backBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot back view in Lightbox
  await page.screenshot({ path: 'verify_gallery_modal_back.png' });
  console.log('Saved verify_gallery_modal_back.png');

  console.log('Errors encountered:', errors);
  await browser.close();
})();
