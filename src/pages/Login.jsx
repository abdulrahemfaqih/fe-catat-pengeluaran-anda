import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import icon from "../../public/icon_login.svg";

const Login = () => {
   const { login, register, authError, user, loading } =
      useContext(AuthContext);
   const [isRegister, setIsRegister] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [showTutorial, setShowTutorial] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (user) {
         navigate("/");
      }
   }, [user, navigate]);

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
      <div className="flex flex-col min-h-screen bg-white text-black items-center justify-center px-4">
         <img src={icon} alt="Login Icon" className="w-28 mb-4" />
         <form
            onSubmit={handleSubmit}
            className="border-2 border-black bg-white p-6 rounded-md shadow-md w-full max-w-sm"
         >
            <h1 className="text-2xl font-bold mb-4 text-center">
               {isRegister ? "Register" : "Login"}
            </h1>

            {isRegister && (
               <div className="mb-4">
                  <label className="block mb-1 font-medium">Nama</label>
                  <input
                     type="text"
                     name="name"
                     onChange={handleChange}
                     className="w-full border-2 border-black p-2 rounded focus:outline-none"
                     required
                  />
               </div>
            )}

            <div className="mb-4">
               <label className="block mb-1 font-medium">Email</label>
               <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border-2 border-black p-2 rounded focus:outline-none"
                  required
               />
            </div>

            <div className="mb-4">
               <label className="block mb-1 font-medium">Password</label>
               <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border-2 border-black p-2 rounded focus:outline-none"
                  required
               />
            </div>

            {authError && (
               <div className="mb-4 text-red-500 text-center">{authError}</div>
            )}

            {loading && (
               <div className="mb-4 text-center text-gray-600">Loading...</div>
            )}

            <button
               type="submit"
               disabled={loading}
               className={`w-full border-2 border-black bg-white text-black py-2 rounded-md font-medium hover:bg-black hover:text-white transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
               }`}
            >
               {isRegister ? "Register" : "Login"}
            </button>

            <p className="mt-4 text-center">
               {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
               <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-black underline cursor-pointer hover:text-gray-700"
               >
                  {isRegister ? "Login" : "Register"}
               </span>
            </p>

            {/* Tombol Tutorial */}
            <div className="mt-6 text-center">
               <button
                  type="button"
                  onClick={() => setShowTutorial(true)}
                  className="px-4 py-2 border-2 border-black bg-white text-black rounded-md font-medium hover:bg-black hover:text-white transition"
               >
                  Tutorial
               </button>
            </div>
         </form>

         {/* Modal Tutorial */}
         {showTutorial && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
               <div className="bg-white border-2 border-black p-6 rounded-md w-full max-w-md max-h-[80vh] overflow-auto">
                  <h2 className="text-xl font-bold mb-4 text-center">
                     Cara Menggunakan Aplikasi
                  </h2>

                  <p className="mb-2">
                     Aplikasi ini membantu Anda mencatat pemasukan dan
                     pengeluaran harian, mengatur budget, serta menyimpan
                     riwayat pengeluaran bulanan. Berikut panduan singkatnya:
                  </p>

                  <ol className="list-decimal list-inside mb-4 space-y-2">
                     <li>
                        <strong>Register:</strong> Jika belum punya akun,
                        masukkan nama, email, dan password di form Register.
                        Setelah berhasil, Anda akan otomatis login.
                     </li>
                     <li>
                        <strong>Login:</strong> Jika sudah punya akun, gunakan
                        email dan password untuk masuk ke dashboard.
                     </li>
                     <li>
                        <strong>Dashboard:</strong> Anda bisa menambahkan
                        transaksi harian (tanggal, nama, kategori, dan nominal),
                        mengatur budget per kategori, dan memasukkan pemasukan
                        bulanan.
                     </li>
                     <li>
                        <strong>History:</strong> Setelah selesai mengisi
                        transaksi dalam satu bulan, klik tombol "Simpan
                        Pengeluaran Bulan Ini" agar pengeluaran bulan tersebut
                        tercatat di riwayat.
                     </li>
                     <li>
                        <strong>Melihat Riwayat:</strong> Anda dapat membuka
                        riwayat pengeluaran bulanan untuk melihat total per
                        kategori pada bulan sebelumnya.
                     </li>
                  </ol>

                  <p className="mb-4">
                     Pastikan Anda mengisi data dengan benar. Setelah selesai,
                     jangan lupa untuk logout agar akun Anda aman.
                  </p>

                  <p className="mb-4">
                     Jika ada pertanyaan lebih lanjut, silakan hubungi admin
                     di <a target="_blank" href="https://abdulrahemfaqih.works" className="text-blue-500 underline">link ini</a> pada menu Contact.
                  </p>

                  <div className="flex justify-end">
                     <button
                        onClick={() => setShowTutorial(false)}
                        className="px-4 py-2 border-2 border-black bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition"
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
