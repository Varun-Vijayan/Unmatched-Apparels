import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc, //getting document
  getDoc, //getting document data
  setDoc, //setting document data
} from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZZRTlgDAEWYBdGhdjdKmW4KNM0REpp_U",
  authDomain: "unmatched-apparels-db.firebaseapp.com",
  projectId: "unmatched-apparels-db",
  storageBucket: "unmatched-apparels-db.appspot.com",
  messagingSenderId: "889536773207",
  appId: "1:889536773207:web:3fed5e6ff0ee182f25b712",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist, create
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  //if user exists
  return userDocRef;
};
