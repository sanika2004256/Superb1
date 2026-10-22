const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const additionalScript = `
    <!-- Force Scroll to Top on Refresh -->
    <script>
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    </script>
`;

if (!html.includes('Force Scroll to Top on Refresh')) {
    // Insert it in the head or early body
    html = html.replace('<head>', '<head>' + additionalScript);
    fs.writeFileSync('index.html', html);
    console.log('Scroll restoration script injected into index.html');
} else {
    console.log('Already injected');
}
