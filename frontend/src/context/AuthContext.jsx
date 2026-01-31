import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getStoredUser, isAuthenticated } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MESSAGES, ROUTES } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = () => {
      if (isAuthenticated()) {
        const storedUser = getStoredUser();
        setUser(storedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);
      setUser(data.user);
      toast.success(MESSAGES.LOGIN_SUCCESS);
      navigate(ROUTES.DASHBOARD);
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || MESSAGES.LOGIN_FAILED);
      return { success: false, error: error.response?.data?.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      toast.success(MESSAGES.LOGOUT_SUCCESS);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user even if API call fails
      setUser(null);
      navigate(ROUTES.LOGIN);
    }
  };

  // Update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
