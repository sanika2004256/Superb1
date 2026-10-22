const fs = require('fs');
const acorn = require('acorn');

const jsFiles = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of jsFiles) {
  let content = fs.readFileSync(f, 'utf8');

  // Exact Switcher Block to remove
  const oldSwitcher = `              imgList.length>1&&(0,k.jsx)(\`div\`,{
                className:\`product-img-switcher\`,
                onClick:ev=>ev.stopPropagation(),
                children:imgList.map((item,idx)=>(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`product-switcher-btn \${curIdx===idx?\`active\`:\`\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`product-switcher-dot\`}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-full\`,children:item.label}),
                    (0,k.jsx)(\`span\`,{className:\`card-label-short\`,children:item.key===\`front\`?\`Front\`:item.key===\`back\`?\`Back\`:\`Box\`})
                  ]
                }))
              })`;

  if (!content.includes(oldSwitcher)) {
    console.error(`oldSwitcher not found in ${f}`);
    process.exit(1);
  }

  // Remove the switcher block
  content = content.replace(oldSwitcher, `/* switcher line removed */`);

  // Validate with Acorn
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn validation passed for ${f}!`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Saved ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}

// Also update CSS to make arrow buttons accessible on mobile as well
const cssFiles = [
  'assets/index-BvH2rQN2.css',
  'public/assets/index-BvH2rQN2.css'
];

for (const cssPath of cssFiles) {
  let css = fs.readFileSync(cssPath, 'utf8');
  // Make arrows flex on all screen sizes (with compact 24px on mobile)
  css = css.replace(
    `.product-card-arrow-prev,
.product-card-arrow-next {
  display: none;`,
    `.product-card-arrow-prev,
.product-card-arrow-next {
  display: flex;`
  );
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log(`Updated arrows display in ${cssPath}`);
}

console.log('All updates completed successfully!');
