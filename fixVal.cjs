const fs = require('fs');
let code = fs.readFileSync('assets/index-BM-yEkkk.js', 'utf8');

// Fix Phone Validation
const phoneTarget = 'l.phone.replace(/\\D/g,``).length<10';
if (code.includes(phoneTarget)) {
    code = code.replace(phoneTarget, 'l.phone.replace(/\\D/g,``).length!==10');
    console.log('Phone validation updated to strictly 10 digits.');
} else {
    console.log('Phone target not found');
}

// Fix Email Validation
const emailTarget = '/\\S+@\\S+\\.\\S+/.test(l.email)';
if (code.includes(emailTarget)) {
    code = code.replace(emailTarget, '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i.test(l.email)');
    console.log('Email validation updated strictly.');
} else {
    console.log('Email target not found');
}

fs.writeFileSync('assets/index-BM-yEkkk.js', code);
