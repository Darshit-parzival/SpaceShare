import { useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/user/login",
        loginData
      );

      if (response.status === 200) {
        sessionStorage.setItem("userName", response.data);
        window.location.reload();
        navigate("/");
      } else alert(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="Background" />
        </div>
        <Header />
      </div>
      <div className="form_container">
        <h1 className="form_heading">Sign In</h1>
        <form className="form-sig" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mt-3 d-flex ">
            <Link className="form-label me-3 text-primary text-decoration-underline" to="/signup">
              Didn&apos;t have an account?
            </Link>
            <Link className="form-label text-danger text-decoration-underline" to="/forgot">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
