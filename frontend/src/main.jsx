import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Urls from "./Urls.jsx";
import axios from "axios";
import { AuthContextProvider } from "./pages/middleware/AuthContext.jsx";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Urls />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
