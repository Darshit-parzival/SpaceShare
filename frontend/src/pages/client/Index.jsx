import Header from "./components/Header";
import sliderBg from "./img/slider-bg.jpg";
import AboutImg from "./img/about-img.jpg";
import w1 from "./img/w1.png";
import w2 from "./img/w2.png";
import w3 from "./img/w3.png";
import Footer from "./components/Footer";
import ClientSection from "./components/ClientSection";
import { useContext, useEffect, useState } from "react";
import { ParkingContext } from "../middleware/ParkingContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { owners, spaces } = useContext(ParkingContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  const handleSearchChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const matchedSpaces = spaces.filter(
      (space) =>
        space.parkingCity.toLowerCase().includes(searchCity.toLowerCase())
      
    );

    const spacesWithOwners = matchedSpaces.map((space) => {
      const owner = owners.find((owner) => owner._id == space.parkingOwner);
      return {
        ...space,
        owner: owner ? owner.ownerName : "Owner not found",
      };
    });

    setFilteredSpaces(spacesWithOwners);
  };

  const handleBook = (id) => {
    if (
      !sessionStorage.getItem("userName") &&
      !sessionStorage.getItem("userId")
    ) {
      alert("Please Log in first...");
      navigate("/signin");
    } else {
      let bookedSpaces =
        JSON.parse(sessionStorage.getItem("bookedSpaces")) || [];

      if (!bookedSpaces.includes(id)) {
        bookedSpaces.push(id);
      }

      sessionStorage.setItem("bookedSpaces", JSON.stringify(bookedSpaces));

      setToast(true);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <>
      <div className="hero_area">
        <div className="bg-box">
          <img src={sliderBg} alt="Space Share" />
        </div>
        <Header />
        <section className="slider_section">
          <div className="container">
            <div className="detail-box col-md-9 mx-auto px-0">
              <h1>Finding Parking Lots Made Easy</h1>
              <p>
                Unlock the potential of every corner – seamlessly connecting
                those with space to share and those in need, making city living
                more convenient and efficient for everyone.
              </p>
            </div>
            <div className="find_form_container">
              <form onSubmit={handleSearch}>
                <div className="form-row d-flex">
                  <div className="col-md-4 px-0"></div>
                  <div className="col-md-4 px-0">
                    <div className="form-group">
                      <label>Enter City Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Eg. Ahmedabad"
                          value={searchCity}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <button type="submit">
                    <span>Search Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {filteredSpaces.length > 0 ? (
        <section className="parking_results py-5">
          <div className="container">
            <h2 className="mb-4 text-center">
              Available Parking Spaces in {searchCity}
            </h2>
            <div className="row">
              {filteredSpaces.map((space) => (
                <div key={space._id} className="col-md-4 mb-4">
                  <div className="card shadow-sm h-100">
                    <img
                      src={space.parkingPhoto || "default-parking.jpg"}
                      className="card-img-top"
                      alt={space.parkingName}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{space.parkingName}</h5>
                      <p className="card-text">
                        <strong>Location:</strong> {space.parkingCity}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> {space.parkingPrice} ₹
                      </p>
                      <p className="card-text">
                        <strong>Owner:</strong> {space.owner}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBook(space._id)}
                      >
                        Book Now
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#detailModal"
                        onClick={() => setSelectedSpace(space)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        searchCity && (
          <p className="text-center mt-4">
            No parking spaces found in {searchCity}
          </p>
        )
      )}

      {/* About Us Section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>About Us</h2>
            <p>
              We connect people looking for parking and storage solutions with
              those who have space to share, making city living more convenient
              and efficient. Our platform ensures a secure, easy, and reliable
              way to rent out or find spaces whenever you need them.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="img-box">
                <img src={AboutImg} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="detail-box">
                <h3>We Are Here For Help</h3>
                <p>
                  We are here to help you find the perfect parking or storage
                  solution with ease and convenience. Whether you need a spot to
                  park your vehicle for a few hours or a secure space to store
                  your belongings temporarily, our platform connects you with
                  trusted space providers in your area. Our user-friendly search
                  tools and verified listings ensure that you can quickly find
                  and book the space that meets your needs without any hassle.
                </p>
                <p>
                  At <b>SpaceShare</b>, customer satisfaction is our top
                  priority. Our dedicated support team is always available to
                  assist you with any questions or concerns, providing guidance
                  every step of the way. We strive to make the process of
                  finding and renting parking or storage spaces as seamless as
                  possible, giving you peace of mind and more time to focus on
                  what matters most. Let us help you simplify your space needs
                  today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why_section layout_padding-bottom">
        <div className="container">
          <div className="col-md-10 px-0">
            <div className="heading_container">
              <h2>Why Choose Us</h2>
              <p>
                Choose us for a seamless and secure experience in finding
                parking and storage solutions tailored to your needs. With
                verified listings, real-time availability, and dedicated
                customer support, we make it easy to find and rent spaces with
                confidence.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src={w1} alt="" />
                </div>
                <div className="detail-box">
                  <h4>No Booking Fees for Customers</h4>
                  <p>
                    Enjoy a cost-effective experience with no hidden charges or
                    booking fees. Our platform allows you to rent parking and
                    storage spaces without any extra costs, ensuring
                    transparency and affordability.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src={w2} alt="" />
                </div>
                <div className="detail-box">
                  <h4>Online Payments</h4>
                  <p>
                    Secure and convenient online payment options make
                    transactions smooth and hassle-free. With multiple payment
                    methods supported, you can book your space confidently from
                    anywhere, anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src={w3} alt="" />
                </div>
                <div className="detail-box">
                  <h4>Simple Booking Process</h4>
                  <p>
                    Our streamlined booking process ensures you can find,
                    select, and book a space in just a few clicks. User-friendly
                    navigation and clear instructions make it easy to rent a
                    space, saving you time and effort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientSection />

      <Footer />

      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {selectedSpace ? selectedSpace.parkingName : "Modal title"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedSpace ? (
                <>
                  <img
                    src={selectedSpace.parkingPhoto || "default-parking.jpg"}
                    alt={selectedSpace.parkingName}
                    className="img-fluid mb-3"
                  />
                  <p>
                    <strong>Location:</strong> {selectedSpace.parkingCity}
                  </p>
                  <p>
                    <strong>Price:</strong> {selectedSpace.parkingPrice} ₹
                  </p>
                  <p>
                    <strong>Owner:</strong> {selectedSpace.owner}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedSpace.parkingAddress}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedSpace.parkingCity}
                  </p>
                  <p>
                    <strong>State:</strong> {selectedSpace.parkingState}
                  </p>
                  <p>
                    <strong>Country:</strong> {selectedSpace.parkingCountry}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {selectedSpace.parkingPincode}
                  </p>
                </>
              ) : (
                "Loading..."
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => handleBook(selectedSpace._id)}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Book Now
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3 ${
          toast ? "show" : "hide"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ minWidth: "300px" }}
      >
        <div className="d-flex">
          <div className="toast-body">Your spot added to cart</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={() => setToast(false)}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Index;
