import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Urls from "./Urls.jsx";
import axios from "axios";
import { AuthContextProvider } from "./pages/middleware/AuthContext";
import { AdminContextProvider } from "./pages/middleware/AdminContext";
import { UserProvider } from "./pages/middleware/UserContext";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <UserProvider>
            <Urls />
          </UserProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
