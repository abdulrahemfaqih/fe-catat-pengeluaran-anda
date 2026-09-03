import React, { useState } from "react";
import WishlistDeleteConfirmation from "./WishlistDeleteConfirmation";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

const WishlistCard = ({ item, onUpdate, onDelete, index }) => {
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   const confirmDelete = () => {
      setShowDeleteConfirm(true);
   };

   const handleDelete = async () => {
      setIsDeleting(true);
      try {
         await onDelete(item._id);
      } catch (error) {
         console.error("Error deleting wishlist item", error);
      } finally {
         setIsDeleting(false);
         setShowDeleteConfirm(false);
      }
   };

   const displayLink = item.purchaseLink
      ? item.purchaseLink.replace(/^https?:\/\/(www\.)?/, "").slice(0, 30) + (item.purchaseLink.length > 30 ? "..." : "")
      : "-";

   return (
      <>
         <div className="bg-[var(--color-surface)] border-[3px] border-[var(--color-ink)] shadow-[4px_4px_0_var(--color-ink)] flex flex-col justify-between group">
            {/* Image Container with Top Badges */}
            <div className="relative aspect-[4/3] w-full border-b-[3px] border-[var(--color-ink)] bg-[var(--color-bg)] overflow-hidden">
               <img
                  src={
                     item.imageUrls ||
                     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e0e0dc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23666'%3E[ NO IMAGE AVAILABLE ]%3C/text%3E%3C/svg%3E"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-200"
                  onError={(e) => {
                     e.target.onerror = null;
                     e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e0e0dc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23666'%3E[ IMAGE ERROR ]%3C/text%3E%3C/svg%3E";
                  }}
               />

               {/* Price Badge on Top of Image (§6.6) */}
               <div className="absolute top-3 left-3 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] px-2.5 py-1 shadow-[2px_2px_0_var(--color-ink)]">
                  <span className="font-mono font-bold text-sm tracking-tight text-[var(--color-ink)] tabular-nums">
                     RP {Number(item.price || 0).toLocaleString("id-ID")}
                  </span>
               </div>

               {/* Item Sequence Number (#1, #2) Top Right (§6.6) */}
               <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-2 border-[var(--color-ink)] font-mono font-bold text-xs px-2 py-0.5 shadow-[2px_2px_0_var(--color-ink)]">
                  #{index + 1}
               </div>
            </div>

            {/* Content Section: Definition List style (§6.6) */}
            <div className="p-5 flex-1 flex flex-col justify-between">
               <div>
                  <h3 className="font-macro uppercase text-lg sm:text-xl text-[var(--color-ink)] tracking-tight mb-4 border-b border-[var(--color-ink)]/15 pb-2 line-clamp-1">
                     {item.name}
                  </h3>

                  <dl className="space-y-3 font-mono text-xs">
                     {/* Description */}
                     <div>
                        <dt className="text-[10px] uppercase font-bold text-[var(--color-ink-muted)] tracking-wider mb-0.5">
                           DESKRIPSI:
                        </dt>
                        <dd className="font-body text-xs text-[var(--color-ink)] line-clamp-2">
                           {item.description || "Tidak ada catatan deskripsi."}
                        </dd>
                     </div>

                     {/* Purchase Link */}
                     <div>
                        <dt className="text-[10px] uppercase font-bold text-[var(--color-ink-muted)] tracking-wider mb-0.5">
                           LINK PEMBELIAN:
                        </dt>
                        <dd>
                           {item.purchaseLink ? (
                              <a
                                 href={item.purchaseLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="inline-flex items-center gap-1 text-[var(--color-ink)] underline font-mono text-xs hover:text-[var(--color-warning)] font-medium break-all"
                              >
                                 <span>{displayLink}</span>
                                 <ExternalLink size={12} />
                              </a>
                           ) : (
                              <span className="text-[var(--color-ink-muted)]">-</span>
                           )}
                        </dd>
                     </div>
                  </dl>
               </div>

               {/* Action Buttons (Secondary & Danger) */}
               <div className="flex gap-2.5 mt-5 pt-4 border-t-2 border-[var(--color-ink)] justify-end">
                  <button
                     onClick={() => onUpdate(item)}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] px-3.5 py-1.5 shadow-[2px_2px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                     <Pencil size={13} className="stroke-[2]" />
                     <span>EDIT</span>
                  </button>

                  <button
                     onClick={confirmDelete}
                     className="font-mono uppercase text-xs tracking-wider font-bold bg-[var(--color-surface)] text-[var(--color-negative)] border-2 border-[var(--color-negative)] px-3.5 py-1.5 shadow-[2px_2px_0_var(--color-negative)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-negative)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
                  >
                     <Trash2 size={13} className="stroke-[2]" />
                     <span>HAPUS</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Delete Confirmation Modal */}
         <WishlistDeleteConfirmation
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDelete}
            wishlistItem={item}
            isLoading={isDeleting}
         />
      </>
   );
};

export default WishlistCard;
