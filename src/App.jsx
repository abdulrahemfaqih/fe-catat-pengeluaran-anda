import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import DashboardWishlist from "./pages/DashboardWishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UnderMaintenancePage from "./pages/UnderMaintenance";

function App() {
   const isUnderMaintenance = import.meta.env.VITE_PUBLIC_MAINTENANCE_MODE === "true";
   console.log(
      "Maintenance mode:",
      import.meta.env.VITE_PUBLIC_MAINTENANCE_MODE
   );

   return (
      <AuthProvider>
         <Router>
            {isUnderMaintenance ? (
               <UnderMaintenancePage />
            ) : (
               <Routes>
                  <Route
                     path="/wishlist"
                     element={
                        <ProtectedRoute>
                           <DashboardWishlist />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/"
                     element={
                        <ProtectedRoute>
                           <Dashboard />
                        </ProtectedRoute>
                     }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                  <Route
                     path="/maintenance"
                     element={<UnderMaintenancePage />}
                  />
               </Routes>
            )}
         </Router>
      </AuthProvider>
   );
}

export default App;
