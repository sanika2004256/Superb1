const fs = require('fs');
let file = fs.readdirSync('public/assets').find(f => f.startsWith('index-v19'));
let code = fs.readFileSync('public/assets/' + file, 'utf8');

let regex = /className:\`[^\`]*transition-[^\`]*\`/g;
let matches = [];
let match;
while ((match = regex.exec(code)) !== null) {
    let snippet = code.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50);
    if (snippet.includes('img') || snippet.includes('bg-')) {
        matches.push(snippet);
    }
}
matches.forEach(m => {
    if (m.includes('img')) {
        console.log("IMG:", m);
    }
});
