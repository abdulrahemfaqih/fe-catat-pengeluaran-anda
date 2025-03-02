import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon_login.svg";

const Login = () => {
   const { login, register, authError, user, loading, isAuthChecked } = useContext(AuthContext);
   const [isRegister, setIsRegister] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [showTutorial, setShowTutorial] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthChecked && user) {
         navigate("/");
      }
   }, [user, navigate, isAuthChecked]);

   if (!isAuthChecked) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-pulse text-xl font-bold">Loading...</div>
         </div>
      );
   }

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isRegister) {
         register(formData);
      } else {
         login({ email: formData.email, password: formData.password });
      }
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
            <div className="absolute -top-2 -right-2 bg-yellow-300 w-24 h-24 rounded-bl-3xl border-b-4 border-l-4 border-black transform rotate-6">
               <div className="absolute bottom-3 left-3 text-sm font-bold">
                  {isRegister ? "Register" : "Login"}
               </div>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">
               {isRegister ? "Buat Akun Baru" : "Masuk ke Akun"}
            </h1>

            {isRegister && (
               <div className="mb-5">
                  <label className="block mb-2 font-bold">Nama</label>
                  <input
                     type="text"
                     name="name"
                     onChange={handleChange}
                     className="w-full border-3 border-black p-3 rounded-lg focus:outline-none"
                     required
                  />
               </div>
            )}

            <div className="mb-5">
               <label className="block mb-2 font-bold">Email</label>
               <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border-3 border-black p-3 rounded-lg focus:outline-none"
                  required
               />
            </div>

            <div className="mb-6">
               <label className="block mb-2 font-bold">Password</label>
               <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border-3 border-black p-3 rounded-lg focus:outline-none"
                  required
               />
            </div>

            {authError && (
               <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-center">
                  {authError}
               </div>
            )}

            {loading && (
               <div className="mb-4 text-center text-gray-600">
                  <div className="inline-block animate-spin h-6 w-6 border-t-2 border-black rounded-full mr-2"></div>
                  Loading...
               </div>
            )}

            <button
               type="submit"
               disabled={loading}
               className={`w-full border-3 border-black bg-blue-400 text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white transition shadow-[5px_5px_0px_rgba(0,0,0,1)] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
               {isRegister ? "Daftar Sekarang" : "Masuk"}
            </button>

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
                        <p>Jika belum punya akun, masukkan nama, email, dan password di form Register. Setelah berhasil, Anda akan otomatis login.</p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-green-50">
                        <h3 className="font-bold mb-1">2. Login</h3>
                        <p>Jika sudah punya akun, gunakan email dan password untuk masuk ke dashboard.</p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-yellow-50">
                        <h3 className="font-bold mb-1">3. Dashboard</h3>
                        <p>Anda bisa menambahkan transaksi harian (tanggal, nama, kategori, dan nominal), mengatur budget per kategori, dan memasukkan pemasukan bulanan.</p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-red-50">
                        <h3 className="font-bold mb-1">4. History</h3>
                        <p>Setelah selesai mengisi transaksi dalam satu bulan, klik tombol "Simpan Pengeluaran Bulan Ini" agar pengeluaran bulan tersebut tercatat di riwayat.</p>
                     </div>

                     <div className="p-3 border-3 border-black rounded-lg bg-purple-50">
                        <h3 className="font-bold mb-1">5. Melihat Riwayat</h3>
                        <p>Anda dapat membuka riwayat pengeluaran bulanan untuk melihat total per kategori pada bulan sebelumnya.</p>
                     </div>
                  </div>

                  <p className="mb-6 p-3 border-3 border-black rounded-lg bg-gray-50">
                     Pastikan Anda mengisi data dengan benar. Setelah selesai, jangan lupa untuk logout agar akun Anda aman.
                  </p>

                  <p className="mb-6 font-medium">
                     Jika ada pertanyaan lebih lanjut, silakan hubungi admin
                     di <a target="_blank" href="https://abdulrahemfaqih.works" className="text-blue-500 underline font-bold">link ini</a> pada menu Contact.
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