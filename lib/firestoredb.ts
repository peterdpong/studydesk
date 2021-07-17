import firebase from './firebase';

export const addUser = async (authUser: any) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true });
    
  return response;
};

export const getUser = async (authUser: any) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .get();
    
  return response;
}