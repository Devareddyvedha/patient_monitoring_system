import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setDoctor(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const emailLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const emailRegister = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{
      doctor, loading, googleLogin, emailLogin, emailRegister, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
