import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon_login.svg";
import LoginGoogleButton from "../components/LoginGoogleButton";

const Login = () => {
   const {
      login,
      register,
      authError,
      user,
      loading,
      isAuthChecked,
      loginWithGoogle,
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
         <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-pulse text-xl font-bold">Loading...</div>
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
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center px-4 py-8">
         <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-black mb-6 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
            <img src={icon} alt="Login Icon" className="w-16 h-16" />
         </div>

         <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] w-full max-w-md"
         >
            <div className="absolute -top-2 -right-2 bg-yellow-300 w-16 h-16 sm:w-24 sm:h-24 rounded-bl-3xl border-b-4 border-l-4 border-black transform rotate-6">
               <div className="absolute bottom-2 left-2 text-xs sm:text-sm font-bold">
                  {isRegister ? "Register" : "Login"}
               </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center max-w-[85%] mx-auto">
               {isRegister ? "Buat Akun Baru" : "Masuk ke Akun"}
            </h1>

            {isRegister && (
               <div className="mb-5">
                  <label className="block mb-2 font-bold">Nama</label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className={`w-full border-3 ${
                        validationErrors.name
                           ? "border-red-500"
                           : "border-black"
                     } p-3 rounded-lg focus:outline-none`}
                  />
                  {validationErrors.name && (
                     <p className="text-red-500 text-sm mt-1">
                        {validationErrors.name}
                     </p>
                  )}
               </div>
            )}

            <div className="mb-5">
               <label className="block mb-2 font-bold">Email</label>
               <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border-3 ${
                     validationErrors.email ? "border-red-500" : "border-black"
                  } p-3 rounded-lg focus:outline-none`}
               />
               {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                     {validationErrors.email}
                  </p>
               )}
            </div>

            <div className="mb-6">
               <label className="block mb-2 font-bold">Password</label>
               <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border-3 ${
                     validationErrors.password
                        ? "border-red-500"
                        : "border-black"
                  } p-3 rounded-lg focus:outline-none`}
               />
               {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                     {validationErrors.password}
                  </p>
               )}
            </div>

            {!loading && localAuthError && (
               <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-center">
                  {localAuthError}
               </div>
            )}

            {loading && (
               <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded-lg text-yellow-700 text-center">
                  <div className="flex items-center justify-center mb-1">
                     <span className="mr-2 font-medium">Mohon tunggu</span>
                     <span className="flex space-x-1">
                        <span
                           className="inline-block w-2 h-2 bg-yellow-600 rounded-full animate-bounce"
                           style={{ animationDuration: "0.6s" }}
                        ></span>
                        <span
                           className="inline-block w-2 h-2 bg-yellow-600 rounded-full animate-bounce"
                           style={{
                              animationDuration: "0.6s",
                              animationDelay: "0.2s",
                           }}
                        ></span>
                        <span
                           className="inline-block w-2 h-2 bg-yellow-600 rounded-full animate-bounce"
                           style={{
                              animationDuration: "0.6s",
                              animationDelay: "0.4s",
                           }}
                        ></span>
                     </span>
                  </div>
                  <span className="text-sm block">
                     Proses ini mungkin memakan waktu beberapa saat
                  </span>
               </div>
            )}

            <button
               type="submit"
               disabled={loading}
               className={`w-full border-3 border-black bg-blue-400 text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white transition shadow-[5px_5px_0px_rgba(0,0,0,1)] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
               }`}
            >
               {isRegister ? "Daftar Sekarang" : "Masuk"}
            </button>

            <LoginGoogleButton onClick={handleGoogleLogin} />

            <p className="mt-6 text-center">
               {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
               <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-blue-500 underline cursor-pointer font-medium hover:text-blue-700"
               >
                  {isRegister ? "Login" : "Register"}
               </span>
            </p>

            {/* Tombol Tutorial */}
            <div className="mt-8 text-center">
               <button
                  type="button"
                  onClick={() => setShowTutorial(true)}
                  className="px-4 py-2 border-3 border-black bg-yellow-300 text-black rounded-lg font-bold hover:bg-black hover:text-yellow-300 transition shadow-[4px_4px_0px_rgba(0,0,0,1)]"
               >
                  📚 Tutorial
               </button>
            </div>
         </form>

         {/* Modal Tutorial */}
         {showTutorial && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
               <div className="relative bg-white border-4 border-black p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-auto shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                  <div className="absolute -top-2 -left-2 rounded-full bg-blue-400 border-4 border-black h-12 w-12 flex items-center justify-center font-bold text-2xl">
                     ?
                  </div>
                  <h2 className="text-2xl font-bold mb-6 mt-4 text-center">
                     Cara Menggunakan Aplikasi
                  </h2>

                  <p className="mb-4">
                     Aplikasi ini membantu Anda mencatat pemasukan dan
                     pengeluaran harian, mengatur budget, serta menyimpan
                     riwayat pengeluaran bulanan.
                  </p>

                  <div className="space-y-4 mb-6">
                     <div className="p-3 border-3 border-black rounded-lg bg-blue-50">
                        <h3 className="font-bold mb-1">1. Register</h3>
                        <p>
                           Jika belum punya akun, masukkan nama, email, dan
                           password di form Register. Setelah berhasil, Anda
                           akan otomatis login.
                        </p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-green-50">
                        <h3 className="font-bold mb-1">2. Login</h3>
                        <p>
                           Jika sudah punya akun, gunakan email dan password
                           untuk masuk ke dashboard.
                        </p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-yellow-50">
                        <h3 className="font-bold mb-1">3. Dashboard</h3>
                        <p>
                           Anda bisa menambahkan transaksi harian (tanggal,
                           nama, kategori, dan nominal), mengatur budget per
                           kategori, dan memasukkan pemasukan bulanan.
                        </p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-red-50">
                        <h3 className="font-bold mb-1">4. History</h3>
                        <p>
                           Setelah selesai mengisi transaksi dalam satu bulan,
                           klik tombol "Simpan Pengeluaran Bulan Ini" agar
                           pengeluaran bulan tersebut tercatat di riwayat.
                        </p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-purple-50">
                        <h3 className="font-bold mb-1">5. Melihat Riwayat</h3>
                        <p>
                           Anda dapat membuka riwayat pengeluaran bulanan untuk
                           melihat total per kategori pada bulan sebelumnya.
                        </p>
                     </div>
                  </div>

                  <p className="mb-6 p-3 border-3 border-black rounded-lg bg-gray-50">
                     Pastikan Anda mengisi data dengan benar. Setelah selesai,
                     jangan lupa untuk logout agar akun Anda aman.
                  </p>

                  <p className="mb-6 font-medium">
                     Jika ada pertanyaan lebih lanjut, silakan hubungi admin di{" "}
                     <a
                        target="_blank"
                        href="https://abdulrahemfaqih.works"
                        className="text-blue-500 underline font-bold"
                     >
                        link ini
                     </a>{" "}
                     pada menu Contact.
                  </p>

                  <div className="flex justify-end">
                     <button
                        onClick={() => setShowTutorial(false)}
                        className="px-6 py-3 border-3 border-black bg-white text-black font-bold rounded-lg hover:bg-black hover:text-white transition shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                     >
                        Tutup
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Login;
