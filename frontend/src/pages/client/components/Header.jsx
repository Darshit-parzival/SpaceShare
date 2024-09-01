import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../middleware/AuthContext";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { loggedIn } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(sessionStorage.getItem("userName"));
  }, []);
  return (
    <>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span>Space Share</span>
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
                <li
                  className={`nav-item ${currentPath === "/" ? "active" : ""}`}
                >
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    currentPath === "/about" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    currentPath === "/price" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/price">
                    Pricing
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    currentPath === "/why" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/why">
                    Why Us
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    currentPath === "/testimonial" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/testimonial">
                    Testimonial
                  </Link>
                </li>
                {loggedIn === false && (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sign Up/Sign In
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/signin">
                          Sign In
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                {loggedIn === true && (
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userName}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
