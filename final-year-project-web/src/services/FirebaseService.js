import { auth, db } from '../services/Firebase';
import * as actionTypes from '../redux/constants';

const FirebaseService = {}

FirebaseService.signInEmailRequest = async (email, password) =>
  await auth.signInWithEmailAndPassword(email, password);
		
FirebaseService.signOutRequest = async () =>
	await auth.signOut();

FirebaseService.signUpEmailRequest = async (email, password) =>
	await auth.createUserWithEmailAndPassword(email, password);	

FirebaseService.signUpAddUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).set({ ...value });
	
FirebaseService.signInGetUserDetailsRequest = async (id) => 
	await db.collection("users").doc(id).get();

FirebaseService.adminGetAllUsers = async () => 
	await db.collection("users").get();

FirebaseService.postNewDigitalItemRequest = async (id, value) => 
		await db.collection("digitalItem").doc(id).set({ ...value });

FirebaseService.getOwnersDigitalItemsRequest = async () => 
		await db.collection("digitalItem").where("ownerId", "==", localStorage.getItem(actionTypes.AUTH_TOKEN_ID)).get();

FirebaseService.getDigitalItemsRequest = async () => 
		await db.collection("digitalItem").get()

FirebaseService.getADigitalItemRequest = async (id) => 
		await db.collection("digitalItem").doc(id).get();

FirebaseService.updateADigitalItemRequest = async (id, value) => 
		await db.collection("digitalItem").doc(id).update({ ...value });

FirebaseService.postDigitalItemReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).set({ ...value });

FirebaseService.getAdminDigitalItemReviewRequest = async () => 
		await db.collection("reviews").get();

FirebaseService.getDigitalItemReviewRequest = async (id) => 
		await db.collection("reviews").where("restaurantId", "==", id).get();

FirebaseService.getOwnerDigitalItemReviewRequest = async () => 
		await db.collection("reviews").where("restaurantOwnerId", "==", localStorage.getItem(actionTypes.AUTH_TOKEN_ID)).get();

FirebaseService.replyDigitalItemReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).update({ ...value });

FirebaseService.adminEditDigitalItemReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).update({ ...value });

FirebaseService.adminDeleteDigitalItemReviewRequest = async (id) => 
		await db.collection("reviews").doc(id).delete();

FirebaseService.adminDeleteDigitalItemRequest = async (id) => 
		await db.collection("digitalItem").doc(id).delete();

FirebaseService.AdminEditDigitalItemNameOnReviewRequest = async (id, value) => {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.update(documentSnapshot.ref, {...value});
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllDigitalItemReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.adminDeleteUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).delete();

FirebaseService.AdminDeleteAllUserDigitalItemRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("digitalItem").where("ownerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllUserDigitalItemReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantOwnerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllUserReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("reviewerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}
	
FirebaseService.adminUpdateUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).update({ ...value });

export default FirebaseService;
