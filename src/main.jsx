import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <AuthProvider>
         <App />
      </AuthProvider>
   </React.StrictMode>
);

if ("serviceWorker" in navigator) {
   window.addEventListener("load", () => {
      navigator.serviceWorker
         .register("/sw.js")
         .then((registration) => {
            console.log("SW registered: ", registration);
         })
         .catch((error) => {
            console.log("SW registration failed: ", error);
         });
   });
}
