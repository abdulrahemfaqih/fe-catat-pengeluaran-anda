import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [authError, setAuthError] = useState('');
   const [isAuthChecked, setIsAuthChecked] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
         try {
            // Verifikasi token di server jika diperlukan
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
         } catch (err) {
            console.error('Token invalid', err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
         }
      }
      setIsAuthChecked(true);
   }, []);

   const login = async (formData) => {
      try {
         setLoading(true);
         setAuthError('');
         const response = await api.post('/auth/login', formData);
         const { token, user } = response.data;
         localStorage.setItem('token', token);
         localStorage.setItem('user', JSON.stringify(user));
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
         setUser(user);
      } catch (error) {
         console.error('Login error:', error.response?.data);
         setAuthError(error.response?.data?.message || 'Login failed');
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
   };

   const register = async (formData) => {
      try {
         setLoading(true);
         setAuthError('');
         await api.post('/auth/register', formData);
         await login({ email: formData.email, password: formData.password });
      } catch (error) {
         console.error('Register error:', error.response?.data);
         setAuthError(error.response?.data?.message || 'Registration failed');
      } finally {
         setLoading(false);
      }
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, register, loading, authError, isAuthChecked }}>
         {children}
      </AuthContext.Provider>
   );
};