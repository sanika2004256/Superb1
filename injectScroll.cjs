const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const scrollScript = `
    <!-- Scroll to Top on Navigation -->
    <script>
      (function() {
          const originalPushState = history.pushState;
          history.pushState = function() {
              originalPushState.apply(this, arguments);
              window.scrollTo(0, 0);
          };
          window.addEventListener('popstate', function() {
              window.scrollTo(0, 0);
          });
      })();
    </script>
`;

if (!html.includes('Scroll to Top on Navigation')) {
    html = html.replace('</body>', scrollScript + '</body>');
    fs.writeFileSync('index.html', html);
    console.log('Scroll script injected into index.html');
} else {
    console.log('Already injected');
}
