import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Urls from "./Urls.jsx";
import axios from "axios";
import { AuthContextProvider } from "./pages/middleware/AuthContext";
import { AdminContextProvider } from "./pages/middleware/AdminContext";
import { UserContextProvider } from "./pages/middleware/UserContext";
import { ParkingContextProvider } from "./pages/middleware/ParkingContext.jsx";
import { BookingContextProvider } from "./pages/middleware/BookingContext.jsx";
import { TestimonialProvider } from "./pages/middleware/TestimonialContext.jsx";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <UserContextProvider>
            <ParkingContextProvider>
              <BookingContextProvider>
                <TestimonialProvider>
                  <Urls />
                </TestimonialProvider>
              </BookingContextProvider>
            </ParkingContextProvider>
          </UserContextProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
