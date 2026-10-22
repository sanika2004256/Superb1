const fs = require('fs');
const path = require('path');

const cssFiles = [
  path.join(__dirname, 'assets/index-BvH2rQN2.css'),
  path.join(__dirname, 'public/assets/index-BvH2rQN2.css')
];

const newStatsCss = `/* 2. STATISTICS SECTION - RESPONSIVE 2-COLUMN CARDS ON MOBILE & 5-COLUMN ON DESKTOP */
.stats-section-wrap {
  position: relative !important;
  z-index: 20 !important;
  margin: 8px auto 16px auto !important;
  width: 100% !important;
  max-width: 1380px !important;
  padding: 0 10px !important;
  box-sizing: border-box !important;
}
@media (min-width: 640px) {
  .stats-section-wrap {
    padding: 0 16px !important;
    margin: 18px auto 28px auto !important;
  }
}

.stats-card-container {
  background-color: #ffffff !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.06) !important;
  border: 1px solid #f1f5f9 !important;
  padding: 10px 8px 8px 8px !important;
  position: relative !important;
  overflow: hidden !important;
}
@media (min-width: 640px) {
  .stats-card-container {
    padding: 18px 10px 16px 10px !important;
    border-radius: 18px !important;
  }
}

.stats-accent-bar {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 4px !important;
  background: linear-gradient(to right, #dc2626, #f59e0b, #10b981) !important;
}

/* Mobile: Compact 2-Column Responsive Card Grid (No horizontal overflow) */
.stats-grid-row {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  overflow-x: visible !important;
  gap: 6px !important;
  padding: 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Tablet, Laptop & Desktop (>= 768px): 1 Single Row of 5 Columns */
@media (min-width: 768px) {
  .stats-grid-row {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    gap: 0 !important;
  }
}

.stats-item-col {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  position: relative !important;
  box-sizing: border-box !important;
  min-width: 0 !important;
  transition: transform 0.2s ease !important;
}

/* Mobile specific item card styling */
@media (max-width: 767px) {
  .stats-item-col {
    flex: none !important;
    width: 100% !important;
    background: #f8fafc !important;
    border-radius: 10px !important;
    border: 1px solid #e2e8f0 !important;
    padding: 8px 6px !important;
  }
  .stats-item-col:nth-child(5) {
    grid-column: span 2 !important;
    max-width: 220px !important;
    margin: 0 auto !important;
  }
}

/* Tablet, Laptop & Desktop dividers (>= 768px) */
@media (min-width: 768px) {
  .stats-item-col {
    flex: 1 1 0 !important;
    background: transparent !important;
    border-radius: 0 !important;
    border: none !important;
    padding: 4px 6px !important;
  }
  .stats-item-col:not(:last-child) {
    border-right: 1px solid #f1f5f9 !important;
  }
}

.stats-icon-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px !important;
  height: 28px !important;
  border-radius: 8px !important;
  margin-bottom: 3px !important;
  flex-shrink: 0 !important;
  transition: all 0.2s ease !important;
}
.stats-icon-badge svg {
  width: 14px !important;
  height: 14px !important;
}
@media (min-width: 640px) {
  .stats-icon-badge {
    width: 38px !important;
    height: 38px !important;
    border-radius: 12px !important;
    margin-bottom: 6px !important;
  }
  .stats-icon-badge svg {
    width: 20px !important;
    height: 20px !important;
  }
}
.stats-item-col:hover .stats-icon-badge {
  transform: scale(1.06);
}

.stats-num-wrap {
  display: flex !important;
  align-items: baseline !important;
  justify-content: center !important;
  gap: 2px !important;
  font-family: Georgia, 'Times New Roman', serif !important;
  font-size: 18px !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  line-height: 1.1 !important;
  letter-spacing: -0.02em !important;
}
@media (min-width: 640px) {
  .stats-num-wrap {
    font-size: 23px !important;
    line-height: 1.15 !important;
  }
}
@media (min-width: 1024px) {
  .stats-num-wrap {
    font-size: 26px !important;
  }
}
@media (min-width: 1280px) {
  .stats-num-wrap {
    font-size: 28px !important;
  }
}

.stats-suffix-unit {
  font-size: 11px !important;
  font-weight: 700 !important;
  color: #475569 !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}
@media (min-width: 640px) {
  .stats-suffix-unit {
    font-size: 14px !important;
  }
}

.stats-label {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  margin-top: 2px !important;
  line-height: 1.2 !important;
}
@media (min-width: 640px) {
  .stats-label {
    font-size: 13.5px !important;
    margin-top: 3px !important;
    line-height: 1.25 !important;
  }
}
.stats-label-red {
  color: #d92906 !important;
}

.stats-desc {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 9.5px !important;
  color: #64748b !important;
  margin-top: 2px !important;
  line-height: 1.25 !important;
  max-width: 155px !important;
}
@media (min-width: 640px) {
  .stats-desc {
    font-size: 11.5px !important;
    margin-top: 3px !important;
    line-height: 1.35 !important;
    max-width: 185px !important;
  }
}

.stats-mobile-hint {
  display: none !important;
}
`;

cssFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log('File not found:', file);
    return;
  }
  let css = fs.readFileSync(file, 'utf8');
  const startIdx = css.indexOf('/* 2. STATISTICS SECTION');
  if (startIdx === -1) {
    console.error('Start of stats section not found in:', file);
    return;
  }

  // Find end of stats section (the next section or hint)
  const endAnchor = '@media (min-width: 768px) {\n  .stats-mobile-hint {\n    display: none !important;\n  }\n}';
  const endAnchorIdx = css.indexOf(endAnchor, startIdx);
  if (endAnchorIdx === -1) {
    console.error('End anchor not found in:', file);
    return;
  }
  const endIdx = endAnchorIdx + endAnchor.length;

  // Backup
  fs.writeFileSync(file + '.bak_' + Date.now(), css, 'utf8');

  // Replace
  css = css.substring(0, startIdx) + newStatsCss + css.substring(endIdx);
  fs.writeFileSync(file, css, 'utf8');
  console.log('Successfully updated stats section in:', file);
});
