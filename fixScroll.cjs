const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the robust script
html = html.replace(/<!-- Robust Scroll to Top -->.*?<\/script>/s, '');

// Insert a simple, initial-load-only scroll script
const newScript = `
    <!-- Scroll to Top on Load/Refresh Only -->
    <script>
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      
      // If the URL has a hash on initial load, remove it so the page doesn't auto-scroll down
      if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      
      // Force scroll to top on load
      function forceScroll() {
          window.scrollTo(0, 0);
      }
      forceScroll();
      
      // Wait for React to mount and force scroll to top one more time
      const observer = new MutationObserver((mutations) => {
          if (document.body.scrollHeight > 1000) {
              forceScroll();
              setTimeout(forceScroll, 100);
              observer.disconnect();
          }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    </script>
`;

html = html.replace('</body>', newScript + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Fixed script injected');
