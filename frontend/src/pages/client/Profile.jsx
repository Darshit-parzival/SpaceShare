import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";

const Profile = ({ name, email }) => {
  return (
    <div className="sub_page">
      {/* Background and Header */}
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="Background" />
        </div>
        <Header />
      </div>

      {/* Main Content Section */}
      <div className="container-fluid py-5">
        <div className="row">
          {/* Sidebar */}
          <aside className="col-md-3">
            <div className="bg-light p-4 shadow-sm h-100">
              <h4 className="text-center">Menu</h4>
              <ul className="list-group">
                <li className="list-group-item">Cart</li>
                <li className="list-group-item">Testimonials</li>
                <li className="list-group-item">Feedback</li>
              </ul>
            </div>
          </aside>

          {/* Profile Content */}
          <main className="col-md-9">
            <div className="card shadow-sm p-4">
              <div className="card-body">
                {/* Greeting */}
                <h2 className="mb-4">Welcome, {name}!</h2>
                
                {/* Profile Info */}
                <div className="mb-3">
                  <h5 className="fw-bold">Profile Information</h5>
                  <p><strong>Name: </strong>{name}</p>
                  <p><strong>Email: </strong>{email}</p>
                </div>

                {/* Add more sections for future content */}
                <div className="mt-5">
                  <h5 className="fw-bold">More Information Coming Soon...</h5>
                  <p>
                    Stay tuned for exciting updates, personalized content, and much more!
                  </p>
                </div>
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
