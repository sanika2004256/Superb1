const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'Instant 1-Click Demo Access';
let idx = code.indexOf(target);
if (idx !== -1) {
    let before = code.lastIndexOf(',(0,k.jsxs)(`div`,{className:`p-3.5 bg-slate-50', idx);
    let after = code.indexOf('Demo Admin`})]})]}),', idx);
    if (before !== -1 && after !== -1) {
        after += 'Demo Admin`})]})]}),'.length;
        let toRemove = code.substring(before, after);
        code = code.replace(toRemove, '');
        fs.writeFileSync('assets/index-BM-yEkkk.js', code);
        console.log('Removed ' + toRemove.length + ' chars.');
    } else {
        console.log('Could not find before/after. before:', before, 'after:', after);
    }
} else {
    console.log('Target not found');
}
