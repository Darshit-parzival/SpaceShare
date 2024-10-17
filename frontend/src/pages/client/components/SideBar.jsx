import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="col-md-3">
      <div className="bg-light p-4 shadow-sm h-100">
        <h4 className="text-center">Menu</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <NavLink
              to="/profile"
              className="text-decoration-none nav-link-item"
              activeclassname="active"
            >
              Profile
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/cart"
              className="text-decoration-none nav-link-item"
              activeclassname="active"
            >
              Cart
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/givetestimonial"
              className="text-decoration-none nav-link-item"
              activeclassname="active"
            >
              Testimonials
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink
              to="/paymentHistory"
              className="text-decoration-none nav-link-item"
              activeclassname="active"
            >
              Payment History
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
