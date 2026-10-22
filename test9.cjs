const fs = require('fs'); const content = fs.readFileSync('products-dump.html', 'utf8'); const match = content.match(/id=\"products\"/g); console.log('Matches:', match);
