const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  authDomain: "dist-7b242.firebaseapp.com",
  projectId: "dist-7b242",
  storageBucket: "dist-7b242.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testLogin() {
  try {
    const cred = await signInWithEmailAndPassword(auth, "superb_admin@superbmegacorp.com", "6FqiA4Hd2gfZNB001g!V10Lk");
    console.log("LOGIN SUCCESS! UID:", cred.user.uid, "Email:", cred.user.email);
  } catch (err) {
    console.error("LOGIN FAILED:", err.code, err.message);
  }
}

testLogin();
