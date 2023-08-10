// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO5w5eXcNLtSrABWNyJRdG3ryQnMyWRQ8",
  authDomain: "gd03champ.firebaseapp.com",
  projectId: "gd03champ",
  storageBucket: "gd03champ.appspot.com",
  messagingSenderId: "972244899509",
  appId: "1:972244899509:web:61e28d388dc6c3e32b10fc",
  measurementId: "G-FHB4QMCDRD"
};

let analytics;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

}

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { Home as default } from '../layouts/Home/Home';
