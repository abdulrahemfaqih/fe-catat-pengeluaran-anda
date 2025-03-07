import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

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
            description: "Catat pengeluaran Anda dengan mudah",
            theme_color: "#ffffff",
            icons: [
               {
                  src: "icon.svg",
                  sizes: "192x192",
                  type: "image/svg+xml",
               },
               {
                  src: "icon.svg",
                  sizes: "512x512",
                  type: "image/svg+xml",
               },
            ],
         },
      }),
   ],
});
