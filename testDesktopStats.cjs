const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const cssInjection = `
    @media (max-width: 767px) {
      .stats-section-wrap {
        margin: 8px auto 14px auto !important;
        padding: 0 10px !important;
      }
      .stats-card-container {
        padding: 10px 8px 8px 8px !important;
        border-radius: 14px !important;
      }
      .stats-grid-row {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        overflow-x: visible !important;
        gap: 6px !important;
        padding: 0 !important;
      }
      .stats-item-col {
        flex: none !important;
        min-width: 0 !important;
        max-width: none !important;
        width: 100% !important;
        background: #f8fafc !important;
        border-radius: 10px !important;
        border: 1px solid #e2e8f0 !important;
        padding: 8px 6px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        box-sizing: border-box !important;
      }
      .stats-item-col:nth-child(5) {
        grid-column: span 2 !important;
        max-width: 220px !important;
        margin: 0 auto !important;
      }
      .stats-icon-badge {
        width: 28px !important;
        height: 28px !important;
        border-radius: 8px !important;
        margin-bottom: 3px !important;
      }
      .stats-icon-badge svg {
        width: 14px !important;
        height: 14px !important;
      }
      .stats-num-wrap {
        font-size: 18px !important;
        line-height: 1.1 !important;
      }
      .stats-suffix-unit {
        font-size: 11px !important;
      }
      .stats-label {
        font-size: 11px !important;
        margin-top: 2px !important;
        line-height: 1.2 !important;
      }
      .stats-desc {
        font-size: 9.5px !important;
        margin-top: 2px !important;
        line-height: 1.25 !important;
        max-width: 155px !important;
      }
      .stats-mobile-hint {
        display: none !important;
      }
    }
  `;

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.addStyleTag({ content: cssInjection });
  await new Promise(r => setTimeout(r, 1000));

  const statsEl = await page.$('#stats');
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/verify_stats_desktop_check.png' });
    console.log('Saved verify_stats_desktop_check.png');
  }

  await browser.close();
  process.exit(0);
})();
