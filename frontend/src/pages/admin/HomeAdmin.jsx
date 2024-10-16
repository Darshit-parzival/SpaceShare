import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../middleware/AdminContext";
import { UserContext } from "../middleware/UserContext";
import { ParkingContext } from "../middleware/ParkingContext";
import axios from "axios";

const HomeAdmin = () => {
  const [totalContacts, setTotalContacts] = useState(0);

  const { admins } = useContext(AdminContext);
  const { users } = useContext(UserContext);
  const { owners } = useContext(ParkingContext);
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("http://localhost:5000/contact/fetch");
      setTotalContacts(response.data.length);
    };

    fetchContacts();
  }, []);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>
            <div className="row ">
              <div className="col-md-6 mb-4 ">
                <div
                  className="card bg-light"
                  style={{ height: "100%", borderColor: "black" }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                      <i className="mb-2 bi bi-person-circle"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1 fw-bold">
                        Total Admins:
                      </label>
                      <label>{admins.length}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div
                  className="card bg-light"
                  style={{ height: "5rem", borderColor: "black" }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                      <i className="mb-2 bi bi-people-fill"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1 fw-bold">
                        Total Users:
                      </label>
                      <label>{users.length}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div
                  className="card bg-light"
                  style={{ height: "5rem", borderColor: "black" }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                      Parking space giver
                      <i className="bi bi-person-check-fill"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1">Total:</label>
                      <label>{owners.length}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div
                  className="card bg-light"
                  style={{ height: "100%", borderColor: "black" }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                      contact
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1">
                        Total Contact Us:
                      </label>
                      <label>{totalContacts}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
