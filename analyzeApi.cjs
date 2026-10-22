const fs = require('fs');
const content = fs.readFileSync('assets/' + fs.readdirSync('assets').find(f => f.startsWith('index') && f.endsWith('.js')), 'utf8');
const fetchMatches = content.match(/fetch\(['"]([^'"]+)['"]/g);
console.log("Fetches: ", fetchMatches ? [...new Set(fetchMatches)] : 'None');
const axiosMatches = content.match(/axios\.post\(['"]([^'"]+)['"]/g);
console.log("Axios: ", axiosMatches ? [...new Set(axiosMatches)] : 'None');
console.log("Contains 'emailjs': ", content.includes('emailjs'));
console.log("Contains 'formspree': ", content.includes('formspree'));
