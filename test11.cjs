const fs = require('fs'); const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8'); const match = content.match(/placeholder:\Search[^\]*\/g); console.log(match);
