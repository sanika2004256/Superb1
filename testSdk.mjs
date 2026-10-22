import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  authDomain: "dist-7b242.firebaseapp.com",
  projectId: "dist-7b242",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const querySnapshot = await getDocs(collection(db, 'enquiries'));
  const allData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('Total enquiries:', allData.length);
  console.log(allData.map(d => d.name));
}

check();
