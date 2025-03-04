import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [authError, setAuthError] = useState("");
   const [isAuthChecked, setIsAuthChecked] = useState(false);

   // Memperbaiki implementasi check auth status
   const checkAuthStatus = useCallback(() => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
         try {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
         } catch (err) {
            console.error("Token invalid", err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            delete api.defaults.headers.common["Authorization"];
            setUser(null);
         }
      } else {
         setUser(null);
      }
      setIsAuthChecked(true);
   }, []);

   useEffect(() => {
      checkAuthStatus();
   }, [checkAuthStatus]);

   // Fungsi untuk memproses Google auth success
   const processGoogleAuthSuccess = useCallback(() => {
      if (window.location.pathname === "/auth/google/success") {
         const urlParams = new URLSearchParams(window.location.search);
         const token = urlParams.get("token");
         const userParam = urlParams.get("user");

         if (token && userParam) {
            try {
               const userData = JSON.parse(decodeURIComponent(userParam));

               // Clear any existing auth data first
               localStorage.removeItem("token");
               localStorage.removeItem("user");
               delete api.defaults.headers.common["Authorization"];

               // Set new auth data
               localStorage.setItem("token", token);
               localStorage.setItem("user", JSON.stringify(userData));
               api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
               setUser(userData);

               // Clean URL without causing full page reload
               window.history.replaceState({}, document.title, "/");

               return true;
            } catch (err) {
               console.error("Error processing Google auth response", err);
               setAuthError("Failed to process Google authentication response");
               return false;
            }
         }
      }
      return false;
   }, []);

   useEffect(() => {
      // Process Google auth on component mount if in success URL
      processGoogleAuthSuccess();
   }, [processGoogleAuthSuccess]);

   const login = async (formData) => {
      try {
         setLoading(true);
         setAuthError("");
         const response = await api.post("/auth/login", formData);
         const { token, user } = response.data;

         // Clear any existing auth data first
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         delete api.defaults.headers.common["Authorization"];

         // Set new auth data
         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
         api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         setUser(user);
      } catch (error) {
         console.error("Login error:", error.response?.data);
         setAuthError(error.response?.data?.message || "Login failed");
      } finally {
         setLoading(false);
      }
   };
   const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

   const loginWithGoogle = async () => {
      try {
         // Set loading state to true
         setGoogleLoginLoading(true);

         // Clear any existing auth data before redirecting
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         delete api.defaults.headers.common["Authorization"];
         setUser(null);

         const apiUrl = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:5000/api";

         // Make a preflight request to wake up the server
         try {
            // Attempt a lightweight request to wake the server
            await api.get(`${apiUrl}/health-check`);
         } catch (error) {
            // Ignore errors - just trying to wake up the server
            console.log("Server wake-up request sent");
         }

         // Redirect to Google login
         window.location.href = `${apiUrl}/auth/google`;

         // The loading state will remain true until the page navigates away
         // which is appropriate because we're waiting for the redirect
      } catch (error) {
         console.error("Google login error:", error);
         setAuthError("Failed to initiate Google login");
         setGoogleLoginLoading(false); // Reset loading state if there's an error
      }
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
   };

   const register = async (formData) => {
      try {
         setLoading(true);
         setAuthError("");
         await api.post("/auth/register", formData);
         await login({ email: formData.email, password: formData.password });
      } catch (error) {
         console.error("Register error:", error.response?.data);
         setAuthError(error.response?.data?.message || "Registration failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            login,
            logout,
            register,
            loading,
            authError,
            isAuthChecked,
            loginWithGoogle,
            googleLoginLoading,
            processGoogleAuthSuccess,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
