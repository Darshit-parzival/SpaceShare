import axios from "axios";
import { Link } from "react-router-dom";
import { AdminContext } from "../../middleware/AdminContext";
import { useContext } from "react";

const Header = () => {
  const { setAdminName } = useContext(AdminContext);
  const adminName = sessionStorage.getItem("adminName");
  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/admin/logout");
      if (response.status === 200) {
        sessionStorage.removeItem("adminName");
        setAdminName("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
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
          {adminName}
        </button>
        <ul
          className="dropdown-menu drpadmin"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <button className="dropdown-item drpitem" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
