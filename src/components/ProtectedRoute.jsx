import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const ProtectedRoute = ({ children }) => {
   const { user, isAuthChecked } = useContext(AuthContext);
   if (!isAuthChecked) return null; 
   return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;