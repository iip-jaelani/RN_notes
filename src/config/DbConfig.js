import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '1007450600095-avagr347n479ovsod5d0ssifsedioo8l.apps.googleusercontent.com',
});
const firebaseConfig = {
  apiKey: 'AIzaSyA1PyyKHtxFa5bJYBkhz5ltWDayw3ObBqM',
  authDomain: 'notes-87b65.firebaseapp.com',
  databaseURL: 'https://notes-87b65-default-rtdb.firebaseio.com',
  projectId: 'notes-87b65',
  storageBucket: 'notes-87b65.appspot.com',
  messagingSenderId: '1007450600095',
  appId: '1:1007450600095:web:c0bb5611ff51663d2668aa',
  measurementId: 'G-3D9BNZB7HT',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export {database, auth, firebaseConfig, GoogleSignin, firebase};
