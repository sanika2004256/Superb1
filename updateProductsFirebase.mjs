import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';

const firebaseConfig = {
  apiKey: 'AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc',
  projectId: 'dist-7b242',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function run() {
    try {
        await signInWithEmailAndPassword(auth, 'superb_admin@superbmegacorp.com', '6FqiA4Hd2gfZNB001g!V10Lk');
        console.log('Authenticated as Admin successfully.');

        // Clear existing products
        const existing = await getDocs(collection(db, 'products'));
        let deleted = 0;
        for (const d of existing.docs) {
            await deleteDoc(doc(db, 'products', d.id));
            deleted++;
        }
        console.log('Deleted ' + deleted + ' old products.');

        // Add new products
        const newProducts = JSON.parse(fs.readFileSync('src/legacyProducts.json', 'utf8'));
        let added = 0;
        for (const p of newProducts) {
            await addDoc(collection(db, 'products'), {
                name: p.name,
                category: p.category,
                price: '₹' + p.mrp,
                status: p.status,
                description: p.packing,
                imageUrl: p.image,
                sku: p.sku
            });
            added++;
        }
        console.log('Added ' + added + ' new products.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();
