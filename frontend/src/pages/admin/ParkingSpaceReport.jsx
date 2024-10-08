import { Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const ParkingSpaceReport = () => {
  // Sample data
  const parkingOwners = [
    {
      name: "Anon",
      parkingSpaces: [
        {
          name: "Main Parking",
          location: { city: "New York", state: "NY", country: "USA" },
          users: [
            {
              name: "John Doe",
              email: "john@example.com",
              contact: "123-456-7890",
              parkingTime: "2024-10-01 10:00 AM",
            },
            {
              name: "Jane Smith",
              email: "jane@example.com",
              contact: "987-654-3210",
              parkingTime: "2024-10-01 10:30 AM",
            },
          ],
        },
        {
          name: "Secondary Parking",
          location: { city: "New York", state: "NY", country: "USA" },
          users: [
            {
              name: "Mark Johnson",
              email: "mark@example.com",
              contact: "456-789-0123",
              parkingTime: "2024-10-01 11:00 AM",
            },
          ],
        },
      ],
    },
    {
      name: "Doe",
      parkingSpaces: [
        {
          name: "Main Parking",
          location: { city: "New York", state: "NY", country: "USA" },
          users: [
            {
              name: "John Doe",
              email: "john@example.com",
              contact: "123-456-7890",
              parkingTime: "2024-10-01 10:00 AM",
            },
            {
              name: "Jane Smith",
              email: "jane@example.com",
              contact: "987-654-3210",
              parkingTime: "2024-10-01 10:30 AM",
            },
          ],
        },
        {
          name: "Secondary Parking",
          location: { city: "New York", state: "NY", country: "USA" },
          users: [
            {
              name: "Mark Johnson",
              email: "mark@example.com",
              contact: "456-789-0123",
              parkingTime: "2024-10-01 11:00 AM",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owner Reports</h1>
              <Link className="btn btn-primary" to="/admin/parkingSpaceGraph">
                Graphical View
              </Link>
            </div>
            {parkingOwners.map((owner, index) => (
              <div key={index} className="mb-4">
                <h3>{owner.name}</h3>
                {owner.parkingSpaces.map((space, idx) => (
                  <div key={idx} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{space.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {space.location.city}, {space.location.state},{" "}
                        {space.location.country}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">Users:</h6>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Parking Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {space.users.map((user, userIdx) => (
                            <tr key={userIdx}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.contact}</td>
                              <td>{user.parkingTime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingSpaceReport;
