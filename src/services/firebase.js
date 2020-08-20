import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2w8SwTxQmbRnoH8U2tif-F9ljDaD56vo",
    authDomain: "moduloni.firebaseapp.com",
    databaseURL: "https://moduloni.firebaseio.com",
    projectId: "moduloni",
    storageBucket: "moduloni.appspot.com",
    messagingSenderId: "302502608767",
    appId: "1:302502608767:web:0cb096cccd253b8a15a44a",
    measurementId: "G-R1K6HZWG1Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, auth, storage };
