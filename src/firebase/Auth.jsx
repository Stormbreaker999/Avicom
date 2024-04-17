// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyBtj2cTZYU65Yf4hetnUVyW7_4ucvWeas0",
  authDomain: "av-avicom.firebaseapp.com",
  projectId: "av-avicom",
  storageBucket: "av-avicom.appspot.com",
  messagingSenderId: "101947114936",
  appId: "1:101947114936:web:379d4e930c510621937b4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);


function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(user, { displayName })
        setUser(user);
        return user;
    });

    const signIn = (username, password) => {
        return signInWithEmailAndPassword(auth, username, password)
            .then(({ user }) => {
                setUser(user);
                return user;
            });
    }


    const signOutUser = () => signOut(auth).then(() => setUser(null));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null)
        })
        return () => unsubscribe();
    }, [])


    return {
        signUp,
        signIn,
        signOut: signOutUser,
        user
    }
}

export default AuthProvider