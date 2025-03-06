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
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
         <div className="text-center p-8 rounded-xl border-4 border-black bg-blue-50 dark:bg-blue-900/30 shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-colors duration-300">
            <div className="inline-block animate-spin h-12 w-12 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full mb-4 transition-colors duration-300"></div>
            <h2 className="text-xl font-bold dark:text-white transition-colors duration-300">Mengautentikasi...</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">Mohon tunggu sebentar</p>
         </div>
      </div>
   );
};

export default GoogleAuthSuccess;