// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
      <div className="flex items-center justify-center h-screen bg-gray-100">
         <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-80"
         >
            {isRegister && (
               <div className="mb-4">
                  <label className="block mb-1">Nama</label>
                  <input
                     type="text"
                     name="name"
                     onChange={handleChange}
                     className="w-full border p-2 rounded"
                     required
                  />
               </div>
            )}
            <div className="mb-4">
               <label className="block mb-1">Email</label>
               <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block mb-1">Password</label>
               <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
               />
            </div>
            {authError && (
               <div className="mb-4 text-red-500 text-center">{authError}</div>
            )}
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 rounded"
            >
               {isRegister ? "Register" : "Login"}
            </button>
            <p className="mt-4 text-center">
               {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
               <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-blue-500 cursor-pointer"
               >
                  {isRegister ? "Login" : "Register"}
               </span>
            </p>
         </form>
      </div>
   );
};

export default Login;
