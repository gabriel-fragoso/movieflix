import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD4Tu7mShjFk_FqdsZCkje92VH55C_EReU",
  authDomain: "mobile-e9030.firebaseapp.com",
  databaseURL: "https://mobile-e9030-default-rtdb.firebaseio.com",
  projectId: "mobile-e9030",
  storageBucket: "mobile-e9030.appspot.com",
  messagingSenderId: "1095423009346",
  appId: "1:1095423009346:web:e9d52163f1482c644983db",
  measurementId: "G-CH7WRZQQMQ"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase;