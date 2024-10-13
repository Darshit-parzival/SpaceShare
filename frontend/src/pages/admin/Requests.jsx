import { useContext, useEffect, useState } from "react";
import { ParkingContext } from "../middleware/ParkingContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "../../LoadingScreen";
import axios from "axios";

const Requests = () => {
  const { owners, loading, fetchOwnersAndSpaces } = useContext(ParkingContext);
  const [toast, setToast] = useState(false);
  const [res, setRes] = useState({});

  const getMonthDifference = (startDate, endDate) => {
    return (
      endDate.getFullYear() * 12 +
      endDate.getMonth() -
      (startDate.getFullYear() * 12 + startDate.getMonth())
    );
  };

  const isWithinPlanPeriod = (registeredDate, planType) => {
    const currentDate = new Date();
    const registrationDate = new Date(registeredDate);

    const monthsDifference = getMonthDifference(registrationDate, currentDate);

    switch (planType) {
      case "basic":
        return monthsDifference <= 2;
      case "premium":
        return monthsDifference <= 4;
      case "standard":
        return monthsDifference <= 6;
      case "lifetime":
        return true;
      default:
        return false;
    }
  };

  // Filtering owners based on approved status and plan period
  const filteredOwners = owners
    .filter((owner) => !owner.approved)
    .filter((owner) => isWithinPlanPeriod(owner.registerDate, owner.planType));

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <LoadingScreen />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  const handleApprove = async (id, e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/parkingOwner/approval",
        {
          id: id,
          approved: true,
        }
      );
      console.log(response.data);
      setRes({ status: response.status });
      setToast(true); // Show toast
      fetchOwnersAndSpaces();
    } catch (error) {
      console.error("Error approving parking owner:", error);
      setRes({ status: 500 });
      setToast(true); // Show error toast
    }
  };

  const handleDeny = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/parkingOwner/approval",
        {
          id: id,
          approved: false,
        }
      );
      console.log(response.data);
      setRes({ status: response.status });
      setToast(true); // Show toast
      fetchOwnersAndSpaces();
    } catch (error) {
      console.error("Error denying parking owner:", error);
      setRes({ status: 500 });
      setToast(true); // Show error toast
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owners Requests</h1>
            </div>
            {/* Toast message */}
            <div
              className={`toast align-items-center text-white ${
                res.status === 200 ? "bg-success" : "bg-danger"
              } border-0 position-fixed bottom-0 end-0 m-3 ${
                toast ? "show" : "hide"
              }`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ minWidth: "300px" }}
            >
              <div className="d-flex">
                <div className="toast-body">
                  {res.status === 200
                    ? "Parking owner approved successfully. Approval email sent to owner."
                    : "Something went wrong. Please try again...!"}
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Close"
                  onClick={() => setToast(false)}
                ></button>
              </div>
            </div>
            {/* Card list */}
            <div className="d-flex flex-wrap justify-content-left">
              {filteredOwners.map((profileData, index) => (
                <div
                  className="card m-2"
                  style={{
                    width: "18rem",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                  key={index}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={profileData.ownerPhoto}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{profileData.ownerName}</h5>
                    <hr className="w-100" />
                    <p className="card-text">Email: {profileData.ownerEmail}</p>
                    <hr />
                    <p className="card-text">
                      Contact: {profileData.ownerContact}
                    </p>
                    <div className="profile-actions d-flex justify-content-center">
                      <button
                        className="btn btn-success mt-3 me-3"
                        onClick={(e) => handleApprove(profileData._id, e)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger mt-3 ms-3"
                        onClick={(e) => handleDeny(profileData._id, e)}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Requests;
