import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBniwtXovFDjkGYwj-vufP4_QGX5zSsWo",
    authDomain: "react-3d-price.firebaseapp.com",
    projectId: "react-3d-price",
    storageBucket: "react-3d-price.appspot.com",
    messagingSenderId: "882676898485",
    appId: "1:882676898485:web:fa1a335e17b61b8e77bcfc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

