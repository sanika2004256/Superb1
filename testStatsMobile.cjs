const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Style Option 1: 2-column responsive grid on mobile with 5th card spanning full width
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-stats-style';
    style.textContent = `
      @media (max-width: 767px) {
        .stats-section-wrap {
          margin: 10px auto 16px auto !important;
          padding: 0 10px !important;
        }
        .stats-card-container {
          padding: 12px 10px 10px 10px !important;
          border-radius: 16px !important;
        }
        .stats-grid-row {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          overflow-x: visible !important;
          gap: 8px !important;
          padding: 0 !important;
        }
        .stats-item-col {
          flex: none !important;
          min-width: 0 !important;
          max-width: none !important;
          width: 100% !important;
          background: #f8fafc !important;
          border-radius: 12px !important;
          border: 1px solid #e2e8f0 !important;
          padding: 8px 6px !important;
          box-sizing: border-box !important;
        }
        .stats-item-col:nth-child(5) {
          grid-column: span 2 !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          padding: 8px 12px !important;
        }
        .stats-item-col:nth-child(5) .stats-icon-badge {
          margin-bottom: 0 !important;
        }
        .stats-item-col:nth-child(5) .stats-desc {
          display: none !important;
        }
        .stats-icon-badge {
          width: 30px !important;
          height: 30px !important;
          border-radius: 8px !important;
          margin-bottom: 4px !important;
        }
        .stats-num-wrap {
          font-size: 19px !important;
          line-height: 1.1 !important;
        }
        .stats-suffix-unit {
          font-size: 11px !important;
        }
        .stats-label {
          font-size: 11px !important;
          margin-top: 2px !important;
        }
        .stats-desc {
          font-size: 9.5px !important;
          margin-top: 1px !important;
          max-width: 150px !important;
          line-height: 1.25 !important;
        }
      }
    `;
    document.head.appendChild(style);
  });

  const statsEl = await page.$('#stats');
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/stats_style1_grid2col.png' });
    console.log('Saved stats_style1_grid2col.png');
  }

  // Style Option 2: 2-column grid with 5th card normal (centered or 2 columns)
  await page.evaluate(() => {
    const style = document.getElementById('test-stats-style');
    style.textContent = `
      @media (max-width: 767px) {
        .stats-section-wrap {
          margin: 8px auto 16px auto !important;
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
          padding: 7px 5px !important;
        }
        .stats-item-col:nth-child(5) {
          grid-column: span 2 !important;
          max-width: 220px !important;
          margin: 0 auto !important;
        }
        .stats-icon-badge {
          width: 26px !important;
          height: 26px !important;
          border-radius: 7px !important;
          margin-bottom: 3px !important;
        }
        .stats-num-wrap {
          font-size: 17px !important;
        }
        .stats-suffix-unit {
          font-size: 10px !important;
        }
        .stats-label {
          font-size: 10.5px !important;
          margin-top: 1px !important;
        }
        .stats-desc {
          font-size: 9px !important;
          margin-top: 1px !important;
          line-height: 1.2 !important;
        }
      }
    `;
  });
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/stats_style2_compact2col.png' });
    console.log('Saved stats_style2_compact2col.png');
  }

  // Style Option 3: Horizontal scroll but with proper compact cards (3 cards visible or swipe indicator)
  // Let's test a 3-column scroll or 2.2 cards scroll with better spacing
  await page.evaluate(() => {
    const style = document.getElementById('test-stats-style');
    style.textContent = `
      @media (max-width: 767px) {
        .stats-section-wrap {
          margin: 8px auto 14px auto !important;
          padding: 0 8px !important;
        }
        .stats-card-container {
          padding: 10px 6px 8px 6px !important;
          border-radius: 14px !important;
        }
        .stats-grid-row {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          gap: 6px !important;
          padding: 2px !important;
        }
        .stats-item-col {
          flex: 0 0 calc((100% - 12px) / 3) !important;
          min-width: calc((100% - 12px) / 3) !important;
          max-width: calc((100% - 12px) / 3) !important;
          background: #f8fafc !important;
          border-radius: 10px !important;
          border: 1px solid #e2e8f0 !important;
          padding: 6px 4px !important;
          box-sizing: border-box !important;
        }
        .stats-icon-badge {
          width: 24px !important;
          height: 24px !important;
          border-radius: 6px !important;
          margin-bottom: 2px !important;
        }
        .stats-num-wrap {
          font-size: 15px !important;
        }
        .stats-suffix-unit {
          font-size: 9px !important;
        }
        .stats-label {
          font-size: 9.5px !important;
          margin-top: 1px !important;
        }
        .stats-desc {
          display: none !important;
        }
      }
    `;
  });
  if (statsEl) {
    await statsEl.screenshot({ path: 'Superb-main/stats_style3_3col_compact.png' });
    console.log('Saved stats_style3_3col_compact.png');
  }

  // Also full page mobile screenshot to see how it fits with the hero and the section below
  await page.screenshot({ path: 'Superb-main/stats_style3_page.png' });

  await browser.close();
  process.exit(0);
})();
