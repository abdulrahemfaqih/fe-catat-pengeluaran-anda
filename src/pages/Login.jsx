import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import icon from "../../public/icon.svg";

const Login = () => {
  const { login, register, authError, user, loading } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
     <div className="flex-col min-h-screen bg-white text-black flex items-center justify-center">
      <img src={icon} className="w-32 h-32" />
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
          <div className="mb-4 text-red-500 text-center">{authError}</div>
        )}

        {/* Loading Indicator */}
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
      </form>
    </div>
  );
};

export default Login;
