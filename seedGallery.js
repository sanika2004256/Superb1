import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
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

async function seedGallery() {
  try {
    // Authenticate to bypass rules
    await signInWithEmailAndPassword(auth, "superb_admin@superbmegacorp.com", "6FqiA4Hd2gfZNB001g!V10Lk");
    console.log("Authenticated as Admin successfully.");

    // Extract exact gallery array from JS bundle
    const assetsDir = 'assets';
    const files = fs.readdirSync(assetsDir);
    const jsFile = files.find(f => f.startsWith('index') && f.endsWith('.js'));
    const content = fs.readFileSync(`${assetsDir}/${jsFile}`, 'utf8');
    const idx = content.indexOf('Instant Cardamom Chai Premix Sachet');
    
    let start = content.lastIndexOf('[', idx);
    let end = content.indexOf(']', idx) + 1;
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
    const galleryItems = new Function('return ' + arrayStr)();
    console.log(`Found ${galleryItems.length} proper gallery items in JS bundle.`);

    // Delete existing gallery items (the raw ones with wrong names)
    const existing = await getDocs(collection(db, 'gallery'));
    let deletedCount = 0;
    for (const d of existing.docs) {
        await deleteDoc(doc(db, 'gallery', d.id));
        deletedCount++;
    }
    console.log(`Deleted ${deletedCount} old gallery items.`);

    // Insert proper items
    let addedCount = 0;
    for (const item of galleryItems) {
      await addDoc(collection(db, 'gallery'), {
        title: item.title,
        description: item.description || '',
        imageUrl: item.image || item.imageUrl || '',
        category: item.category || 'General',
        createdAt: Date.now()
      });
      addedCount++;
    }
    console.log(`Successfully seeded ${addedCount} proper gallery items!`);
    process.exit(0);
  } catch (e) {
    console.error("Error: ", e);
    process.exit(1);
  }
}

seedGallery();
