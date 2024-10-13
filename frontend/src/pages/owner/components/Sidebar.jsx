import { Link, useLocation } from "react-router-dom";

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
                  currentPath === "/owner/home" ? "active" : ""
                }`}
                aria-current="page"
                to="/owner/home"
              >
                <i className="bi bi-house-fill mb-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${
                  currentPath === "/owner/profile" ? "active" : ""
                }`}
                to="/owner/profile"
              >
                <i className="bi bi-person-circle"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/admin/users"
              >
                <i className="bi bi-people-fill mb-1"></i>
                Parking Space Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/admin/parkingSpaceReport"
              >
                <i className="bi bi-file-earmark-bar-graph-fill"></i>
                Parking Space Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/admin/req"
              >
                <i className="bi bi-file-earmark-arrow-down-fill"></i>
                feedbacks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
