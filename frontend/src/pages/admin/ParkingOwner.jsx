import { Link } from "react-router-dom";
import { useContext } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ParkingContext } from "../middleware/ParkingContext";
import LoadingScreen from "../../LoadingScreen";

const ParkingOwner = () => {
  const { owners, loading, fetchOwnersAndSpaces } = useContext(ParkingContext);

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

  const filteredOwners = owners
    .filter((owner) => owner.approved)
    .filter((owner) => isWithinPlanPeriod(owner.registerDate, owner.planType));

  if (loading) {
    fetchOwnersAndSpaces();
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

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owners</h1>
              <Link
                type="button"
                className="btn btn-primary"
                to="/admin/parkingOwnerAdd"
              >
                Add Parking Owner
              </Link>
            </div>
            <div className="d-flex flex-wrap justify-content-left">
              {filteredOwners.map((profileData) => (
                <Link
                  to={`/admin/parkingOwnerProfile?id=${profileData._id}`}
                  className="card m-2"
                  style={{
                    width: "18rem",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                  key={profileData._id}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={profileData.ownerPhoto || "/default-owner-photo.jpg"}
                    className="card-img-top"
                    alt={`${profileData.ownerName}'s photo`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{profileData.ownerName}</h5>
                    <hr className="w-100" />
                    <p className="card-text">
                      Plan Type: {profileData.planType}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingOwner;
