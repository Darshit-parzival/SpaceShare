import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span>Paspark</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className={`nav-item ${currentPath === '/' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className={`nav-item ${currentPath === '/about' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className={`nav-item ${currentPath === '/price' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/price">
                    Pricing
                  </Link>
                </li>
                <li className={`nav-item ${currentPath === '/why' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/why">
                    Why Us
                  </Link>
                </li>
                <li className={`nav-item ${currentPath === '/testimonial' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/testimonial">
                    Testimonial
                  </Link>
                </li>
              </ul>
              <form className="form-inline">
                <button
                  className="btn  my-2 my-sm-0 nav_search-btn"
                  type="submit"
                >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
