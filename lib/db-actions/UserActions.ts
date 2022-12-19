import firebase from '../firebase';
import { UserModel } from '../models/User';

// Functions here deal with manipulating and updating the UserModel

export const getUserData = async (uid: string | undefined) => {
  if(uid === undefined) {
    return null;
  }
  
  const response = firebase
    .firestore()
    .collection('users')
    .doc(uid as string)
    .get();
    
  return response;
}

export const addUser = async (authUser: UserModel) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });

  return response;
};