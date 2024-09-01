import { Link } from "react-router-dom";
// import '../assets/css/dashboard.css'
// import '../assets/css/dashboard.rtl.css'

const Header = () => {
  return (
    
    <header
      className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
      data-bs-theme="dark"
    >
      <Link
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
        to="/admin/home"
      >
        Space Share - Admin Panel
      </Link>

      <div className="dropdown ">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Username
        </button>
        <ul className="dropdown-menu drpadmin" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link className="dropdown-item drpitem" to="/admin/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
