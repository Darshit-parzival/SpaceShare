import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import SideBar from "./components/SideBar";
import { Link } from "react-router-dom";
import { ParkingContext } from "../middleware/ParkingContext";
import { useContext } from "react";

const Cart = () => {
  const { spaces = [] } = useContext(ParkingContext);
  const cart = JSON.parse(sessionStorage.getItem("bookedSpaces") || "[]");
  const products = Array.isArray(cart) ? cart : [];

  const bookedSpaces = products.map((spaceId) =>
    spaces.find((space) => space._id === spaceId)
  );

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
                <h2 className="mb-4 fw-bold">Your Cart</h2>

                <div className="d-flex flex-wrap justify-content-left">
                  {bookedSpaces.filter(Boolean).map((space) => (
                    <Link
                      to={`/DetailedCart?id=${space?._id}`}
                      className="card m-2"
                      key={space?._id}
                      style={{
                        width: "18rem",
                        transition: "transform 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <img
                        src={
                          space?.parkingPhoto || "/path/to/default-image.jpg"
                        }
                        className="card-img-top"
                        alt="Owner's photo"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Parking Name:{" "}
                          {space?.parkingName || "Unknown Parking"}
                        </h5>
                      </div>
                    </Link>
                  ))}
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

export default Cart;
