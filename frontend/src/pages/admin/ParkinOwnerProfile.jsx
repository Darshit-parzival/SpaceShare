import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { ParkingContext } from "../middleware/ParkingContext";
import LoadingScreen from "../../LoadingScreen";

const ParkingOwnerProfile = () => {
  const navigate = useNavigate();
  const { owners, spaces, loading, fetchOwnersAndSpaces } =
    useContext(ParkingContext);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [searchParams] = useSearchParams();
  const ownerId = searchParams.get("id");

  const parkingOwner = owners.find((owner) => owner._id === ownerId);
  const parkingSpaces = spaces.filter(
    (space) => space.parkingOwner === ownerId
  );

  const [newParkingOwner, setNewParkingOwner] = useState({
    photo: null,
    name: "",
    age: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    if (parkingOwner) {
      setNewParkingOwner({
        photo: null,
        name: parkingOwner.ownerName || "",
        age: parkingOwner.ownerAge || "",
        contact: parkingOwner.ownerContact || "",
        email: parkingOwner.ownerEmail || "",
      });
    }
  }, [parkingOwner]);

  const handleParkingOwnerChange = (e) => {
    const { name, value } = e.target;
    setNewParkingOwner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOwnerImageUpload = (e) => {
    const file = e.target.files[0];
    setNewParkingOwner((prevState) => ({
      ...prevState,
      photo: file,
    }));
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("id", parkingOwner._id);
    formData.append("name", newParkingOwner.name);
    formData.append("age", newParkingOwner.age);
    formData.append("email", newParkingOwner.email);
    formData.append("contact", newParkingOwner.contact);

    if (newParkingOwner.photo) {
      formData.append("ownerPhoto", newParkingOwner.photo);
    }

    try {
      const response = await fetch("http://localhost:5000/parkingOwner/edit", {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setToast({ show: true, message: result.message, type: "success" });
        fetchOwnersAndSpaces();
      } else {
        setToast({
          show: true,
          message: "Failed to update parking owner.",
          type: "danger",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Error occurred while updating parking owner.",
        type: "danger",
      });
      console.error("Error updating parking owner:", error);
    } finally {
      const modalElement = document.getElementById("editOwnerModal");
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.setAttribute("style", "display: none;");

      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";

      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };

  const handleDeleteOwner = async () => {
    try {
      const response = await fetch(`http://localhost:5000/parkingOwner/delete/${ownerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setToast({ show: true, message: result.message, type: "success" });
        fetchOwnersAndSpaces();
        navigate("/admin/parkingOwner");
      } else {
        setToast({
          show: true,
          message: "Failed to delete parking owner.",
          type: "danger",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Error occurred while deleting parking owner.",
        type: "danger",
      });
      console.error("Error deleting parking owner:", error);
    } finally {
      const modalElement = document.getElementById("deleteOwnerModal");
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.setAttribute("style", "display: none;");

      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";

      const modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (loading) {
      fetchOwnersAndSpaces();
    }
  }, [loading, fetchOwnersAndSpaces]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <LoadingScreen />
            </main>
          </div>
        </div>
      </>
    );
  }

  if (!parkingOwner) {
    return <div>Owner not found</div>;
  }

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

            {toast.show && (
              <div
                className={`toast align-items-center text-white bg-${toast.type} border-0 position-fixed bottom-0 end-0 m-3 show`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ minWidth: "300px" }}
              >
                <div className="d-flex">
                  <div className="toast-body">{toast.message}</div>
                  <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    onClick={() =>
                      setToast({ show: false, message: "", type: "" })
                    }
                  ></button>
                </div>
              </div>
            )}

            <div className="profile-card shadow-sm p-4 mb-4 rounded">
              <div className="profile-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      parkingOwner.ownerPhoto ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="profile-picture me-3"
                    style={{
                      borderRadius: "50%",
                      width: "150px",
                      height: "150px",
                    }}
                  />
                  <div className="profile-info">
                    <h2>{parkingOwner.ownerName}</h2>
                    <p>Age: {parkingOwner.ownerAge}</p>
                    <p>Contact: {parkingOwner.ownerContact}</p>
                    <p>Email: {parkingOwner.ownerEmail}</p>
                    <p>Total Parking Spaces: {parkingSpaces.length}</p>
                  </div>
                </div>
                <div className="profile-actions d-flex flex-column align-items-end">
                  <button
                    className="btn btn-warning mb-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editOwnerModal"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mb-2"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteOwnerModal"
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-success"
                    to="/admin/parkingSpaceReport"
                  >
                    Reports
                  </Link>
                </div>
              </div>

              <h3 className="mt-4 mb-4">Parking Spaces</h3>
              <div className="row">
                {parkingSpaces.length > 0 ? (
                  parkingSpaces.map((space, index) => (
                    <div key={index} className="col-md-4 mb-3">
                      <div className="parking-space-item card p-3">
                        <h4>Name: {space.parkingName}</h4>
                        <img
                          src={
                            space.parkingPhoto ||
                            "https://via.placeholder.com/150"
                          }
                          alt={`Parking space at ${space.parkingAddress}`}
                          className="parking-space-photo img-fluid mb-3"
                        />
                        <div className="card-text">
                          <p>Address: {space.parkingAddress}</p>
                          <p>City: {space.parkingCity}</p>
                          <p>State: {space.parkingState}</p>
                          <p>Country: {space.parkingCountry}</p>
                          <p>Pin Code: {space.parkingPincode}</p>
                        </div>

                        <div className="profile-actions d-flex justify-content-center">
                          <button className="btn btn-warning mt-3 me-3" data-bs-toggle="modal" data-bs-target="editSpaceModal">
                            Edit
                          </button>
                          <button className="btn btn-danger mt-3 ms-3" data-bs-toggle="modal" data-bs-target="deleteSpaceModal">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No parking spaces found for this owner.</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal for editing parking owner */}
      <div
        className="modal fade"
        id="editOwnerModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Parking Owner
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newParkingOwner.name}
                    onChange={handleParkingOwnerChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={newParkingOwner.email}
                    onChange={handleParkingOwnerChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="text"
                    className="form-control"
                    name="age"
                    value={newParkingOwner.age}
                    onChange={handleParkingOwnerChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={newParkingOwner.contact}
                    onChange={handleParkingOwnerChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photo"
                    onChange={handleOwnerImageUpload}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="deleteOwnerModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete Parking Owner
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Parking Owner: <b>{parkingOwner.ownerName}</b>
              </p>
              <p>
                Parking Email: <b>{parkingOwner.ownerEmail}</b>
              </p>
              <p className="text-danger">
                Are you sure you want to delete this parking owner?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteOwner}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParkingOwnerProfile;
