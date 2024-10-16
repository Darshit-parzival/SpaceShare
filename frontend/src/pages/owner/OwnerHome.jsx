import { useContext } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BookingContext } from "../middleware/BookingContext";
import { ParkingContext } from "../middleware/ParkingContext";

const OwnerHome = () => {
  const { bookings } = useContext(BookingContext);
  const { spaces } = useContext(ParkingContext);
  const ownerId = sessionStorage.getItem("ownerId");

  // Filter bookings by ownerId
  const ownerBookings = bookings.filter(
    (booking) => booking.ownerId === ownerId
  );

  const ownerSpaces = spaces.filter((space) => space.parkingOwner === ownerId);

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
            <div className="row">
              <div className="col-md-6 mb-4">
                <div
                  className="card bg-light"
                  style={{ height: "100%", borderColor: "black" }}
                >
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div>
                      <i className="mb-2 bi bi-people-fill"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1 fw-bold">
                        Total Users:
                      </label>
                      <label>{ownerBookings.length}</label>
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
                        Total Spaces:
                      </label>
                      <label>{ownerSpaces.length}</label>
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
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div className="ms-2">
                      <label className="text-muted me-1 fw-bold">
                        Total Feedbacks:
                      </label>
                      <label>{/* Placeholder for total contacts */}</label>
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

export default OwnerHome;
