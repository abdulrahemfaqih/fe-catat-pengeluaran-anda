import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import DashboardWishlist from "./pages/DashboardWishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UnderMaintenancePage from "./pages/UnderMaintenance";
import GoogleAuthSuccess from "./components/GoogleAuthSuccess";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

function App() {
   const isUnderMaintenance =
      import.meta.env.VITE_PUBLIC_MAINTENANCE_MODE === "true";
   console.log(
      "Maintenance mode:",
      import.meta.env.VITE_PUBLIC_MAINTENANCE_MODE
   );

   return (
      <ThemeProvider>
         <AuthProvider>
            <Toaster
               position="top-right"
               toastOptions={{
                  duration: 3500,
                  style: {
                     background: "var(--color-surface)",
                     color: "var(--color-ink)",
                     border: "2px solid var(--color-ink)",
                     borderRadius: 0,
                     fontFamily: "var(--font-mono)",
                     fontSize: "0.85rem",
                     textTransform: "uppercase",
                     boxShadow: "4px 4px 0 var(--color-ink)",
                     fontWeight: 600,
                  },
                  success: {
                     style: {
                        border: "2px solid var(--color-positive)",
                     },
                     iconTheme: {
                        primary: "var(--color-positive)",
                        secondary: "var(--color-surface)",
                     },
                  },
                  error: {
                     style: {
                        border: "2px solid var(--color-negative)",
                     },
                     iconTheme: {
                        primary: "var(--color-negative)",
                        secondary: "var(--color-surface)",
                     },
                  },
               }}
            />
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

                     <Route
                        path="/auth/google/success"
                        element={<GoogleAuthSuccess />}
                     />
                  </Routes>
               )}
            </Router>
         </AuthProvider>
      </ThemeProvider>
   );
}

export default App;
