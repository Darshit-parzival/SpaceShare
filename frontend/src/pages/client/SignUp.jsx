import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(false);
  const [response, setResponse] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const registerData = {
        name,
        email,
        password,
        confirmPassword,
      };
  
      const response = await axios.post(
        "http://localhost:5000/user/register",
        registerData
      );
  
      if (response.status === 201) {
        // User created successfully, navigate to the sign-in page
        setResponse({ message: response.data.message });
        setToast(true);
        navigate("/signin");
      } else {
        // Handle case when registration fails (e.g., email exists)
        setResponse({ message: response.data.message });
        setToast(true);
      }
    } catch (error) {
      // Handle errors from the server
      if (error.response) {
        // If the error is from the server and has a response
        setResponse({ message: error.response.data.message || "Registration failed." });
      } else {
        // Handle network errors or other errors
        setResponse({ message: "An error occurred. Please try again." });
      }
      setToast(true);
    }
  };
  
  const navigate = useNavigate();
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
          <h1 className="form_heading">Sign Up</h1>
          <form className="form-sig" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
              />
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
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputConfirmPassword"
                className="form-label"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputConfirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <div className="mt-3">
              <Link
                className="form-label text-primary text-decoration-underline"
                to="/signin"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
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
            {response.data ? response.data.message : "Error Signing Up"}
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

export default SignUp;
