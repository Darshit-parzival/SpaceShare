import { Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const ParkingOwnerProfile = () => {
  // Sample data (replace with actual data)
  const owner = {
    name: "John Doe",
    age: 35,
    contact: "123-456-7890",
    email: "johndoe@example.com",
    totalParkingSpaces: 3,
    parkingSpaces: [
      {
        name: "Parking Space 1",
        address: "123 Main St, City, Country",
        city: "Ahmedabad",
        country: "India",
        state: "Gujarat",
        pincode: "362001",
        photo: "https://via.placeholder.com/150",
      },
      {
        name: "Parking Space 2",
        address: "123 Main St, City, Country",
        city: "Ahmedabad",
        country: "India",
        state: "Gujarat",
        pincode: "362001",
        photo: "https://via.placeholder.com/150",
      },
      {
        name: "Parking Space 3",
        address: "123 Main St, City, Country",
        city: "Ahmedabad",
        country: "India",
        state: "Gujarat",
        pincode: "362001",
        photo: "https://via.placeholder.com/150",
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Parking Space Owner Profile</h1>
            </div>
            <div className="profile-card shadow-sm p-4 mb-4 rounded">
              <div className="profile-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="profile-picture me-3"
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <div className="profile-info">
                    <h2>{owner.name}</h2>
                    <p>Age: {owner.age}</p>
                    <p>Contact: {owner.contact}</p>
                    <p>Email: {owner.email}</p>
                    <p>Total Parking Spaces: {owner.totalParkingSpaces}</p>
                  </div>
                </div>
                <div className="profile-actions d-flex flex-column align-items-end">
                  <button className="btn btn-warning mb-2">Edit</button>
                  <button className="btn btn-danger mb-2">Delete</button>
                  <Link className="btn btn-success" to='/admin/parkingSpaceReport'>Reports</Link>
                </div>
              </div>
              <h3 className="mt-4 mb-4">Parking Spaces</h3>
              <div className="row">
                {owner.parkingSpaces.map((space, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="parking-space-item card p-3">
                      <h4>Name: {space.name}</h4>
                      <img
                        src={space.photo}
                        alt={`Parking space at ${space.address}`}
                        className="parking-space-photo img-fluid mb-3"
                      />
                      <p className="card-text">
                        Address: {space.address} <hr />
                        City: {space.city} <hr />
                        State: {space.state} <hr />
                        Country: {space.country} <hr />
                        Pin Code: {space.pincode}
                      </p>
                      <div className="profile-actions d-flex justify-content-center">
                        <button className="btn btn-warning mt-3 me-3">
                          Edit
                        </button>
                        <button className="btn btn-danger mt-3 ms-3">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingOwnerProfile;
