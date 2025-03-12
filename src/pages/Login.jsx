import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon_login.svg";
import LoginGoogleButton from "../components/LoginGoogleButton";
import TutorialPenggunaanAtLogin from "../components/TutorialPenggunaanAtLogin";
import LoadingLogin from "../components/LoadingLogin";
import PlayfulBackground from "../components/PlayfulBackground";

const Login = () => {
   const {
      login,
      register,
      authError,
      user,
      loading,
      isAuthChecked,
      loginWithGoogle,
      googleLoginLoading
   } = useContext(AuthContext);
   const [isRegister, setIsRegister] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [showTutorial, setShowTutorial] = useState(false);
   const [localAuthError, setLocalAuthError] = useState(null);
   const [validationErrors, setValidationErrors] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthChecked && user) {
         navigate("/");
      }
   }, [user, navigate, isAuthChecked]);

   useEffect(() => {
      if (!loading) {
         setLocalAuthError(authError);
      }
   }, [authError, loading]);

   useEffect(() => {
      // Clear validation errors when switching between login and register
      setValidationErrors({});
      setLocalAuthError(null);
   }, [isRegister]);

   if (!isAuthChecked) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="animate-pulse text-xl font-bold dark:text-white transition-colors duration-300">Loading...</div>
         </div>
      );
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      // Clear validation error for this field when user types
      if (validationErrors[name]) {
         setValidationErrors({
            ...validationErrors,
            [name]: "",
         });
      }
   };

   const validateForm = () => {
      const errors = {};

      // Name validation (only for register)
      if (isRegister && !formData.name.trim()) {
         errors.name = "Nama tidak boleh kosong";
      }

      // Email validation
      if (!formData.email) {
         errors.email = "Email tidak boleh kosong";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         errors.email = "Format email tidak valid";
      }

      // Password validation
      if (!formData.password) {
         errors.password = "Password tidak boleh kosong";
      } else if (isRegister && formData.password.length < 6) {
         errors.password = "Password minimal 6 karakter";
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // Validate form first
      const isValid = validateForm();
      if (!isValid) return;

      // Clear previous auth errors
      setLocalAuthError(null);

      if (isRegister) {
         register(formData);
      } else {
         login({ email: formData.email, password: formData.password });
      }
   };

   const handleGoogleLogin = () => {
      loginWithGoogle();
   };


   return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center px-3 py-4 sm:py-6 relative transition-colors duration-300">
         {/* Add the playful background */}
         <PlayfulBackground />

         {/* Existing content wrapped with z-10 to ensure it's above the background */}
         <div className="w-full max-w-md z-10 relative">
            {/* More compact header with integrated logo */}
            <div className="flex items-center mb-4 justify-center">
               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center border-3 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] mr-3 transition-colors duration-300">
                  <img src={icon} alt="Login Icon" className="w-9 h-9 sm:w-12 sm:h-12" />
               </div>
               <h1 className="text-2xl sm:text-3xl font-bold dark:text-white transition-colors duration-300">
                  {isRegister ? "Daftar Baru" : "Login"}
               </h1>
            </div>

            <form
               onSubmit={handleSubmit}
               className="relative overflow-hidden rounded-xl border-4 border-black bg-white dark:bg-gray-800 p-5 sm:p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] w-full transition-colors duration-300"
            >
               {/* Small decorative corner */}
               <div className="absolute -top-2 -right-2 bg-yellow-300 dark:bg-yellow-600 w-12 h-12 rounded-bl-2xl border-b-3 border-l-3 border-black transform rotate-6 transition-colors duration-300">
                  <div className="absolute bottom-1 left-1 text-xs font-bold dark:text-black transition-colors duration-300">
                     {isRegister ? "New" : "Hi!"}
                  </div>
               </div>

               {/* More compact spacing between form elements */}
               {isRegister && (
                  <div className="mb-3 sm:mb-4">
                     <label className="block mb-1 font-bold dark:text-white transition-colors duration-300">Nama</label>
                     <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border-3 ${validationErrors.name ? "border-red-500" : "border-black"
                           } p-2 sm:p-3 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white transition-colors duration-300`}
                     />
                     {validationErrors.name && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1 transition-colors duration-300">
                           {validationErrors.name}
                        </p>
                     )}
                  </div>
               )}

               <div className="mb-3 sm:mb-4">
                  <label className="block mb-1 font-bold dark:text-white transition-colors duration-300">Email</label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     className={`w-full border-3 ${validationErrors.email ? "border-red-500" : "border-black"
                        } p-2 sm:p-3 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white transition-colors duration-300`}
                  />
                  {validationErrors.email && (
                     <p className="text-red-500 dark:text-red-400 text-xs mt-1 transition-colors duration-300">
                        {validationErrors.email}
                     </p>
                  )}
               </div>

               <div className="mb-4">
                  <label className="block mb-1 font-bold dark:text-white transition-colors duration-300">Password</label>
                  <input
                     type="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     className={`w-full border-3 ${validationErrors.password ? "border-red-500" : "border-black"
                        } p-2 sm:p-3 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white transition-colors duration-300`}
                  />
                  {validationErrors.password && (
                     <p className="text-red-500 dark:text-red-400 text-xs mt-1 transition-colors duration-300">
                        {validationErrors.password}
                     </p>
                  )}
               </div>

               {!loading && localAuthError && (
                  <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/50 border-2 border-red-400 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 text-center text-sm transition-colors duration-300">
                     {localAuthError}
                  </div>
               )}

               {/* Action buttons in single column with more compact design */}
               <div className="space-y-2">
                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full border-3 border-black bg-blue-400 dark:bg-blue-700 text-black dark:text-white py-2 sm:py-3 rounded-lg font-bold hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-blue-300 transition shadow-[4px_4px_0px_rgba(0,0,0,1)] ${loading ? "opacity-90" : ""} transition-colors duration-300`}
                  >
                     {loading ? (
                        <span className="flex items-center justify-center gap-2">
                           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           {isRegister ? "Mendaftar..." : "Masuk..."}
                        </span>
                     ) : (
                        isRegister ? "Daftar" : "Masuk "
                     )}
                  </button>

                  <LoginGoogleButton
                     onClick={handleGoogleLogin}
                     isLoading={googleLoginLoading}
                     isRegister={isRegister}
                  />
               </div>


               {/* Footer with register/login toggle and tutorial */}
               <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                  <p className="dark:text-gray-300 transition-colors duration-300">
                     {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
                     <span
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-500 dark:text-blue-400 underline cursor-pointer font-medium transition-colors duration-300"
                     >
                        {isRegister ? "Login" : "Register"}
                     </span>
                  </p>

                  <button
                     type="button"
                     onClick={() => setShowTutorial(true)}
                     className="mt-3 sm:mt-0 px-3 py-1 border-2 border-black bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white rounded-lg font-bold text-xs hover:bg-black hover:text-yellow-300 dark:hover:bg-black dark:hover:text-yellow-400 transition shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors duration-300"
                  >
                     📚 Tutorial
                  </button>
               </div>
            </form>
         </div>

         {/* Modal Tutorial */}
         {showTutorial && <TutorialPenggunaanAtLogin setShowTutorial={setShowTutorial} />}
      </div>
   );
};

export default Login;