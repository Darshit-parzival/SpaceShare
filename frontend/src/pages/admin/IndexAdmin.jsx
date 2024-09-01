import { Link } from "react-router-dom";

const IndexAdmin = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <h1 className="text-center mb-3">Admin Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
