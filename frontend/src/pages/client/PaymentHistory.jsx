import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import SideBar from "./components/SideBar";
import { ParkingContext } from "../middleware/ParkingContext";
import { useContext, useState } from "react";
import { BookingContext } from "../middleware/BookingContext";
import { Modal, Button } from "react-bootstrap";

const PaymentHistory = () => {
  const { spaces = [] } = useContext(ParkingContext);
  const { bookings, fetchBookings } = useContext(BookingContext);
  const cart = JSON.parse(sessionStorage.getItem("bookedSpaces") || "[]");
  const products = Array.isArray(cart) ? cart : [];

  const paidSpaceIds = new Set(
    bookings
      .filter((booking) => booking.isPaid)
      .map((booking) => booking.parkingId)
  );

  const bookedSpaces = products
    .map((spaceId) => spaces.find((space) => space._id === spaceId))
    .filter((space) => space && paidSpaceIds.has(space._id));

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (space) => {
    setSelectedSpace(space);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSpace(null);
  };

  const handleCancelBooking = async (spaceId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/bookParking/delete`,
        {
          data: { parkingId: spaceId },
        }
      );

      if (response.status === 200) {
        fetchBookings();
        console.log(`Booking for space ID ${spaceId} canceled successfully.`);
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

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
                <h2 className="mb-4 fw-bold">Your Payment History</h2>

                <div className="d-flex flex-wrap justify-content-left">
                  {bookedSpaces.map((space) => (
                    <div
                      className="card m-2"
                      key={space._id}
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
                        src={space.parkingPhoto || "/path/to/default-image.jpg"}
                        className="card-img-top"
                        alt="Parking space"
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          Parking Name: {space.parkingName || "Unknown Parking"}
                        </h5>
                        {/* Add buttons for cancel and show details */}
                        <div className="d-flex justify-content-between mt-3">
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => handleCancelBooking(space._id)}
                          >
                            Cancel Booking
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleShowDetails(space)}
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal for showing details */}
      {selectedSpace && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Parking Space Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Parking Name: {selectedSpace.parkingName}</h5>
            <p>City: {selectedSpace.parkingCity}</p>
            <p>Address: {selectedSpace.parkingAddress}</p>
            <p>Pincode: {selectedSpace.parkingPincode}</p>
            <p>Price: {selectedSpace.parkingPrice}</p>
            <p>State: {selectedSpace.parkingState}</p>
            <img
              src={selectedSpace.parkingPhoto || "/path/to/default-image.jpg"}
              alt="Parking space"
              style={{ width: "100%" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentHistory;
