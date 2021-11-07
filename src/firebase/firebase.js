// Import the functions you need from the SDKs you need
import { initializeApp, settings }  from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore,collection,addDoc,doc, setDoc,} from 'firebase/firestore';
//import 'firebase/database';
// Your web app's Firebase configuration
const firebaseApp = initializeApp(  {
  apiKey: "AIzaSyCwX3Uyh8EFQTxgyzWx48GcavB5d7w96Jw",
  authDomain: "cryptoexpertv2.firebaseapp.com",
  projectId: "cryptoexpertv2",
  storageBucket: "cryptoexpertv2.appspot.com",
  messagingSenderId: "487620150756",
  appId: "1:487620150756:web:144b25df5910b1e0eab3f1"
});


const auth = getAuth();
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();


const signInGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerEmail = async (name, email, password) => {
  try {
    const pito = await createUserWithEmailAndPassword(auth,email, password);   
    await addDoc(collection(db,"users"),{
      uid: pito.user.uid,
      name:name,
      authProvider: "local",
      email:email,
    });
  } catch (err) {
    console.error("ME mori aqui "+err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  auth.signOut();
};


export {
  auth,
  db,
  signInGoogle,
  signInWithEmail,
  registerEmail,
  sendPasswordResetEmail,
  logout,
};