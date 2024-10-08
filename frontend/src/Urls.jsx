import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/client/Index";
import About from "./pages/client/About";
import Price from "./pages/client/Price";
import { useEffect, useContext } from "react";
import Why from "./pages/client/Why";
import Testimonial from "./pages/client/Testimonial";
import SignIn from "./pages/client/SignIn";
import SignUp from "./pages/client/SignUp";
import { AuthContext } from "./pages/middleware/AuthContext";
import IndexAdmin from "./pages/admin/IndexAdmin";
import ForgotAdmin from "./pages/admin/ForgotAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Admins from "./pages/admin/Admins";
import Users from "./pages/admin/Users";
import ParkingOwner from "./pages/admin/ParkingOwner";
import ParkingOwnerProfile from "./pages/admin/ParkinOwnerProfile";
import ParkingOwnerAdd from "./pages/admin/ParkingOwnerAdd";
import ParkingSpaceReport from "./pages/admin/ParkingSpaceReport";
import ParkingSpaceGraph from "./pages/admin/ParkingSpaceGraph";
import Requests from "./pages/admin/Requests";

const Urls = () => {
  const location = useLocation();
  const { loggedIn, adminLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!adminLoggedIn && location.pathname.startsWith("/admin")) {
        navigate("/admin");
      } else if (
        loggedIn &&
        (location.pathname === "/signin" || location.pathname === "/signup")
      ) {
        navigate("/");
      }
    }
  }, [loggedIn, adminLoggedIn, location.pathname, navigate, loading]);

  return (
    !loading && (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Price />} />
        <Route path="/why" element={<Why />} />
        <Route path="/testimonial" element={<Testimonial />} />
        {loggedIn === false && (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<SignIn />} />
          </>
        )}
        <Route path="/admin" element={<IndexAdmin />} />
        {adminLoggedIn && (
          <>
            <Route path="/admin/forget" element={<ForgotAdmin />} />
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/admins" element={<Admins />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/parkingOwner" element={<ParkingOwner />} />
            <Route
              path="/admin/parkingOwnerProfile"
              element={<ParkingOwnerProfile />}
            />
            <Route
              path="/admin/parkingOwnerAdd"
              element={<ParkingOwnerAdd />}
            />
            <Route
              path="/admin/parkingSpaceReport"
              element={<ParkingSpaceReport />}
            />
            <Route
              path="/admin/parkingSpaceGraph"
              element={<ParkingSpaceGraph />}
            />
            <Route path="/admin/req" element={<Requests />} />
          </>
        )}
      </Routes>
    )
  );
};

export default Urls;
