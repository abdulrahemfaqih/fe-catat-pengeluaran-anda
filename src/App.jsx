import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import DashboardWishlist from './pages/DashboardWishlist';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

function App() {
   return (
      <AuthProvider>
         <Router>
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
            </Routes>
         </Router>
      </AuthProvider>
   );
}

export default App;