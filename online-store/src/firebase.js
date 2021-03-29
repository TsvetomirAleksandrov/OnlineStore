import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyA9FfhiQ_onfjrBZJ3cmuIrsQuc65CfH6A",
  authDomain: "online-store-1f7b2.firebaseapp.com",
  projectId: "online-store-1f7b2",
  storageBucket: "online-store-1f7b2.appspot.com",
  messagingSenderId: "97841948075",
  appId: "1:97841948075:web:2442e46151b62fde325eee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
