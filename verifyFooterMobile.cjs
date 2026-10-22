const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  // 1. Mobile 390px (iPhone 12/13/14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/?v=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));

  let footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'Superb-main/footer_mobile_390.png' });
    console.log('Saved footer_mobile_390.png');
  }

  // 2. Mobile 360px (Standard Android)
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 600));
  footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'Superb-main/footer_mobile_360.png' });
    console.log('Saved footer_mobile_360.png');
  }

  // 3. Test "Send Commercial Enquiry" modal
  console.log('Testing Send Commercial Enquiry click...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('footer button')).find(b => b.innerText.includes('Send Commercial Enquiry'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const modalInfo = await page.evaluate(() => {
    const modal = document.querySelector('.fixed.inset-0.z-50') || document.querySelector('[role="dialog"]') || document.querySelector('.backdrop-blur-sm');
    return {
      modalFound: !!modal,
      text: modal ? modal.innerText.substring(0, 100) : null
    };
  });
  console.log('Modal Check:', JSON.stringify(modalInfo, null, 2));

  await page.screenshot({ path: 'Superb-main/footer_enquiry_modal.png' });
  console.log('Saved footer_enquiry_modal.png');

  await browser.close();
  console.log('Done testing mobile and modal!');
  process.exit(0);
})();
