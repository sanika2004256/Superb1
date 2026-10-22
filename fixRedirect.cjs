const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block to remove:
// <!-- Redirect to Home on Refresh -->
// <script>
//   (function() {
//       const currentPath = window.location.pathname;
//       // Don't redirect if we are already on home, or if we are in admin panel
//       if (currentPath !== '/' && !currentPath.startsWith('/admin')) {
//           // Redirect to home page
//           history.replaceState(null, '', '/');
//       }
//   })();
// </script>

const startIdx = html.indexOf('<!-- Redirect to Home on Refresh -->');
if (startIdx !== -1) {
    const endStr = '</script>';
    const endIdx = html.indexOf(endStr, startIdx);
    if (endIdx !== -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx + endStr.length);
        console.log('Removed aggressive redirect!');
    }
}

// Ensure hash is stripped instead!
if (!html.includes('<!-- Strip Hash on Load -->')) {
    html = html.replace('<!-- Scroll to Top on Load/Refresh Only -->', `<!-- Strip Hash on Load -->
    <script>
      if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    </script>
    <!-- Scroll to Top on Load/Refresh Only -->`);
}

fs.writeFileSync('index.html', html);
console.log('Fixed index.html redirects.');
