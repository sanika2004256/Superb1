const fs = require('fs'); const content = fs.readFileSync('products-dump.html', 'utf8'); const regex = /<div class=\"[^\"]*bg-white[^\"]*shadow-xs[^\"]*\"/g; console.log(content.match(regex));
