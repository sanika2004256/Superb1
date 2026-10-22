const fs = require('fs');

function applyMobileHeroRedesign() {
    let code = fs.readFileSync('public/assets/index-v21-1790395955858.js', 'utf8');

    // 1. Change bg-cover to bg-contain on mobile
    // Current: className:`absolute inset-0 bg-cover bg-[position:...] sm:bg-center transition-transform...
    // We will use a regex to replace the class string.
    code = code.replace(/absolute inset-0 bg-cover/g, 'absolute inset-0 bg-contain bg-no-repeat bg-top sm:bg-cover');

    // 2. We previously added dynamic backgroundPosition using style tag:
    // style:{backgroundImage:`url(${n.bgImage})`, backgroundPosition: window.innerWidth < 768 ? ([1,4,5].includes(n.id) ? "25% center" : "center") : "center"}
    // Let's remove the backgroundPosition hack since bg-contain solves it perfectly without cropping!
    code = code.replace(/, backgroundPosition: window\.innerWidth < 768 \? \(\[1,4,5\]\.includes\(n\.id\) \? "25% center" : "center"\) : "center"/g, '');

    // 3. Change gradient overlay
    // Current: absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent
    const oldOverlay = 'absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent';
    const newOverlay = 'absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent';
    code = code.replace(oldOverlay, newOverlay);

    // 4. Shift text container down and center it on mobile
    // Current: max-w-2xl text-white space-y-5 sm:space-y-6
    const oldTextContainer = 'max-w-2xl text-white space-y-5 sm:space-y-6';
    const newTextContainer = 'max-w-2xl text-white space-y-4 sm:space-y-6 pt-32 sm:pt-0 text-center sm:text-left flex flex-col items-center sm:items-start mx-auto sm:mx-0';
    code = code.replace(oldTextContainer, newTextContainer);

    // Write back
    fs.writeFileSync('public/assets/index-v21-1790395955858.js', code);
    try { fs.writeFileSync('assets/index-v21-1790395955858.js', code); } catch(e){}
    try { fs.writeFileSync('dist/assets/index-v21-1790395955858.js', code); } catch(e){}

    // 5. Update CSS hero-height
    let css = fs.readFileSync('public/assets/index-BvH2rQN2.css', 'utf8');
    css = css.replace(/hero-height\s*\{\s*height:\s*\d+px/g, 'hero-height { height: 480px');
    fs.writeFileSync('public/assets/index-BvH2rQN2.css', css);
    try { fs.writeFileSync('assets/index-BvH2rQN2.css', css); } catch(e){}
    try { fs.writeFileSync('dist/assets/index-BvH2rQN2.css', css); } catch(e){}

    console.log('Mobile hero redesign applied successfully!');
}

applyMobileHeroRedesign();
