const fs = require('fs');

let f = fs.readdirSync('public/assets').find(f => f.startsWith('index-v15'));
if (!f) throw new Error("Could not find index-v15.js");
let filePath = 'public/assets/' + f;
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix image container height using inline style because h-32 is purged
code = code.replace(
  'className:`relative h-32 sm:h-60 bg-gradient-to-b from-slate-100/90 to-slate-50 p-2 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden`',
  'className:`relative bg-gradient-to-b from-slate-100/90 to-slate-50 p-2 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden`,style:{height:typeof window!=="undefined"&&window.innerWidth<640?"120px":"240px"}'
);

// 2. Fix footer spacing by adding mt-auto so it always sticks to the bottom
code = code.replace(
  'className:`p-2 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-2 sm:border-t sm:border-slate-100 mt-1 sm:mt-2`',
  'className:`p-2 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-2 sm:border-t sm:border-slate-100 mt-auto`'
);

// 3. Make sure the content wrapper expands (flex-1)
// The content wrapper is `className:\`p-2 sm:p-5 space-y-1 sm:space-y-2.5\``
code = code.replace(
  'className:`p-2 sm:p-5 space-y-1 sm:space-y-2.5`',
  'className:`p-2 sm:p-5 space-y-1 sm:space-y-2.5 flex-1 flex flex-col`'
);

fs.writeFileSync(filePath, code);
fs.writeFileSync('assets/' + f, code);
console.log('Fixed spacing!');
