import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

const AuthContext = createContext({
  currentUser: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };