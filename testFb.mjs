import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
    projectId: "dist-7b242",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
    const snap = await getDocs(collection(db, 'products'));
    console.log("Total products in Firebase:", snap.size);
    process.exit(0);
}
run();
