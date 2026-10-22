const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  // 1. Mobile verification
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  await mobilePage.evaluate(async () => {
    const el = document.querySelector('#management');
    if (el) {
      el.scrollIntoView();
      // Force eager loading for screenshots
      document.querySelectorAll('#management img').forEach(img => {
        img.loading = 'eager';
      });
    }
  });
  await new Promise(r => setTimeout(r, 2500));

  const mobileSection = await mobilePage.$('#management');
  if (mobileSection) {
    await mobileSection.screenshot({ path: 'Superb-main/verify_owners_mobile_fixed.png' });
    console.log('Saved verify_owners_mobile_fixed.png');
  }

  // 2. Desktop verification
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  await desktopPage.evaluate(async () => {
    const el = document.querySelector('#management');
    if (el) {
      el.scrollIntoView();
      document.querySelectorAll('#management img').forEach(img => {
        img.loading = 'eager';
      });
    }
  });
  await new Promise(r => setTimeout(r, 2500));

  const desktopSection = await desktopPage.$('#management');
  if (desktopSection) {
    await desktopSection.screenshot({ path: 'Superb-main/verify_owners_desktop_fixed.png' });
    console.log('Saved verify_owners_desktop_fixed.png');
  }

  await browser.close();
})();
