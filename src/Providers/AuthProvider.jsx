
import axios from 'axios';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { app } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
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
    return signOut(auth).then(() => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('access-token');
      setLoading(false);
    });
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const response = await axios.post('https://tixify-api.sifatniloy.top/jwt', {
            email: currentUser.email,
          });
          const tokenData = response.data;
          setToken(tokenData);
          localStorage.setItem('access-token', tokenData);
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    token,
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
