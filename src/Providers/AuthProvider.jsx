import axios from 'axios';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  onAuthStateChanged, // Import onAuthStateChanged from firebase/auth
} from 'firebase/auth';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // State to hold the token
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post('http://localhost:5000/jwt', {
            email: currentUser.email,
          })
          .then((data) => {
            setToken(data.data); // Set the token received from backend
            localStorage.setItem('access-token', data.data);
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setToken(null);
        localStorage.removeItem('access-token');
      }
    });
    return () => unsubscribe(); // Return the unsubscribe function
  }, []);

  const authInfo = {
    user,
    loading,
    token, // Include token in authInfo
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth information
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export default AuthProvider;
