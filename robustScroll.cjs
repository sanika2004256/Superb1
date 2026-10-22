const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the current scroll scripts with a more robust one
html = html.replace(/<script>\s*if \('scrollRestoration' in history\).*?<\/script>/s, '');
html = html.replace(/<!-- Scroll to Top on Navigation -->.*?<\/script>/s, '');
html = html.replace('<!-- Force Scroll to Top on Refresh -->', '');

const newScript = `
    <!-- Robust Scroll to Top -->
    <script>
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      function forceScroll() {
          window.scrollTo(0, 0);
      }
      
      // Run immediately
      forceScroll();
      
      // Run after React mounts
      const observer = new MutationObserver((mutations) => {
          if (document.body.scrollHeight > 1000) {
              forceScroll();
              setTimeout(forceScroll, 100);
              observer.disconnect();
          }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Hook into SPA navigation
      const originalPushState = history.pushState;
      history.pushState = function() {
          originalPushState.apply(this, arguments);
          forceScroll();
          setTimeout(forceScroll, 50);
          setTimeout(forceScroll, 150);
      };
      
      const originalReplaceState = history.replaceState;
      history.replaceState = function() {
          originalReplaceState.apply(this, arguments);
          forceScroll();
      };
      
      window.addEventListener('popstate', function() {
          forceScroll();
          setTimeout(forceScroll, 100);
      });
    </script>
`;

html = html.replace('</body>', newScript + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Robust scroll script injected');
