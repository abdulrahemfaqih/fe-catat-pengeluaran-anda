import React from "react";
import { Plus } from "lucide-react";

const AddWishlistButton = ({ onClick }) => {
   return (
      <button
         onClick={onClick}
         className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] px-5 py-2.5 shadow-[4px_4px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center gap-2"
      >
         <Plus size={16} className="stroke-[3]" />
         <span>TAMBAH ITEM WISHLIST</span>
      </button>
   );
};

export default AddWishlistButton;