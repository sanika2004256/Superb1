const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.jsx', 'utf8');

// Find Hero section start and About section end
const heroStartStr = '{/* Hero Section */}';
const aboutEndStr = '</div>\n        </div>\n\n        <div className="flex justify-end pt-4">';

const heroStartIndex = code.indexOf(heroStartStr);
const aboutEndIndex = code.indexOf(aboutEndStr);

if (heroStartIndex !== -1 && aboutEndIndex !== -1) {
    // Delete the chunk between Hero section start and About section end (excluding the save button div)
    code = code.substring(0, heroStartIndex) + '<div className="flex justify-end pt-4">';
    fs.writeFileSync('src/pages/Settings.jsx', code);
    console.log('Removed Hero and About sections.');
} else {
    console.log('Could not find sections.');
}
