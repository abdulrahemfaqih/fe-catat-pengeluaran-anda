import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
      VitePWA({
         registerType: "autoUpdate",
         includeAssets: [
            "favicon.ico",
            "apple-touch-icon.png",
            "masked-icon.svg",
         ],
         manifest: {
            name: "Catat Pengeluaran Anda",
            short_name: "Catat Pengeluaran",
            description: "Catat pengeluaran Anda dengan mudah dan menyenangkan",
            theme_color: "#FFD700", // Warna tema kuning emas untuk nuansa playful
            background_color: "#FFF8DC", // Warna background cornsilk yang cerah
            display: "standalone",
            orientation: "portrait",
            icons: [
               {
                  src: "icon.svg",
                  sizes: "192x192",
                  type: "image/svg+xml",
               },
               {
                  src: "icon-192.png", // Tambahkan PNG sebagai fallback
                  sizes: "192x192",
                  type: "image/png",
               },
               {
                  src: "icon.svg",
                  sizes: "512x512",
                  type: "image/svg+xml",
               },
               {
                  src: "icon-512.png", // Tambahkan PNG sebagai fallback
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "any maskable", // Penting untuk tampilan ikon di Android
               },
            ],
         },
      }),
   ],
});
