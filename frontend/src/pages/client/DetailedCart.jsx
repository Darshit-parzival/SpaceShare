import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import SideBar from "./components/SideBar";
import Button from "react-bootstrap/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ParkingContext } from "../middleware/ParkingContext";
import axios from "axios";
import { jsPDF } from "jspdf";
import { BookingContext } from "../middleware/BookingContext";

const DetailedCart = () => {
  const [showModal, setShowModal] = useState(false);
  const { fetchBookings } = useContext(BookingContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const { spaces, loading } = useContext(ParkingContext);
  const [searchParams] = useSearchParams();
  const [toastMessage, setToastMessage] = useState("");
  const spaceId = searchParams.get("id");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const parkingSpace = spaces.find((space) => space._id === spaceId);

  if (loading) {
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
              <div className="details-section shadow-sm p-5">
                <h2 className="mb-4 fw-bold text-center">
                  Parking Space Details
                </h2>
                <div className="container">
                  <h2 className="text-secondary">Loading...</h2>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  const generatePdf = (parkingSpace, startDate, endDate, totalPrice) => {
    const doc = new jsPDF();
    doc.text("Parking Booking Confirmation", 10, 10);
    doc.text(`Parking Space: ${parkingSpace.parkingName}`, 10, 20);
    doc.text(`Address: ${parkingSpace.parkingAddress}`, 10, 30);
    doc.text(`City: ${parkingSpace.parkingCity}`, 10, 40);
    doc.text(`State: ${parkingSpace.parkingState}`, 10, 50);
    doc.text(`Country: ${parkingSpace.parkingCountry}`, 10, 60);
    doc.text(`Pincode: ${parkingSpace.parkingPincode}`, 10, 70);
    doc.text(`Price per hour: ${parkingSpace.parkingPrice} ₹`, 10, 80);
    doc.text(`Start Date & Time: ${startDate}`, 10, 90);
    doc.text(`End Date & Time: ${endDate}`, 10, 100);
    doc.text(`Total Price: ${totalPrice} ₹`, 10, 110);

    // Save the generated PDF
    doc.save("Parking_Booking_Confirmation.pdf");
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const minEndDate = new Date(date.getTime() + 60 * 60 * 1000);
      setEndDate(minEndDate);
    }
    validateDates();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    validateDates();
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const validateDates = () => {
    if (
      startDate &&
      endDate &&
      endDate.getTime() - startDate.getTime() >= 60 * 60 * 1000
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleBookNow = async () => {
    const parkingPricePerHour = await parkingSpace.parkingPrice;
    if (isValid) {
      const durationInHours = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
      );
      const totalPrice = durationInHours * parkingPricePerHour;

      try {
        const response = await axios.post(
          "http://localhost:5000/bookParking/book",
          {
            userId: userId,
            parkingId: spaceId,
            startDate: startDate,
            endDate: endDate,
            duration: durationInHours,
            totalPrice: totalPrice,
            ownerId: parkingSpace.parkingOwner,
            isPaid: true,
          }
        );
        if (response.status === 200) {
          setToastMessage(response.data.message);
          setToast(true);
          fetchBookings();
          generatePdf(parkingSpace, startDate, endDate, totalPrice);
          navigate("/cart");
        } else if (response.status === 999) {
          setToastMessage(response.data.message);
          setToast(true);
        }
      } catch (error) {
        console.error("Error booking parking:", error);
        alert("Slots are full");
      }

      console.log("Booking Details:");
      console.log("Parking Space:", parkingSpace.parkingName);
      console.log("Start Date & Time:", startDate);
      console.log("End Date & Time:", endDate);
      console.log("Duration (hours):", durationInHours);
      console.log("Total Price:", totalPrice + " ₹");
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
            <div className="details-section shadow-sm p-5">
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
                  <div className="toast-body">{toastMessage}</div>
                  <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    onClick={() => setToast(false)}
                  ></button>
                </div>
              </div>
              <h2 className="mb-4 fw-bold text-center">
                Parking Space Details
              </h2>

              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center my-5">
                <div className="parking-image-wrapper mb-4 mb-md-0 me-md-5">
                  <img
                    src={parkingSpace.parkingPhoto}
                    alt="Parking Space"
                    className="parking-image rounded shadow"
                    style={{ width: "300px", height: "auto" }}
                  />
                </div>

                <div className="parking-details text-left">
                  <h3 className="fw-bold">{parkingSpace.parkingName}</h3>
                  <p className="text-muted mb-1">
                    <strong>Address:</strong> {parkingSpace.parkingAddress}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>City:</strong> {parkingSpace.parkingCity}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>State:</strong> {parkingSpace.parkingState}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>Country:</strong> {parkingSpace.parkingCountry}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>Pincode:</strong> {parkingSpace.parkingPincode}
                  </p>
                  <p className="text-muted mb-1">
                    <strong>Price:</strong> {parkingSpace.parkingPrice} ₹/hour
                  </p>

                  <Button variant="primary" onClick={handleShow}>
                    Set Date and Time
                  </Button>

                  <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Select Date & Time</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="mb-3">
                        <label>Start Date & Time:</label>
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          showTimeSelect
                          minDate={new Date()} // Prevents selecting a previous date
                          minTime={isToday(startDate) ? new Date() : null} // Restricts time selection to current time if today is selected
                          timeIntervals={60}
                          dateFormat="Pp"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label>
                          End Date & Time (at least 1 hour after start):
                        </label>
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          showTimeSelect
                          minDate={startDate} // Ensures end date cannot be before start date
                          timeIntervals={60}
                          minTime={
                            startDate
                              ? new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour after start date
                              : new Date()
                          }
                          maxTime={new Date().setHours(23, 59)} // Max time until 11:59 PM today
                          dateFormat="Pp"
                          className="form-control"
                        />
                      </div>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          validateDates();
                          handleClose();
                        }}
                        disabled={!startDate || !endDate}
                      >
                        Confirm
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {isValid && (
                    <Button
                      variant="success"
                      className="mt-4 px-5 py-2"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailedCart;
