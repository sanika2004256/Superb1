import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function seedProducts() {
  try {
    // Authenticate as admin to bypass security rules
    await signInWithEmailAndPassword(auth, "superb_admin@superbmegacorp.com", "6FqiA4Hd2gfZNB001g!V10Lk");
    console.log("Authenticated as Admin successfully.");
    const assetsDir = 'assets';
    const files = fs.readdirSync(assetsDir);
    const jsFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
    if (!jsFile) throw new Error("Could not find index.js in assets");

    const content = fs.readFileSync(`${assetsDir}/${jsFile}`, 'utf8');
    const idx = content.indexOf('Karak Premium Cardamom Tea');
    if (idx === -1) throw new Error("Could not find products array in JS");

    let start = content.lastIndexOf('[', idx);
    let end = content.indexOf(']', idx) + 1;
    
    // Find the true end of the array by counting brackets since there might be nested brackets
    let brackets = 0;
    for (let i = start; i < content.length; i++) {
        if (content[i] === '[') brackets++;
        if (content[i] === ']') brackets--;
        if (brackets === 0) {
            end = i + 1;
            break;
        }
    }

    const arrayStr = content.substring(start, end);
    
    // Safely evaluate the array
    const products = new Function('return ' + arrayStr)();

    console.log(`Found ${products.length} products. Seeding to Firebase...`);

    // Check if products already exist to avoid duplicates
    const existing = await getDocs(collection(db, 'products'));
    if (!existing.empty) {
        console.log("Products collection already has data. Skipping seed.");
        process.exit(0);
    }

    for (const p of products) {
      await addDoc(collection(db, 'products'), {
        name: p.name,
        category: p.categoryName || p.category || 'General',
        price: "₹" + p.mrp,
        status: 'active',
        description: p.packing || '',
        imageUrl: p.image || p.imageFront || '',
        sku: p.sku || ''
      });
      console.log(`Added ${p.name}`);
    }

    console.log("Successfully seeded all products!");
    process.exit(0);
  } catch (e) {
    console.error("Error: ", e);
    process.exit(1);
  }
}

seedProducts();
