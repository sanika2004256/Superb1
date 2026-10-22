const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));

    const info = await page.evaluate(() => {
      const productsSection = document.querySelector('#products');
      if (!productsSection) return { error: 'No #products section' };

      const allSpans = Array.from(productsSection.querySelectorAll('span')).map(s => s.innerText);
      const showingSpan = allSpans.find(t => t.includes('Showing'));

      const cards = productsSection.querySelectorAll('.products-grid-5 > div');
      const cardTitles = Array.from(cards).map(c => {
        const titleEl = c.querySelector('a[title]') || c.querySelector('h3') || c.querySelector('a');
        return titleEl ? titleEl.innerText.trim() : 'Unknown';
      });

      return {
        showingSpan,
        cardCount: cards.length,
        cardTitles
      };
    });

    console.log('Products Info:', JSON.stringify(info, null, 2));

    const productsEl = await page.$('#products');
    if (productsEl) {
      await productsEl.screenshot({ path: 'Superb-main/verify_home_5products.png' });
      console.log('Screenshot saved to Superb-main/verify_home_5products.png');
    }

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  }
})();
