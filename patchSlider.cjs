const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// 1. Remove Ken Burns animation
code = code.replace(/\`animate-kenburns\`/g, '\`\`');

// 2. Remove text animations
code = code.replace(/\s*transition-all duration-700 delay-100 \${[^}]+}/g, '');
code = code.replace(/\s*transition-all duration-700 delay-200 \${[^}]+}/g, '');
code = code.replace(/\s*transition-all duration-700 delay-300 \${[^}]+}/g, '');

// 3. Hide CTA Buttons
// The container is: `flex flex-wrap items-center gap-3 sm:gap-4 pt-2 transition-all duration-700 delay-400 ${...}`
code = code.replace(/className:\`flex flex-wrap items-center gap-3 sm:gap-4 pt-2 transition-all duration-700 delay-400 \${[^}]+\}\`/g, 'className:`hidden`');

// 4. Hide Left and Right Arrows
// Left Arrow starts with: (0,k.jsx)(`button`,{onClick:()=>{n(e=>e===0?eO.length-1:e-1)},className:`absolute left-4 top-1/2
// Right Arrow starts with: (0,k.jsx)(`button`,{onClick:()=>{n(e=>e===eO.length-1?0:e+1)},className:`absolute right-4 top-1/2
code = code.replace(/className:\`absolute left-4 top-1\/2 -translate-y-1\/2 z-20/g, 'className:`hidden absolute left-4 top-1/2 -translate-y-1/2 z-20');
code = code.replace(/className:\`absolute right-4 top-1\/2 -translate-y-1\/2 z-20/g, 'className:`hidden absolute right-4 top-1/2 -translate-y-1/2 z-20');

// 5. Hide the slider dots (pagination buttons) just in case they count as buttons
// className:`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300
code = code.replace(/className:\`flex items-center justify-center gap-2 sm:gap-3 absolute bottom-6 sm:bottom-8 left-1\/2 -translate-x-1\/2 z-20/g, 'className:`hidden`');


fs.writeFileSync('assets/index-BM-yEkkk.js', code);
fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
console.log('Slider animations and buttons removed!');
