// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "mealfinder-e12a3.firebaseapp.com",
  projectId: "mealfinder-e12a3",
  storageBucket: "mealfinder-e12a3.appspot.com",
  messagingSenderId: "820621797176",
  appId: "1:820621797176:web:7449e575cb6869df9b43cd"
};

// Initialize Firebase
let app;
if(firebase.apps.length ===0){
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}

const db = getDatabase(app);
const auth = firebase.auth();

export { db, auth };