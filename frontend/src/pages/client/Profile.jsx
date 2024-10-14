import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import SideBar from "./components/SideBar";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../middleware/UserContext";

const Profile = () => {
  const { users } = useContext(UserContext); // Access users directly from context
  const userId = sessionStorage.getItem("userId");

  const [user, setUser] = useState(null);

  const filterUser = () => {
    const filteredUser = users.find((user) => user._id === userId); // Find user in the users array
    setUser(filteredUser);
  };

  useEffect(() => {
    filterUser();
  }, [users]); // Run filterUser when users change

  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="Background" />
        </div>
        <Header />
      </div>

      <div className="container-fluid py-5">
        <div className="row">
          <SideBar />

          <main className="col-md-9">
            <div className="card shadow-sm p-4">
              <div className="card-body">
                {user ? (
                  <>
                    <h2 className="mb-4">Welcome, <b>{user.name}!</b></h2>

                    <div className="mb-3">
                      <h5 className="fw-bold">Profile Information</h5>
                      <p>
                        <strong>Name: </strong>
                        {user.name}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        {user.email}
                      </p>
                      <p>
                        <strong>Total Parking Space use: </strong>
                        {user.email}
                      </p>
                      <p>
                        <strong>Total Given Testimonials: </strong>
                        {user.email}
                      </p>
                      <p>
                        <strong>Total Given Feedbacks: </strong>
                        {user.email}
                      </p>
                    </div>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
