const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

const target = 'Instant 1-Click Demo Access:';
const idx = code.indexOf(target);
if (idx !== -1) {
    // We will slice from a known start point before the target to a known end point.
    // Let's find the start of the div
    const blockStartStr = ',(0,k.jsxs)(div,{className:p-4 sm:p-5 mt-6 bg-slate-50';
    let blockStart = code.lastIndexOf(blockStartStr, idx);
    if (blockStart === -1) {
       console.log('Could not find start block, trying alternate');
       blockStart = code.lastIndexOf(',(0,k.jsxs)(div,{className:p-4 sm:p-5 mt-6 bg-slate-50 rounded-2xl', idx);
    }
    
    // Find the end of the block. After "Demo Admin" there is })]})]})
    const demoAdminStr = 'children:Demo Admin})]})]}),';
    let blockEnd = code.indexOf(demoAdminStr, idx);
    
    if (blockStart !== -1 && blockEnd !== -1) {
        blockEnd = blockEnd + demoAdminStr.length - 1; // remove the trailing comma or not?
        // Let's just remove the block from blockStart to blockEnd
        // wait, demoAdminStr ends with })]})]}),. If we remove from , to ,, we should keep one ,.
        const toRemove = code.substring(blockStart, blockEnd);
        code = code.replace(toRemove, '');
        fs.writeFileSync('assets/index-BM-yEkkk.js', code);
        console.log('Successfully removed the Demo Access section.');
    } else {
        console.log('Could not locate exact block boundaries. Start:', blockStart, 'End:', blockEnd);
    }
} else {
    console.log('Target string not found.');
}
