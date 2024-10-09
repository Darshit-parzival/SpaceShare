import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Urls from "./Urls.jsx";
import axios from "axios";
import { AuthContextProvider } from "./pages/middleware/AuthContext";
import { AdminContextProvider } from "./pages/middleware/AdminContext";
import { UserContextProvider } from "./pages/middleware/UserContext";
import { ParkingContextProvider } from "./pages/middleware/ParkingContext.jsx";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <UserContextProvider>
            <ParkingContextProvider>
              <Urls />
            </ParkingContextProvider>
          </UserContextProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
