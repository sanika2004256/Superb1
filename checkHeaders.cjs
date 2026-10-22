const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

let idx = content.indexOf('path:`/gallery`');
console.log('Gallery route:', content.substring(idx - 100, idx + 200));

let idxBlog = content.indexOf('path:`/blogs`');
console.log('Blogs route:', content.substring(idxBlog - 100, idxBlog + 200));
