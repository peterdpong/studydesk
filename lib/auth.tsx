import { Context, createContext, useContext, useEffect, useState } from 'react';
import { addUser, getUserData } from './firestoredb';
import firebase from './firebase';

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  token: string | null;
}

interface AuthContext {
  auth: Auth | null;
  userData: any;
  loading: boolean;
  signinWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string, name: string) => Promise<any>;
  signinWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  userData: {},
  loading: true,
  signinWithEmailAndPassword: async (email: string, password: string) => {},
  createUserWithEmailAndPassword: async (email: string, password: string, name: string) => {},
  signinWithGoogle: async () => {},
  signOut: async () => {}
});

const formatAuthState = (user: firebase.User): Auth => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: null
});

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleAuthChange = async (authState: firebase.User | null) => {
    if(!authState) {
      setLoading(false);
      return;
    }

    const formattedAuth = formatAuthState(authState);
    const userData = await getUserData(formattedAuth.uid);
    formattedAuth.token = await authState.getIdToken();
    setAuth(formattedAuth);
    setUserData(userData.data());
    setLoading(false);
  }

  const signedIn = async (
    response: firebase.auth.UserCredential,
    provider: String = 'google'
  ) => {
    if(!response.user) {
      throw new Error('No User');
    }

    const authUser = formatAuthState(response.user);
    const userData = await getUserData(authUser.uid)
    await addUser({...authUser, provider});
    setUserData(userData.data());
  }

  const clear = () => {
    setAuth(null);
    setUserData({});
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

        const authUser = formatAuthState(response.user);
        setUserData(getUserData(authUser.uid));
        setAuth(authUser);
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

      const authUser = formatAuthState(response.user);
      const userData = await getUserData(authUser.uid);
      authUser.name = name;
      setUserData(userData.data());
      setAuth(authUser);
      await addUser({...authUser, provider});
    });
  }

  const signinWithGoogle = async() => {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(signedIn);
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
    userData,
    loading,
    signinWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signinWithGoogle,
    signOut
  };
}


export function AuthProvider({children}: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext)