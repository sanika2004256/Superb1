const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

(async () => {
  const app = express();
  const superbDir = path.join(__dirname);

  app.use(express.static(superbDir));
  app.use((req, res) => {
    res.sendFile(path.join(superbDir, 'index.html'));
  });

  const server = app.listen(3333, async () => {
    console.log('Test server running on port 3333');

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const pageErrors = [];
      page.on('pageerror', err => pageErrors.push(err.message));
      page.on('console', msg => {
        if (msg.type() === 'error') {
          pageErrors.push(msg.text());
        }
      });

      console.log('Navigating to Home page http://localhost:3333/ ...');
      await page.goto('http://localhost:3333/', { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const homeCheck = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        return {
          hasSendBusinessMessage: bodyText.includes('Send A Business Message'),
          hasPowerYourGrowth: bodyText.includes('We Are Ready To Power Your Growth'),
          hasConnectWithSuperb: bodyText.includes('CONNECT WITH SUPERB') || bodyText.includes('Connect With Superb'),
          hasBlogsSection: !!document.querySelector('#blogs'),
          hasFooter: !!document.querySelector('footer')
        };
      });

      console.log('Home Page Check Result:', JSON.stringify(homeCheck, null, 2));

      // Scroll to bottom of home page and screenshot
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(superbDir, 'verify_home_no_contact.png') });
      console.log('Saved verify_home_no_contact.png');

      // Now check Contact page
      console.log('Navigating to Contact page http://localhost:3333/contact ...');
      await page.goto('http://localhost:3333/contact', { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const contactCheck = await page.evaluate(() => {
        const bodyText = document.body.innerText;
        return {
          hasSendBusinessMessage: bodyText.includes('Send A Business Message'),
          hasPowerYourGrowth: bodyText.includes('We Are Ready To Power Your Growth'),
          hasFooter: !!document.querySelector('footer')
        };
      });

      console.log('Contact Page Check Result:', JSON.stringify(contactCheck, null, 2));
      await page.screenshot({ path: path.join(superbDir, 'verify_contact_page_intact.png') });
      console.log('Saved verify_contact_page_intact.png');

      console.log('Console / Page Errors recorded:', pageErrors.length);
      if (pageErrors.length > 0) {
        console.log('Errors:', pageErrors);
      }

      await browser.close();
      server.close();
      console.log('Verification completed successfully!');
      process.exit(0);
    } catch (err) {
      console.error('Error during verification:', err);
      server.close();
      process.exit(1);
    }
  });
})();
