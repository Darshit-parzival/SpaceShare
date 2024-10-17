import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BookingContext } from "../middleware/BookingContext";
import { ParkingContext } from "../middleware/ParkingContext";
import { UserContext } from "../middleware/UserContext";
import { useContext, useState } from "react";
import LoadingScreen from "../../LoadingScreen";
import Pagination from "./components/Pagination";

const ParkingSpaceReport = () => {
  const { bookings, loading } = useContext(BookingContext);
  const { owners, spaces } = useContext(ParkingContext); 
  const { users } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
// ashjdksa
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

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owner Reports</h1>
            </div>

            {currentItems.map((booking, index) => {
              const owner = owners.find((o) => o._id === booking.ownerId);
              const user = users.find((u) => u._id === booking.userId);

              const ownerSpaces = spaces.filter(
                (space) => space.parkingOwner === booking.ownerId
              );

              return (
                <div key={index} className="mb-4">
                  {owner && <h3>{owner.ownerName}</h3>}

                  {ownerSpaces.length > 0 ? (
                    ownerSpaces.map((space, idx) => (
                      <div key={idx} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{space.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {space.parkingCity}, {space.parkingState},{" "}
                            {space.parkingCountry}
                          </h6>

                          {/* Display User Info */}
                          <h6 className="card-subtitle mb-2 text-muted">
                            Users:
                          </h6>
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Parking Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user && (
                                <tr>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{`${new Date(
                                    booking.startDate
                                  ).toLocaleString()} - ${new Date(
                                    booking.endDate
                                  ).toLocaleString()}`}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No parking spaces available for this owner.</p>
                  )}
                </div>
              );
            })}

            {/* Pagination outside of the card */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingSpaceReport;
