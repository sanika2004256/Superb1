const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#management', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    document.querySelectorAll('#management img').forEach(img => {
      const container = img.parentElement;
      container.style.height = '';
      container.className = 'w-full aspect-square bg-slate-100 overflow-hidden relative';
      img.className = 'w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105';
    });
  });

  const section = await page.$('#management');
  if (section) {
    await section.screenshot({ path: 'Superb-main/owners_aspect_square_desktop.png' });
    console.log('Saved owners_aspect_square_desktop.png');
  }

  await browser.close();
})();
