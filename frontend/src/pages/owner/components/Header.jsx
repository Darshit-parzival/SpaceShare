import axios from "axios";
import { Link } from "react-router-dom";
import { ParkingContext } from "../../middleware/ParkingContext";
import { useContext } from "react";

const Header = () => {
  const { setOwnerName, setOwnerId } = useContext(ParkingContext);
  const ownerName = sessionStorage.getItem("ownerName");
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/ParkingOwner/logout"
      );
      if (response.status === 200) {
        sessionStorage.removeItem("ownerName");
        sessionStorage.removeItem("ownerId");
        setOwnerName("");
        setOwnerId("");
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
        Space Share - Parking Owner Admin Panel
      </Link>

      <div className="dropdown ">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {ownerName}
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
