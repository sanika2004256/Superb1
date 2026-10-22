const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/#management', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Let's test different CSS styles in the browser live!
  // Test 1: Current
  const managementSection = await page.$('#management');
  if (managementSection) {
    await managementSection.screenshot({ path: 'Superb-main/owners_current_mobile.png' });
    console.log('Saved owners_current_mobile.png');
  }

  // Test 2: aspect-square (1/1) with object-cover object-center
  await page.evaluate(() => {
    document.querySelectorAll('#management img').forEach(img => {
      const container = img.parentElement;
      container.style.height = '';
      container.className = 'w-full aspect-square bg-slate-100 overflow-hidden relative';
      img.className = 'w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105';
    });
  });
  if (managementSection) {
    await managementSection.screenshot({ path: 'Superb-main/owners_aspect_square.png' });
    console.log('Saved owners_aspect_square.png');
  }

  // Test 3: aspect-[4/3] or aspect-[5/4] or height with object-center
  await page.evaluate(() => {
    document.querySelectorAll('#management img').forEach(img => {
      const container = img.parentElement;
      container.style.height = '280px';
      container.className = 'w-full bg-slate-100 overflow-hidden relative';
      img.className = 'w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105';
    });
  });
  if (managementSection) {
    await managementSection.screenshot({ path: 'Superb-main/owners_h280_center35.png' });
    console.log('Saved owners_h280_center35.png');
  }

  // Test 4: aspect-[4/3] with object-[center_25%]
  await page.evaluate(() => {
    document.querySelectorAll('#management img').forEach(img => {
      const container = img.parentElement;
      container.style.height = '';
      container.className = 'w-full aspect-[4/3] sm:aspect-square bg-slate-100 overflow-hidden relative';
      img.className = 'w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105';
    });
  });
  if (managementSection) {
    await managementSection.screenshot({ path: 'Superb-main/owners_aspect_4_3.png' });
    console.log('Saved owners_aspect_4_3.png');
  }

  await browser.close();
})();
