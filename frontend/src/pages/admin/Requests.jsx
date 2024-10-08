import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Requests = () => {
  const profiles = [
    {
      ownerName: "John Doe",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Jane Smith",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Michael Johnson",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Emily Davis",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "William Brown",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Olivia Wilson",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
      profile: "https://via.placeholder.com/150",
    },
    {
      ownerName: "Olivia Wilson",
      ownerEmail: "jond@gami.com",
      ownerContact: "123-456-7890",
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
              <h1 className="h2">Parking Space Owners Requests</h1>
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
                      Email: {profileData.ownerEmail}
                      <hr />
                      Contact: {profileData.ownerContact}
                    </p>
                    <div className="profile-actions d-flex justify-content-center">
                      <button className="btn btn-success mt-3 me-3">
                        Approve
                      </button>
                      <button className="btn btn-danger mt-3 ms-3">
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
