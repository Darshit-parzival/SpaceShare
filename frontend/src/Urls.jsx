import { Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/client/Index";
import About from "./pages/client/About";
import Price from "./pages/client/Price";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const Urls = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1);

      return () => clearTimeout(timer);
    };

    handleRouteChange();
  }, [location]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/price" element={<Price />} />
        </Routes>
      )}
    </>
  );
};

export default Urls;
