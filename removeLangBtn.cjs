const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// The language button onClick starts with something like:
// (0,k.jsxs)(`button`,{type:`button`,onClick:()=>{let isMr = document.cookie...
// We can find the exact string to remove.

let idx1 = code.indexOf('(0,k.jsxs)(`button`,{type:`button`,onClick:()=>{');
if (idx1 !== -1) {
    console.log("Found button at", idx1);
    let context = code.substring(idx1, idx1 + 1000);
    // Find the end of this button's code. It should end right before `]}),(0,k.jsx)(we,`
    let endIdx = context.indexOf('notranslate`');
    if (endIdx !== -1) {
        // the button probably ends with: notranslate`,children:"????? / English"}]}
        let endTagIdx = context.indexOf(']}', endIdx);
        if (endTagIdx !== -1) {
            let buttonStr = context.substring(0, endTagIdx + 2);
            // there might be a comma before it, e.g. `,(0,k.jsxs)`. Let's remove the comma as well.
            if (code[idx1 - 1] === ',') {
                buttonStr = ',' + buttonStr;
                code = code.replace(buttonStr, '');
            } else {
                code = code.replace(buttonStr, '');
            }
            
            fs.writeFileSync('public/assets/index-BM-yEkkk.js', code);
            fs.writeFileSync('assets/index-BM-yEkkk.js', code);
            console.log("Removed language button!");
        } else {
            console.log("Could not find end of button");
        }
    }
} else {
    console.log("Button not found");
}
