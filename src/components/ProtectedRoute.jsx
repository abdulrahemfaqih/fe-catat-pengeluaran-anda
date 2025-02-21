// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
   const { user } = useContext(AuthContext);
   // Jika user tidak ada, redirect ke /login
   return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
