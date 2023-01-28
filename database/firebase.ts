import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyD08czygRPMxq7gUPGBauzRTAey1MpsLcU",
    authDomain: "eqland-7f360.firebaseapp.com",
    projectId: "eqland-7f360",
    storageBucket: "eqland-7f360.appspot.com",
    messagingSenderId: "1060638856146",
    appId: "1:1060638856146:web:b3d03ba56bf4498598ee0b",
    measurementId: "G-QPEBM6EN36"
};

firebase.initializeApp(firebaseConfig);

export default firebase;