const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let replaceStr = `if (currentPath !== '/' && !currentPath.startsWith('/admin')) {
              // Redirect to home page
              history.replaceState(null, '', '/');
          } else if (window.location.hash) {
              history.replaceState(null, '', window.location.pathname);
          }`;

html = html.replace(`if (currentPath !== '/' && !currentPath.startsWith('/admin')) {
              // Redirect to home page
              history.replaceState(null, '', '/');
          }`, replaceStr);

fs.writeFileSync('index.html', html);
console.log('Fixed hash redirect in index.html');
