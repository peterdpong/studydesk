import firebase from './firebase';

export const addUser = async (authUser: any) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });

  return response;
};

export const getUserData = async (uid: string) => {
  const response = firebase
    .firestore()
    .collection('users')
    .doc(uid as string)
    .get();
    
  return response;
}