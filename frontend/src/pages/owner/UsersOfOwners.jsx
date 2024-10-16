import { useContext, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { UserContext } from "../middleware/UserContext";
import { BookingContext } from "../middleware/BookingContext";
import LoadingScreen from "../../LoadingScreen";
import Pagination from "./components/Pagination";

const UsersOfOwners = () => {
  const { users, loading } = useContext(UserContext);
  const { bookings } = useContext(BookingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const bookedUsers = users.filter((user) => 
    bookings.some((booking) => booking.userId.toString() === user._id.toString())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookedUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              <h1 className="h2">Booked Users</h1>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => (
                    <tr key={user._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UsersOfOwners;
