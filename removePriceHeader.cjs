const fs = require('fs');

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf('Official Price List');
  if (idx === -1) {
    console.log('Official Price List not found in:', filePath);
    return;
  }

  const start = content.lastIndexOf('(0,k.jsx)(oO,', idx);
  // Find the start of the next sibling: (0,k.jsxs)(`div`,{className:`space-y-3 mb-6`
  const siblingMarker = '(0,k.jsxs)(`div`,{className:`space-y-3 mb-6`';
  const end = content.indexOf(siblingMarker, idx);

  if (start === -1 || end === -1) {
    console.log('Could not find bounds:', { start, end });
    return;
  }

  const target = content.substring(start, end);
  console.log('Found target to remove in', filePath, 'length:', target.length);
  console.log('Target snippet:', target.substring(0, 100), '...', target.substring(target.length - 50));

  // Replace with empty string or null, (since it is an item in a children array: children: [ <here>, (0,k.jsxs)... ])
  // In React, null in children array is perfectly safe.
  content = content.substring(0, start) + 'null,' + content.substring(end);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched:', filePath);
}

// Backup first
for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, p + '.bak_' + Date.now());
    patch(p);
  }
}
