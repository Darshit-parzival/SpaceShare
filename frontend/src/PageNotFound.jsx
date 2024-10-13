import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-404 d-flex align-items-center justify-content-center vh-100 text-center">
      <div>
        <h1 className="display-1 fw-bold text-gradient">404</h1>
        <p className="fs-3 mb-4">
          <span className="text-danger">Uh-oh!</span> We can&apos;t find that page.
        </p>
        <p className="lead mb-4">
          The page you’re looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-lg btn-custom px-5 py-3">
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
