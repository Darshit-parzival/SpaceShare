import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/client/Index";
import About from "./pages/client/About";
import Price from "./pages/client/Price";
import { useEffect, useContext } from "react";
// import { useState, useEffect, useContext } from "react";
// import LoadingScreen from "./LoadingScreen";
import Why from "./pages/client/Why";
import Testimonial from "./pages/client/Testimonial";
import SignIn from "./pages/client/SignIn";
import SignUp from "./pages/client/SignUp";
// import Test from "./pages/client/Test";
import { AuthContext } from "./pages/middleware/AuthContext";
import IndexAdmin from "./pages/admin/IndexAdmin";
import ForgotAdmin from "./pages/admin/ForgotAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import Admins from "./pages/admin/Admins";

const Urls = () => {
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     setLoading(true);
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 300);

  //     return () => clearTimeout(timer);
  //   };

  //   handleRouteChange();
  // }, [location]);

  useEffect(() => {
    if (
      loggedIn &&
      (location.pathname === "/signin" || location.pathname === "/signup")
    ) {
      navigate("/");
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    // <>
    //   {loading ? (
    //     <LoadingScreen />
    //   ) : (
    //     <Routes>
    //       <Route path="/" element={<Index />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/price" element={<Price />} />
    //       <Route path="/why" element={<Why />} />
    //       <Route path="/testimonial" element={<Testimonial />} />
    //       {loggedIn === false && (
    //         <>
    //           <Route path="/signin" element={<SignIn />} />
    //           <Route path="/signup" element={<SignUp />} />
    //           <Route path="/forgot" element={<SignIn />} />
    //         </>
    //       )}

    //       <Route path="/test" element={<Test />} />
    //     </Routes>
    //   )}
    // </>
    <>
      <Routes>
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
        <Route path="/admin/forget" element={<ForgotAdmin />} />
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/admin/admins" element={<Admins />} />
      </Routes>
    </>
  );
};

export default Urls;
