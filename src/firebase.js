import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCGCxT-bNb2JvTs5qAIykhdUE762jRbD9k",
    authDomain: "snapshatclone-a1ca6.firebaseapp.com",
    projectId: "snapshatclone-a1ca6",
    storageBucket: "snapshatclone-a1ca6.appspot.com",
    messagingSenderId: "595159129161",
    appId: "1:595159129161:web:03057f1db97ba923887398"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const provider = new GoogleAuthProvider();


  export {db, auth, storage,provider};