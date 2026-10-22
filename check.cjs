const fs=require('fs'); 
const code=fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8'); 
try { 
  // acorn can parse ES modules
  require('acorn').parse(code, {ecmaVersion: 2022, sourceType: 'module'});
  console.log('No syntax errors according to acorn');
} catch(e) { 
  console.log(e.toString()); 
  let pos = e.pos;
  if(pos) {
    console.log(code.substring(pos-100, pos+100));
  }
}
