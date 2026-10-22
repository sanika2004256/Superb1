const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/products', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Click first product card "Details"
  await page.evaluate(() => {
    const detailsButtons = Array.from(document.querySelectorAll('#products div, #products span, #products button, #products a'));
    const btn = detailsButtons.find(el => el.innerText && el.innerText.trim() === 'Details');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const modalInfo = await page.evaluate(() => {
    const modal = document.querySelector('.fixed.inset-0.z-50');
    if (!modal) return { found: false };
    return {
      found: true,
      text: modal.innerText,
      hasDistributorRate: modal.innerText.includes('Distributor B2B Rate'),
      hasRetailMRP: modal.innerText.includes('Retail Consumer MRP')
    };
  });
  console.log('Modal Check:', JSON.stringify(modalInfo, null, 2));

  await page.screenshot({ path: 'Superb-main/verify_retail_modal.png' });
  console.log('Saved verify_retail_modal.png');

  // Check product dedicated page
  // Let's get the id of first product
  const firstProductId = await page.evaluate(() => {
    const link = document.querySelector('a[href^="/product/"]');
    return link ? link.getAttribute('href') : '/product/1';
  });
  console.log('Navigating to:', firstProductId);
  await page.goto('http://localhost:5173' + firstProductId, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const productPageInfo = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasDistributorRate: text.includes('Distributor B2B Rate'),
      hasRetailPrice: text.includes('Retail Price (MRP)') || text.includes('Maximum Retail Price')
    };
  });
  console.log('Product Page Check:', JSON.stringify(productPageInfo, null, 2));

  await page.screenshot({ path: 'Superb-main/verify_retail_product_page.png' });
  console.log('Saved verify_retail_product_page.png');

  await browser.close();
})();
