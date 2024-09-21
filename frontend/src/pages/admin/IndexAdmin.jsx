import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IndexAdmin = () => {
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
        "http://localhost:5000/admin/login",
        loginData
      );

      if (response.status === 200) {
        sessionStorage.setItem("adminName", response.data);
        window.location.reload();
        navigate("/admin/home");
      } else alert(response.status);
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
        <div className="mt-3">
          <Link
            className="form-label text-primary text-decoration-underline"
            htmlFor="exampleCheck1"
            to='/admin/forget'
          >
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default IndexAdmin;
