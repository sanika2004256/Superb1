const fs = require('fs');
let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

const target = 'style:{backgroundImage:`url(${n.bgImage})`}';
const replacement = 'style:{backgroundImage: window.innerWidth < 768 ? `url(${ {1:"/images/new_slide_4.png",2:"/images/new_slide_3.png",3:"/images/new_slide_2.png",4:"/images/new_slide_1.png",5:"/images/new_slide_5.png"}[n.id] })` : `url(${n.bgImage})`}';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
    try { fs.writeFileSync('assets/index-v21-1790395955858.js', code); } catch(e){}
    try { fs.writeFileSync('dist/assets/index-v21-1790395955858.js', code); } catch(e){}
    console.log('Applied mobile images logic!');
} else {
    console.log('Target style not found');
}
