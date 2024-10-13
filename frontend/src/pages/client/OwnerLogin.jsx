import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ParkingContext } from "../middleware/ParkingContext";

const OwnerLogin = () => {
  const { setOwnerName, setOwnerId } = useContext(ParkingContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const loginData = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          "http://localhost:5000/parkingOwner/login",
          loginData
        );

        if (response.status === 200) {
          sessionStorage.setItem("ownerName", response.data.ownerName);
          sessionStorage.setItem("ownerId", response.data.ownerId);
          setOwnerName(response.data.ownerName);
          setOwnerId(response.data.ownerId);
          navigate("/owner/home");
        } else {
          setToast(true);
        }
      } catch (error) {
        console.error(error);
        setToast(true);
      }
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <>
      <div className="sub_page">
        <div className="hero_area">
          <div className="bg-box">
            <img src={NavBg} alt="Background" />
          </div>
          <Header />
        </div>
        <div className="form_container">
          <h1 className="form_heading">Owner Sign In</h1>
          <form className="form-sig" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div className="mt-3 d-flex ">
              <Link
                className="form-label me-3 text-primary text-decoration-underline"
                to="/signup"
              >
                Didn&apos;t have an account?
              </Link>
              <Link
                className="form-label text-danger text-decoration-underline"
                to="/forgot"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>

      {/* Toast for invalid credentials */}
      <div
        className={`toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3 ${
          toast ? "show" : "hide"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ minWidth: "300px" }}
      >
        <div className="d-flex">
          <div className="toast-body">
            Invalid Credential. Please try again...!
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={() => setToast(false)}
          ></button>
        </div>
      </div>
    </>
  );
};

export default OwnerLogin;
