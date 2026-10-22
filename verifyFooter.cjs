const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // 1. Desktop Check (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/?v=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 800));

  const desktopCheck = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { error: 'No footer found' };
    const text = footer.innerText;
    return {
      hasNewsletter: text.includes('SUPERB MEGACORP TRADE NETWORK') || text.includes('Stay Ahead With Corporate'),
      hasQuickLinks: text.includes('QUICK LINKS'),
      hasBrandsProducts: text.includes('BRANDS & PRODUCTS'),
      hasActiveTradeDestinations: text.includes('Active Trade Destinations'),
      hasLogo: !!footer.querySelector('img[alt="Superb MegaCorp Logo"]'),
      hasFSSAI: text.includes('FSSAI Certified Unit'),
      hasGlobalGAP: text.includes('GlobalGAP Export'),
      hasSangliMIDC: text.includes('Sangli MIDC Plant'),
      hasFarmBadges: text.includes('40,000+ Acres Farm'),
      hasCommercialDesk: text.includes('Commercial Desk'),
      hasAddress: text.includes('Survey No.655/2'),
      hasPhone: text.includes('1800 209 5001'),
      hasEmail: text.includes('hello@superbmegacorp.com'),
      hasEnquiryBtn: text.includes('Send Commercial Enquiry'),
      hasCopyright: text.includes('Superbmegacorp. All Rights Reserved.'),
      hasPrivacyPolicy: text.includes('Privacy Policy'),
      hasTerms: text.includes('Terms & Conditions'),
      hasCompliance: text.includes('FSSAI Compliance')
    };
  });

  console.log('Desktop Footer Check:', JSON.stringify(desktopCheck, null, 2));

  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'Superb-main/footer_desktop_updated.png' });
    console.log('Saved footer_desktop_updated.png');
  }

  // 2. Tablet Check (768px)
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise(r => setTimeout(r, 600));
  if (footerEl) {
    await footerEl.screenshot({ path: 'Superb-main/footer_tablet_updated.png' });
    console.log('Saved footer_tablet_updated.png');
  }

  // 3. Mobile Check (390px iPhone)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 600));
  if (footerEl) {
    await footerEl.screenshot({ path: 'Superb-main/footer_mobile_updated.png' });
    console.log('Saved footer_mobile_updated.png');
  }

  // 4. Test button functionality: Click "Send Commercial Enquiry" in footer
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('footer button')).find(b => b.innerText.includes('Send Commercial Enquiry'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const modalOpened = await page.evaluate(() => {
    const modal = document.querySelector('.fixed.inset-0.z-50') || document.querySelector('[role="dialog"]') || document.querySelector('.backdrop-blur-sm');
    return !!modal;
  });
  console.log('Send Commercial Enquiry modal opened successfully:', modalOpened);

  console.log('Errors logged:', errors.length);
  if (errors.length > 0) {
    console.log('Errors detail:', errors);
  }

  await browser.close();
  process.exit(0);
})();
