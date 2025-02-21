// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../public/icon.svg";

const Login = () => {
   const { login, register, authError, user } = useContext(AuthContext);
   const [isRegister, setIsRegister] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
   });
   const navigate = useNavigate();

   // Jika sudah login, langsung arahkan ke dashboard (/)
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
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
         <div className="">
            <img
               src={logo}
               alt="Logo"
               className="w-32 h-32 mx-auto "
            />

            <form
               onSubmit={handleSubmit}
               className="border-2 border-black bg-white p-6 rounded-md shadow-md w-80"
            >
               <h1 className="text-2xl font-bold mb-4">
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
                  <div className="mb-4 text-red-500 text-center px-4 py-2 font-semibold border-3">
                     {authError}
                  </div>
               )}

               <button
                  type="submit"
                  className="w-full border-2 border-black bg-white text-black py-2 rounded-md font-medium hover:bg-black hover:text-white transition"
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
            </form>
         </div>
      </div>
   );
};

export default Login;
