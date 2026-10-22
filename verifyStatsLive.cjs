const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Disable cache to ensure fresh CSS
  await page.setCacheEnabled(false);

  // 1. Mobile 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/?nocache=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  const statsEl = await page.$('#stats');
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/final_stats_mobile_390.png' });
    console.log('Saved final_stats_mobile_390.png');
  }

  // Also full hero + stats screenshot
  await page.screenshot({ path: 'Superb-main/final_hero_and_stats_mobile.png' });
  console.log('Saved final_hero_and_stats_mobile.png');

  // 2. Mobile 360px
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 800));
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/final_stats_mobile_360.png' });
    console.log('Saved final_stats_mobile_360.png');
  }

  // 3. Desktop 1280px
  await page.setViewport({ width: 1280, height: 900, isMobile: false });
  await new Promise(r => setTimeout(r, 800));
  const statsElDesktop = await page.$('#stats');
  if (statsElDesktop) {
    await statsElDesktop.screenshot({ path: 'Superb-main/final_stats_desktop.png' });
    console.log('Saved final_stats_desktop.png');
  }

  await browser.close();
  console.log('All verification screenshots captured successfully!');
  process.exit(0);
})();
