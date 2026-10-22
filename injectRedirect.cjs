const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const redirectScript = `
    <!-- Redirect to Home on Refresh -->
    <script>
      (function() {
          const currentPath = window.location.pathname;
          // Don't redirect if we are already on home, or if we are in admin panel
          if (currentPath !== '/' && !currentPath.startsWith('/admin')) {
              // Redirect to home page
              history.replaceState(null, '', '/');
          }
      })();
    </script>
`;

if (!html.includes('Redirect to Home on Refresh')) {
    html = html.replace('<!-- Scroll to Top on Load/Refresh Only -->', redirectScript + '\n    <!-- Scroll to Top on Load/Refresh Only -->');
    fs.writeFileSync('index.html', html);
    console.log("Injected redirect script");
} else {
    console.log("Redirect script already injected");
}
