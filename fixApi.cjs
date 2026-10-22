const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const targetUrl = "https://firestore.googleapis.com/v1/projects/dist-7b242/databases/(default)/documents/enquiries'";
const newUrl = "https://firestore.googleapis.com/v1/projects/dist-7b242/databases/(default)/documents/enquiries?key=AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc'";

if (code.includes(targetUrl)) {
    code = code.replace(targetUrl, newUrl);
    fs.writeFileSync('assets/index-BM-yEkkk.js', code);
    console.log('API Key added!');
} else {
    console.log('URL not found in bundle.');
}
