import firebase from '../firebase'
import { UserModel } from '../models/User'

// Functions here deal with manipulating and updating the UserModel

export const getUserData = async (uid: string | undefined) => {
  if (uid === undefined) {
    return null
  }

  const response = firebase
    .firestore()
    .collection('users')
    .doc(uid as string)
    .get()

  return response
}

export const addUser = async (authUser: UserModel) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .doc(authUser.uid as string)
    .set({ ...authUser }, { merge: true })

  return response
}

// UserModel Manipulation - Settings
// TODO: Rewrite with settings page
// export const updateUserProfile = async (uid: string | undefined, userObject: UserModel, action: UserUpdateAction) => {
//     const refToUserData = firebase.firestore().collection("users").doc(uid);
//     const refToUserAuth = firebase.auth().currentUser;
//     const defaultError = 'No error';

//     let error = defaultError;

//     if(profileObject.emailChange){
//         if(refToUserAuth){
//             await refToUserAuth
//                 .updateEmail(profileObject.email)
//                 .catch(
//                     (err) => {
//                         error = err.message;
//                     }
//                 )

//             if(!profileObject.emailOnly){
//                 await refToUserAuth
//                     .updatePassword(profileObject.password)
//                     .catch(
//                         (err) => {
//                             error = err.message;
//                         }
//                     )
//             }
//         }
//         else{
//             return;
//         }
//     }

//     else{
//         const usernameSplit = profileObject.username.split(' ');

//         refToUserData
//             .update({
//                 firstName: usernameSplit[0],
//                 lastName: usernameSplit[1],
//                 email: profileObject.email,
//                 school: profileObject.school
//             })
//             .catch(
//                 (err) => {
//                     error = err.message;
//                 }
//             )
//     }

//     return error;
// }
