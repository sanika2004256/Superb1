const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  projectId: "dist-7b242",
  storageBucket: "dist-7b242.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

async function uploadAll() {
  await signInWithEmailAndPassword(auth, "superb_admin@superbmegacorp.com", "6FqiA4Hd2gfZNB001g!V10Lk");
  
  const rawDir = path.join(__dirname, 'images', 'raw');
  const files = fs.readdirSync(rawDir);
  console.log(`Found ${files.length} images. Starting upload...`);
  
  let count = 0;
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) continue;
    
    try {
      const filePath = path.join(rawDir, file);
      const buffer = fs.readFileSync(filePath);
      const uint8Array = new Uint8Array(buffer);
      
      const storageRef = ref(storage, `gallery/raw_${Date.now()}_${file}`);
      const snapshot = await uploadBytes(storageRef, uint8Array, { contentType: 'image/jpeg' });
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Add to Firestore Gallery
      await addDoc(collection(db, 'gallery'), {
        title: file.replace(/_/g, ' ').replace(/\.[^/.]+$/, ""),
        description: "Imported from raw folder",
        imageUrl: downloadURL,
        createdAt: serverTimestamp()
      });
      
      count++;
      console.log(`Uploaded ${count}/${files.length}: ${file}`);
    } catch (e) {
      console.error(`Failed to upload ${file}:`, e.message);
    }
  }
  console.log(`Done! Uploaded ${count} images to Gallery.`);
  process.exit(0);
}

uploadAll();
