import { Link, useLocation } from "react-router-dom";
// import '../assets/css/dashboard.css'
// import '../assets/css/dashboard.rtl.css'

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Space Share
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${
                  currentPath === "/admin/home" ? "active" : ""
                }`}
                aria-current="page"
                to="/admin/home"
              >
                <i className="bi bi-house-fill mb-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${
                  currentPath === "/admin/admins" ? "active" : ""
                }`}
                to="/admin/admins"
              >
                <i className="bi bi-person-circle"></i>
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#cart" />
                </svg>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#people" />
                </svg>
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#graph-up" />
                </svg>
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#puzzle" />
                </svg>
                Integrations
              </a>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Saved reports</span>
            <a
              className="link-secondary"
              href="#"
              aria-label="Add a new report"
            >
              <svg className="bi">
                <use xlinkHref="#plus-circle" />
              </svg>
            </a>
          </h6>
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#file-earmark-text" />
                </svg>
                Current month
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#file-earmark-text" />
                </svg>
                Last quarter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#file-earmark-text" />
                </svg>
                Social engagement
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#file-earmark-text" />
                </svg>
                Year-end sale
              </a>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#gear-wide-connected" />
                </svg>
                Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi">
                  <use xlinkHref="#door-closed" />
                </svg>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
