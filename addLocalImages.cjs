const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  projectId: "dist-7b242",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function run() {
  await signInWithEmailAndPassword(auth, "superb_admin@superbmegacorp.com", "6FqiA4Hd2gfZNB001g!V10Lk");
  
  const rawDir = path.join(__dirname, 'images', 'raw');
  const galleryDir = path.join(__dirname, 'images', 'gallery');
  
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const files = fs.readdirSync(rawDir);
  console.log(`Found ${files.length} images. Processing...`);
  
  let count = 0;
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) continue;
    
    // Copy file
    fs.copyFileSync(path.join(rawDir, file), path.join(galleryDir, file));
    
    // Add to Firestore
    try {
      await addDoc(collection(db, 'gallery'), {
        title: file.replace(/_/g, ' ').replace(/\.[^/.]+$/, ""),
        description: "Imported from raw folder",
        imageUrl: `/images/gallery/${file}`,
        createdAt: serverTimestamp()
      });
      count++;
      console.log(`Added ${file}`);
    } catch (e) {
      console.error(`Failed to add ${file}:`, e.message);
    }
  }
  console.log(`Done! Added ${count} images to Gallery.`);
  process.exit(0);
}

run();
