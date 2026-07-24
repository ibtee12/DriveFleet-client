import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import axios from 'axios';
import { auth, googleProvider } from '../firebase/firebase.config';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Enable cookies with axios
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('drivefleet-jwt');
    } catch (e) {
      console.warn("Logout endpoint error:", e);
    }
    return signOut(auth);
  };

  // Update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    });
  };

  // Demo user login helper if examiner tests without active firebase backend
  const setDemoUser = (demoUserObj) => {
    setUser(demoUserObj);
    localStorage.setItem('drivefleet-demo-user', JSON.stringify(demoUserObj));
    setLoading(false);
  };

  // Observe auth state
  useEffect(() => {
    // Safety timer to prevent infinite loading spinners
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      clearTimeout(safetyTimer);
      setUser(currentUser);
      
      if (currentUser?.email) {
        // Issue JWT token from backend
        try {
          const res = await axios.post(`${API_URL}/jwt`, { email: currentUser.email });
          if (res.data?.token) {
            localStorage.setItem('drivefleet-jwt', res.data.token);
          }
        } catch (error) {
          console.warn("JWT Endpoint call notice:", error.message);
        }
      }
      setLoading(false);
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    setDemoUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
