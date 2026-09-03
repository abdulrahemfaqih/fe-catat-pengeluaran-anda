import React from "react";
import PropTypes from "prop-types";

export default function WelcomeMessage({ user }) {
   const userName = user && user.name ? user.name : "Pengguna";

   return (
      <section className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] p-5 sm:p-6 shadow-[4px_4px_0_var(--color-ink)]">
         <h2 className="font-macro uppercase text-xl sm:text-2xl text-[var(--color-ink)] tracking-tight">
            SELAMAT DATANG, <span className="underline decoration-[var(--color-accent)] decoration-4 underline-offset-4">{userName}</span>
         </h2>
         <p className="font-mono text-xs text-[var(--color-ink-muted)] mt-1.5 uppercase tracking-wide">
            Kelola pengeluaran dan anggaran bulanan Anda dengan rapi
         </p>
      </section>
   );
}

WelcomeMessage.propTypes = {
   user: PropTypes.shape({
      name: PropTypes.string,
   }),
};
