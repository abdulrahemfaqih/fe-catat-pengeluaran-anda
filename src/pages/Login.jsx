import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginGoogleButton from "../components/LoginGoogleButton";
import TutorialPenggunaanAtLogin from "../components/TutorialPenggunaanAtLogin";
import { ArrowRight, BookOpen, AlertCircle } from "lucide-react";

const Login = () => {
   const {
      login,
      register,
      authError,
      user,
      loading,
      isAuthChecked,
      loginWithGoogle,
      googleLoginLoading,
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
      setValidationErrors({});
      setLocalAuthError(null);
   }, [isRegister]);

   if (!isAuthChecked) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)] font-mono text-xs uppercase tracking-widest text-[var(--color-ink)]">
            MEMERIKSA SESI...
         </div>
      );
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      if (validationErrors[name]) {
         setValidationErrors({
            ...validationErrors,
            [name]: "",
         });
      }
   };

   const validateForm = () => {
      const errors = {};

      if (isRegister && !formData.name.trim()) {
         errors.name = "NAMA TIDAK BOLEH KOSONG";
      }

      if (!formData.email) {
         errors.email = "EMAIL TIDAK BOLEH KOSONG";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         errors.email = "FORMAT EMAIL TIDAK VALID";
      }

      if (!formData.password) {
         errors.password = "PASSWORD TIDAK BOLEH KOSONG";
      } else if (isRegister && formData.password.length < 6) {
         errors.password = "PASSWORD MINIMAL 6 KARAKTER";
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validateForm();
      if (!isValid) return;

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
      <div className="min-h-screen w-full flex flex-col md:flex-row bg-[var(--color-bg)] text-[var(--color-ink)]">
         {/* Kolom Kiri: Branding & Statement Visual (Inverted Substrate §7) */}
         <div className="w-full md:w-[45%] bg-[var(--color-ink)] text-[var(--color-bg)] p-8 sm:p-12 md:p-16 flex flex-col justify-between border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--color-ink)]">
            <div>
               {/* Brand Header */}
               <div className="flex items-center gap-2 mb-8">
                  <span className="w-4 h-4 bg-[var(--color-accent)] border border-[var(--color-bg)] inline-block" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-bold">
                     CATAT PENGELUARAN ANDA
                  </span>
               </div>

               <h1 className="font-macro uppercase tracking-tighter leading-none text-5xl sm:text-6xl lg:text-7xl mb-4 text-[var(--color-bg)]">
                  KEUANGAN
               </h1>

               <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--color-accent)] font-semibold max-w-sm">
                  KENDALI PENUH ARUS KAS, ANGGARAN KATEGORI, DAN ARSIP WISHLIST.
               </p>
            </div>
         </div>

         {/* Kolom Kanan: Form Authentication */}
         <div className="w-full md:w-[55%] flex items-center justify-center p-6 sm:p-10 md:p-16 bg-[var(--color-bg)]">
            <div className="w-full max-w-md bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-ink)] p-6 sm:p-8">
               {/* Title with accent underline */}
               <div className="mb-6">
                  <h2 className="font-mono uppercase text-2xl font-bold tracking-tight inline-block pb-1 border-b-[3px] border-[var(--color-accent)] text-[var(--color-ink)]">
                     {isRegister ? "DAFTAR AKUN" : "LOGIN"}
                  </h2>
                  <p className="font-body text-xs text-[var(--color-ink-muted)] mt-2">
                     {isRegister
                        ? "Daftarkan akun baru untuk mulai mencatat keuangan Anda."
                        : "Masukkan email dan kata sandi Anda untuk masuk."}
                  </p>
               </div>

               {/* Error Banner */}
               {localAuthError && (
                  <div className="mb-5 p-3 border-2 border-[var(--color-negative)] bg-[var(--color-surface)] text-[var(--color-negative)] font-mono text-xs font-bold flex items-center gap-2">
                     <AlertCircle size={16} className="shrink-0" />
                     <span>{localAuthError.toUpperCase()}</span>
                  </div>
               )}

               {/* Form Fields */}
               <form onSubmit={handleSubmit} className="space-y-4">
                  {isRegister && (
                     <div>
                        <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                           NAMA LENGKAP
                        </label>
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2.5 font-body text-sm focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                           placeholder="Nama Lengkap"
                        />
                        {validationErrors.name && (
                           <p className="font-mono text-[10px] text-[var(--color-negative)] mt-1 uppercase font-bold">
                              {validationErrors.name}
                           </p>
                        )}
                     </div>
                  )}

                  <div>
                     <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                        ALAMAT EMAIL
                     </label>
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2.5 font-body text-sm focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        placeholder="email@domain.com"
                     />
                     {validationErrors.email && (
                        <p className="font-mono text-[10px] text-[var(--color-negative)] mt-1 uppercase font-bold">
                           {validationErrors.email}
                        </p>
                     )}
                  </div>

                  <div>
                     <label className="block mb-1 font-mono uppercase text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider">
                        KATA SANDI
                     </label>
                     <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] text-[var(--color-ink)] p-2.5 font-body text-sm focus:outline-2 focus:outline-[var(--color-accent)] focus:outline-offset-2"
                        placeholder="••••••••"
                     />
                     {validationErrors.password && (
                        <p className="font-mono text-[10px] text-[var(--color-negative)] mt-1 uppercase font-bold">
                           {validationErrors.password}
                        </p>
                     )}
                  </div>

                  {/* Submit Button */}
                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full mt-2 font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] py-3 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                     <span>{loading ? "MEMPROSES..." : isRegister ? "DAFTAR SEKARANG" : "MASUK"}</span>
                     {!loading && <ArrowRight size={14} className="stroke-[3]" />}
                  </button>
               </form>

               {/* Divider ── ATAU ── */}
               <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-[var(--color-ink)]" />
                  </div>
                  <span className="relative bg-[var(--color-surface)] px-3 font-mono text-[11px] font-bold text-[var(--color-ink-muted)] tracking-wider uppercase">
                     ATAU
                  </span>
               </div>

               {/* Google OAuth Button Container */}
               <div className="border-2 border-[var(--color-ink)] p-px">
                  <LoginGoogleButton
                     onClick={handleGoogleLogin}
                     isLoading={googleLoginLoading}
                     isRegister={isRegister}
                  />
               </div>

               {/* Footer switch & tutorial button */}
               <div className="mt-6 pt-4 border-t border-[var(--color-ink)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                  <div>
                     <span className="text-[var(--color-ink-muted)]">
                        {isRegister ? "Sudah terdaftar? " : "Belum punya akun? "}
                     </span>
                     <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="font-bold underline decoration-[var(--color-accent)] decoration-2 underline-offset-2 text-[var(--color-ink)] hover:text-[var(--color-warning)]"
                     >
                        {isRegister ? "MASUK" : "DAFTAR"}
                     </button>
                  </div>

                  <button
                     type="button"
                     onClick={() => setShowTutorial(true)}
                     className="inline-flex items-center gap-1.5 font-bold uppercase text-[11px] border border-[var(--color-ink)] px-2.5 py-1 bg-[var(--color-surface)] hover:bg-[var(--color-bg)] transition-colors"
                  >
                     <BookOpen size={12} className="stroke-[2.5]" />
                     <span>PANDUAN</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Tutorial Modal */}
         {showTutorial && (
            <TutorialPenggunaanAtLogin setShowTutorial={setShowTutorial} />
         )}
      </div>
   );
};

export default Login;