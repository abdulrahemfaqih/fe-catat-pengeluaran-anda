
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   return (
      <Router>
         <Routes>
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
   );
}

export default App;
