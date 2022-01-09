import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import firebaseConfig from '../config/FirebaseConfig';

// firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firestore();
// const storage = firebase.storage();
const currentUser = auth().currentUser;

export {
	db,
	auth,
	currentUser,
	// storage,
	// firebase,
};