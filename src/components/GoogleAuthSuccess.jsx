import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GoogleAuthSuccess = () => {
   const { processGoogleAuthSuccess } = useContext(AuthContext);
   const navigate = useNavigate();

   useEffect(() => {
      const success = processGoogleAuthSuccess();

      // Redirect setelah proses auth
      if (success) {
         navigate("/");
      } else {
         navigate("/login?error=auth_processing_failed");
      }
   }, [processGoogleAuthSuccess, navigate]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="text-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <h2 className="text-xl font-bold">Mengautentikasi...</h2>
            <p className="text-gray-600">Mohon tunggu sebentar</p>
         </div>
      </div>
   );
};

export default GoogleAuthSuccess;
