import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  databaseURL: "VOTRE_DATABASE_URL",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialisez Firebase avec votre configuration
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
