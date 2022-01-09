import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../config/FirebaseConfig';

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth();
const storage = firebase.storage();
const currentUser = auth.currentUser;

export {
	db,
	auth,
	currentUser,
	storage,
	firebase,
};