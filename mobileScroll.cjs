const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the previous robust script
const oldScript = html.substring(html.indexOf('<!-- Robust Scroll to Top -->'), html.indexOf('</script>', html.indexOf('<!-- Robust Scroll to Top -->')) + 9);
html = html.replace(oldScript, '');

const newScript = `
    <!-- Mobile Robust Scroll to Top -->
    <script>
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      function forceScroll() {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          
          // If there's an overflow wrapper, scroll it too
          const root = document.getElementById('root');
          if (root) root.scrollTop = 0;
      }
      
      // Run immediately
      forceScroll();
      
      // Run multiple times for mobile browsers that delay rendering or layout
      const intervals = [10, 50, 100, 250, 500, 1000];
      intervals.forEach(ms => setTimeout(forceScroll, ms));
      
      // Also observe for large content additions (React mounts)
      const observer = new MutationObserver((mutations) => {
          if (document.body.scrollHeight > 500 || (document.getElementById('root') && document.getElementById('root').scrollHeight > 500)) {
              forceScroll();
              setTimeout(forceScroll, 50);
              setTimeout(forceScroll, 200);
              observer.disconnect();
          }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Hook into SPA navigation
      const originalPushState = history.pushState;
      history.pushState = function() {
          originalPushState.apply(this, arguments);
          forceScroll();
          setTimeout(forceScroll, 100);
          setTimeout(forceScroll, 300);
      };
      
      const originalReplaceState = history.replaceState;
      history.replaceState = function() {
          originalReplaceState.apply(this, arguments);
          forceScroll();
      };
      
      window.addEventListener('popstate', function() {
          forceScroll();
          setTimeout(forceScroll, 100);
          setTimeout(forceScroll, 300);
      });
      
      window.addEventListener('load', function() {
          forceScroll();
      });
    </script>
`;

html = html.replace('</body>', newScript + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Mobile robust scroll script injected');
