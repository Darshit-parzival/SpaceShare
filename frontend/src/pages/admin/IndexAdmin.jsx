import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IndexAdmin = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
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
        "http://localhost:5000/admin/login",
        loginData
      );

      if (response.status === 200) {
        sessionStorage.setItem("adminName", response.data);
        navigate("/admin/home");
        window.location.reload();
      } else {
        setToast(true);
      }
    } catch (error) {
      console.error(error);
      setToast(true);
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
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="text-center mb-3">Admin Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="mt-3">
            <Link
              className="form-label text-primary text-decoration-underline"
              htmlFor="exampleCheck1"
              to="/admin/forget"
            >
              Forget Password?
            </Link>
          </div>
        </form>
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

export default IndexAdmin;
