import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
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

async function createTestOrder() {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      orderNumber: "ORD-" + Math.floor(Math.random() * 10000),
      createdAt: Date.now(),
      customer: {
        name: "Pranoti Jadhav",
        email: "pranotijadhav03@gmail.com",
        phone: "8459456080",
        address: "A.P.KAVATHE EKAND",
        city: "KAVATHE EKAND",
        state: "Maharashtra",
        pinCode: "416307"
      },
      items: [
        {
          name: "Karak Premium Ginger Tea",
          quantity: 1,
          price: 800
        }
      ],
      total: 840,
      gst: 40,
      paymentMethod: "Razorpay (Test)",
      paymentStatus: "Paid",
      orderStatus: "Confirmed"
    });
    console.log("Test order created successfully with ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("Error adding document: ", e);
    process.exit(1);
  }
}

createTestOrder();
