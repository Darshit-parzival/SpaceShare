import { Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const ParkingOwner = () => {
  
  const profiles = [
    {
      ownerName: "John Doe",
      totalSpaces: 5,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Jane Smith",
      totalSpaces: 3,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Michael Johnson",
      totalSpaces: 4,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Emily Davis",
      totalSpaces: 6,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "William Brown",
      totalSpaces: 2,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Olivia Wilson",
      totalSpaces: 8,
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Olivia Wilson",
      totalSpaces: 8,
      profile: "https://via.placeholder.com/150",
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
              <h1 className="h2">Parking Space Owners</h1>
              <Link
                type="button"
                className="btn btn-primary"
                to='/admin/parkingOwnerAdd'
              >
                Add Parking Owner
              </Link>
            </div>
            <div className="d-flex flex-wrap justify-content-left">
              {profiles.map((profileData, index) => (
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
                    src={profileData.profile}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{profileData.ownerName}</h5>
                    <hr className="w-100" />
                    <p className="card-text">
                      Total Spaces: {profileData.totalSpaces}
                    </p>
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

export default ParkingOwner;
