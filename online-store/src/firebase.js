import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBi-eGNdjxkMm_515kpuU3Fl0qDYp6ROv0",
  authDomain: "online-store-dc8f3.firebaseapp.com",
  projectId: "online-store-dc8f3",
  storageBucket: "online-store-dc8f3.appspot.com",
  messagingSenderId: "198389670345",
  appId: "1:198389670345:web:7833df0797b3b9a4f30818"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
