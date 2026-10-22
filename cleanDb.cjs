const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, deleteDoc, doc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  authDomain: "dist-7b242.firebaseapp.com",
  projectId: "dist-7b242",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanOrders() {
  const querySnapshot = await getDocs(collection(db, 'orders'));
  const allOrders = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  
  let deletedCount = 0;
  for (const order of allOrders) {
    if (order.orderNumber && order.orderNumber.startsWith('ORD-')) {
      await deleteDoc(doc(db, 'orders', order.id));
      console.log('Deleted fake order:', order.orderNumber);
      deletedCount++;
    } else if (!order.orderNumber) {
       // Just in case there are really old ones
      await deleteDoc(doc(db, 'orders', order.id));
      console.log('Deleted order missing orderNumber');
      deletedCount++;
    }
  }
  console.log('Total deleted:', deletedCount);
}

cleanOrders();
