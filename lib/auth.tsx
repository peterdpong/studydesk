import { Context, createContext, useContext, useEffect, useState } from 'react';
import { addUser, getUserData } from './firestoredb';
import firebase from './firebase';
import { UserModel } from './models/User';
import { Class } from './models/Class';
import { Task } from './models/Task';
import { useRouter } from 'next/dist/client/router';
interface AuthContext {
  useRequiredAuth: () => UserModel | null;
  loading: boolean;
  signinWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string, name: string) => Promise<any>;
  signinWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  useRequiredAuth: () => { return null },
  loading: true,
  signinWithEmailAndPassword: async (email: string, password: string) => {},
  createUserWithEmailAndPassword: async (email: string, password: string, name: string) => {},
  signinWithGoogle: async () => {},
  signOut: async () => {}
});

const formatUserState = (userData: firebase.firestore.DocumentSnapshot): UserModel | null => {
  console.log(userData);

  if(userData.data() === undefined) {
    return null;
  }
  
  return {
    uid: userData?.get('uid'),
    provider: userData?.get('provider'),
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

        const userData = await getUserData(response.user.uid);
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
      provider: string = 'email'
    ) => {

      setLoading(true);

      if(!response.user) {
        throw new Error('No User');
      }

      const fullNameSplit: string[] = name.split(' ');

      const newUserData: UserModel = {
        uid: response.user.uid,
        provider: provider,
        firstName: fullNameSplit[0],
        lastName: fullNameSplit[1],
        email: email,
        school: "",
        classes: new Array<Class>(),
        tasks: new Array<Task>()
      }

      setAuth(newUserData);
      await addUser({...newUserData, provider});

      setLoading(false);
    });
  }

  const handleGoogleSignin = async (
    response: firebase.auth.UserCredential,
    provider: string = 'google'
  ) => {
    
    if(!response.user) {
      setLoading(false);
      throw new Error('No User');
    }

    const userData = await getUserData(response.user.uid)

    // Check if new or existing user
    if(userData.exists === false) {
      const fullNameSplit: string[] | undefined = response.user.displayName?.split(' ');

      const newUserData: UserModel = {
        uid: response.user.uid,
        provider: provider,
        firstName: fullNameSplit ? fullNameSplit[0] : undefined,
        lastName: fullNameSplit ? fullNameSplit[1] : undefined,
        email: response.user.email,
        school: "",
        classes: new Array<Class>(),
        tasks: new Array<Task>()
      }

      await addUser(newUserData);
      setAuth(newUserData);

    } else {
      setAuth(formatUserState(userData));
    }
    setLoading(false);
  }

  const signinWithGoogle = async() => {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(error => {
      setLoading(false);
      throw new Error(error.message);
    })
    .then(handleGoogleSignin);
  };

  const signOut = async() => {
    return firebase.auth().signOut().then(clear);
  }

  const useRequiredAuth = () => {
    // const router = useRouter();

    // useEffect(() => {
    //   if(!auth && !loading) {
    //     router.push('/signin');
    //   }

    // }, [auth, router]);

    return auth;
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if(auth?.uid) {
      const unsubscribe = firebase.firestore()
      .collection('users')
      .doc(auth?.uid)
      .onSnapshot((doc) => setAuth(formatUserState(doc)));

      return () => unsubscribe();
    }
  }, [loading]);

  return {
    useRequiredAuth,
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