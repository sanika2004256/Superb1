const fs = require('fs');
const acorn = require('acorn');

console.log('--- Fixing Management Director Image Alignment ---');

// 1. Update CSS files
const cssFiles = [
  'assets/index-BvH2rQN2.css',
  'public/assets/index-BvH2rQN2.css'
];

for (const f of cssFiles) {
  let css = fs.readFileSync(f, 'utf8');

  // Replace any existing director card rules in our added section
  const oldRuleRegex = /\/\* 5\. Executive Director Cards on Mobile \*\/[\s\S]*?#management \.aspect-square\s*\{[\s\S]*?\}/g;
  const newRule = `/* 5. Executive Director Cards Alignment (1:1 Natural Square Framing) */
.director-card-img-wrap,
#management .aspect-square {
  aspect-ratio: 1 / 1 !important;
  height: auto !important;
  width: 100% !important;
}
.director-card-img-wrap img,
#management .aspect-square img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
}`;

  if (oldRuleRegex.test(css)) {
    css = css.replace(oldRuleRegex, newRule);
    console.log(`Updated director CSS rules in ${f}`);
  } else {
    // If not found, append clean rule
    css += '\n' + newRule;
    console.log(`Appended director CSS rules to ${f}`);
  }

  fs.writeFileSync(f, css, 'utf8');
}

// 2. Update JS files to ensure object-center
const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Replace object-top with object-center for director cards
  if (content.includes('object-cover object-top transition-transform')) {
    content = content.replace(
      'object-cover object-top transition-transform',
      'object-cover object-center transition-transform'
    );
    console.log(`Changed object-top to object-center in ${f}`);
  }

  // Acorn validation
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn validation passed for ${f}`);
    fs.writeFileSync(f, content, 'utf8');
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}

console.log('Management images aligned successfully!');
