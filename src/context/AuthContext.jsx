
import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

// Fungsi decodeJWT
const decodeJWT = (token) => {
   try {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
         atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
      );
      return JSON.parse(jsonPayload);
   } catch (error) {
      console.error("Failed to decode JWT", error);
      return null;
   }
};

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [authError, setAuthError] = useState("");
   const [loading, setLoading] = useState(false);

   // Inisialisasi user dari token yang tersimpan di localStorage
   useEffect(() => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token) {
         try {
            const decoded = decodeJWT(token);
            if (!decoded || decoded.exp * 1000 < Date.now()) {
               localStorage.removeItem("token");
            } else {
               api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
               setUser(JSON.parse(storedUser));
            }
         } catch (err) {
            console.error("Token invalid", err);
            localStorage.removeItem("token");
         }
      }
   }, []);

   const register = async (formData) => {
      try {
         setLoading(true);
         setAuthError("");
         await api.post("/auth/register", formData);
         await login({ email: formData.email, password: formData.password });
      } catch (error) {
         console.error("Register error:", error.response?.data);
         setAuthError(error.response?.data?.message || "Register error");
      } finally {
         setLoading(false);
      }
   };

   const login = async (credentials) => {
      try {
         setLoading(true);
         setAuthError("");
         const res = await api.post("/auth/login", credentials);
         setUser(res.data.user);
         localStorage.setItem("user", JSON.stringify(res.data.user));
         localStorage.setItem("token", res.data.token);
         api.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${res.data.token}`;
      } catch (error) {
         console.error("Login error:", error.response?.data);
         setAuthError(error.response?.data?.message || "Login error");
      } finally {
         setLoading(false); 
      }
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
   };

   return (
      <AuthContext.Provider
         value={{ user, authError, loading, register, login, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
};
