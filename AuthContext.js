import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  currentUser: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      setCurrentUser(user);
      setIsLoading(false);
      if (user) {
        try {
          // Store user ID securely using a dedicated key and encryption (optional)
          const userEmail = user.email;
      
          await AsyncStorage.setItem('UserEmail', userEmail); // Use a dedicated key for storage
        } catch (error) {
          console.error("Error storing user data:", error);
        }
      } else {
        // Remove user data from storage if user signs out
        await AsyncStorage.removeItem('UserEmail');
      }
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
      await AsyncStorage.removeItem('UserEmail');
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
