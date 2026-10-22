puppeteer = require('puppeteer');
const fs = require('fs');

const pagesToAudit = [
  { name: 'home', url: 'http://localhost:5173/' },
  { name: 'about', url: 'http://localhost:5173/about' },
  { name: 'products', url: 'http://localhost:5173/products' },
  { name: 'gallery', url: 'http://localhost:5173/gallery' },
  { name: 'login', url: 'http://localhost:5173/login' },
  { name: 'checkout', url: 'http://localhost:5173/checkout' }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const auditResults = {};

  for (const p of pagesToAudit) {
    const page = await browser.newPage();
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => consoleLogs.push({ type: 'pageerror', text: err.toString() }));

    // Desktop
    await page.setViewport({ width: 1280, height: 850 });
    try {
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1200));

      const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const desktopClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const hasHScrollDesktop = desktopScrollWidth > desktopClientWidth;

      await page.screenshot({ path: `audit_${p.name}_desktop.png`, fullPage: false });

      // Mobile
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await new Promise(r => setTimeout(r, 600));

      const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const mobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const hasHScrollMobile = mobileScrollWidth > mobileClientWidth;

      await page.screenshot({ path: `audit_${p.name}_mobile.png`, fullPage: false });

      auditResults[p.name] = {
        status: 'ok',
        hasHScrollDesktop,
        desktopScrollWidth,
        desktopClientWidth,
        hasHScrollMobile,
        mobileScrollWidth,
        mobileClientWidth,
        errors: consoleLogs.filter(l => l.type === 'error' || l.type === 'pageerror')
      };
    } catch (err) {
      auditResults[p.name] = { status: 'failed', error: err.message };
    }
    await page.close();
  }

  // Also test Cart Drawer on Home
  const cartPage = await browser.newPage();
  await cartPage.setViewport({ width: 1280, height: 850 });
  await cartPage.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1000));
  // Find cart button and click
  const cartBtn = await cartPage.$('button[title*="Cart"], button[aria-label*="Cart"]');
  if (cartBtn) {
    await cartBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await cartPage.screenshot({ path: `audit_cart_drawer_desktop.png` });
  }
  await cartPage.close();

  await browser.close();

  fs.writeFileSync('audit_results.json', JSON.stringify(auditResults, null, 2));
  console.log('AUDIT COMPLETED! Results written to audit_results.json');
})();
