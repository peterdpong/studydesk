import { Context, createContext, useContext, useEffect, useState } from 'react';
import { addUser, getUserData } from './firestoredb';
import firebase from './firebase';
import { UserModel } from './models/User';
import { Class } from './models/Class';
import { Task } from './models/Task';

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  token: string | null;
}


interface AuthContext {
  auth: UserModel | null;
  loading: boolean;
  signinWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signinWithEmailAndPassword: async (email: string, password: string) => {},
  createUserWithEmailAndPassword: async (email: string, password: string, name: string) => {},
  signOut: async () => {}
});


const formatUserState = (userData: firebase.firestore.DocumentSnapshot): UserModel | null => {
  console.log(userData);

  if(userData.data() === undefined) {
    return null;
  }
  
  return {
    uid: userData?.get('uid'),
    firstName: userData?.get('firstName'),
    lastName: userData?.get('lastName'),
    email: userData?.get('email'),
    school: userData?.get('school'),
    classes: userData?.get('classes'),
    tasks: userData?.get('tasks')
  }

};



function useProvideAuth() {
  const [auth, setAuth] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAuthChange = async (authState: firebase.User | null) => {
    if(!authState) {
      setLoading(false);
      return;
    }

    const userData = await getUserData(authState.uid);
    setAuth(formatUserState(userData));
    setLoading(false);
  }

  // const signedIn = async (
  //   response: firebase.auth.UserCredential,
  //   provider: String = 'google'
  // ) => {
  //   if(!response.user) {
  //     throw new Error('No User');
  //   }

  //   const authUser = formatAuthState(response.user);
  //   const userData = await getUserData(authUser.uid)
  //   await addUser({...authUser, provider});
  //   setUserData(userData.data());
  // }

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const signinWithEmailAndPassword = (email: string, password: string): any => {
    setLoading(true);

    return firebase.auth().signInWithEmailAndPassword(email, password).then(async (
      response: firebase.auth.UserCredential
      ) => {
        if(!response.user) {
          throw new Error('No User');
        }

        const userData = await getUserData(response.user.uid)
        setAuth(formatUserState(userData));
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  }

  const createUserWithEmailAndPassword = (email: string, password: string, name: string): any => {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(async (
      response: firebase.auth.UserCredential,
      provider: String = 'email'
    ) => {
      if(!response.user) {
        throw new Error('No User');
      }

      const fullNameSplit: string[] = name.split(' ');

      const newUserData: UserModel = {
        uid: response.user.uid,
        firstName: fullNameSplit[0],
        lastName: fullNameSplit[1],
        email: email,
        school: "",
        classes: new Array<Class>(),
        tasks: new Array<Task>()
      }

      setAuth(newUserData);
      await addUser({...newUserData, provider});
    });
  }

  const signinWithGoogle = async() => {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //.then(signedIn);
  };

  const signOut = async() => {
    return firebase.auth().signOut().then(clear);
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, []);

  return {
    auth,
    loading,
    signinWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
  };
}


export function AuthProvider({children}: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext)