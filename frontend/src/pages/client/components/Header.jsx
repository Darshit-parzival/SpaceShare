import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../middleware/UserContext";
import axios from "axios";

const Header = () => {
  const { userName, setUserName } = useContext(UserContext);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);

    const sessionUserName = sessionStorage.getItem("userName");
    if (sessionUserName && !userName) {
      setUserName(sessionUserName);
    }
  }, [location, userName, setUserName]);

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/logout");
      if (response.status === 200) {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        setUserName("");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
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
                {userName === "" && (
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

                {userName !== "" && (
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
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
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
