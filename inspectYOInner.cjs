const fs = require('fs');

const content = fs.readFileSync('assets/index-v29-1790684309157.js', 'utf8');

const yOStart = content.indexOf('function yO({compactTop:e=!1}){');
const yOEnd = content.indexOf('function SO({images:e,activeIndex:t,onClose:n,onPrev:r,onNext:i}){', yOStart);
const originalYO = content.substring(yOStart, yOEnd).trim();

const mapStart = originalYO.indexOf('vO.directors.map');
const mapEnd = originalYO.indexOf('(0,k.jsx)(oO,{animation:`fade-up`,delay:200');

console.log('--- Directors mapping code ---');
console.log(originalYO.substring(mapStart, mapEnd));
