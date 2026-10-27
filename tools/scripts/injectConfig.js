import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const assetsDir = 'assets';
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
if (!jsFile) {
    console.error("No index.js found");
    process.exit(1);
}

const jsPath = `${assetsDir}/${jsFile}`;
let content = fs.readFileSync(jsPath, 'utf8');

const emptyConfigRegex = /{apiKey:``,authDomain:``,projectId:``,storageBucket:``,messagingSenderId:``,appId:``,measurementId:``}/g;
// also check for double quotes just in case
const emptyConfigRegex2 = /{apiKey:"",authDomain:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:"",measurementId:""}/g;

const injectedConfig = `{apiKey:"${process.env.VITE_FIREBASE_API_KEY}",authDomain:"${process.env.VITE_FIREBASE_AUTH_DOMAIN}",projectId:"${process.env.VITE_FIREBASE_PROJECT_ID}",storageBucket:"${process.env.VITE_FIREBASE_STORAGE_BUCKET}",messagingSenderId:"${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",appId:"${process.env.VITE_FIREBASE_APP_ID}",measurementId:""}`;

if (content.match(emptyConfigRegex) || content.match(emptyConfigRegex2)) {
    content = content.replace(emptyConfigRegex, injectedConfig);
    content = content.replace(emptyConfigRegex2, injectedConfig);
    fs.writeFileSync(jsPath, content, 'utf8');
    console.log("Successfully injected Firebase config into the public website bundle!");
} else {
    // If it already has some config, we might need to replace it.
    // Let's do a more aggressive regex for any config that matches the keys.
    const aggressiveRegex = /{apiKey:['"`].*?['"`],authDomain:['"`].*?['"`],projectId:['"`].*?['"`],storageBucket:['"`].*?['"`],messagingSenderId:['"`].*?['"`],appId:['"`].*?['"`](?:,measurementId:['"`].*?['"`])?}/g;
    if (content.match(aggressiveRegex)) {
        content = content.replace(aggressiveRegex, injectedConfig);
        fs.writeFileSync(jsPath, content, 'utf8');
        console.log("Successfully injected/replaced Firebase config in the public website bundle!");
    } else {
        console.log("Could not find Firebase config in the bundle to replace.");
    }
}
