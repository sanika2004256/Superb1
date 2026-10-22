const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  const pages = [
    { name: 'home', url: 'http://localhost:5173/' },
    { name: 'about', url: 'http://localhost:5173/about' },
    { name: 'products', url: 'http://localhost:5173/products' },
    { name: 'gallery', url: 'http://localhost:5173/gallery' }
  ];

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'full_mobile_' + p.name + '.png', fullPage: true });
  }

  // Also test hamburger menu on Home
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  const btns = await page.$$('header button');
  if (btns.length > 0) {
    // last button in header is hamburger
    await btns[btns.length - 1].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'full_mobile_menu_open.png', fullPage: false });
  }

  await browser.close();
  console.log('Mobile screenshots captured successfully!');
})();
