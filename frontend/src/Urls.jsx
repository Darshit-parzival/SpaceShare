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
import RegisterOwner from "./pages/client/RegisterOwner";
import ContactMessages from "./pages/admin/ContactMessages";
import OwnerLogin from "./pages/client/OwnerLogin";
import OwnerHome from "./pages/owner/OwnerHome";
import Profile from "./pages/client/Profile";
import PageNotFound from "./PageNotFound";
import Cart from "./pages/client/Cart";
import GiveTestimonial from "./pages/client/GiveTestimonial";
import DetailedCart from "./pages/client/DetailedCart";
import Cookies from "js-cookie";
import PaymentHistory from "./pages/client/PaymentHistory";
import Testimonials from "./pages/admin/Testimonials";
import OwnerProfile from "./pages/owner/OwnerProfile";
import UsersOfOwners from "./pages/owner/UsersOfOwners";

const Urls = () => {
  const location = useLocation();
  const { loggedIn, adminLoggedIn, ownerLoggedIn, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const deleteCookie = () => {
    Cookies.remove("userToken");
  };

  useEffect(() => {
    if (!loading) {
      if (!ownerLoggedIn && location.pathname.startsWith("/owner")) {
        navigate("/OwnerLogin");
      } else if (!adminLoggedIn && location.pathname.startsWith("/admin")) {
        navigate("/admin");
      } else if (
        loggedIn &&
        (location.pathname === "/signin" ||
          location.pathname === "/signup" ||
          location.pathname === "/forgot")
      ) {
        navigate("/");
      } else if (loggedIn === false && location.pathname === "/profile") {
        navigate("/");
      }
    }
    window.addEventListener("beforeunload", deleteCookie);

    return () => {
      window.removeEventListener("beforeunload", deleteCookie);
      deleteCookie();
    };
  }, [
    loggedIn,
    adminLoggedIn,
    location.pathname,
    navigate,
    loading,
    ownerLoggedIn,
  ]);

  return (
    !loading && (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/price" element={<Price />} />
        <Route path="/why" element={<Why />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/RegisterOwner" element={<RegisterOwner />} />
        <Route path="/OwnerLogin" element={<OwnerLogin />} />
        {loggedIn && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/givetestimonial" element={<GiveTestimonial />} />
            <Route path="/DetailedCart" element={<DetailedCart />} />
            <Route path="/paymentHistory" element={<PaymentHistory />} />
          </>
        )}
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
            <Route path="/admin/contact" element={<ContactMessages />} />
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
            <Route path="/admin/testimonial" element={<Testimonials />} />
            <Route path="/admin/req" element={<Requests />} />
          </>
        )}
        {ownerLoggedIn && (
          <>
            <Route path="/owner/home" element={<OwnerHome />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
            <Route path="/owner/users" element={<UsersOfOwners />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    )
  );
};

export default Urls;
