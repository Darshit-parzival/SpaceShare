import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from "axios";

const ParkingOwnerAdd = () => {
  const [toast, setToast] = useState(false);
  const [res, setRes] = useState({});
  const [owner, setOwner] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    photo: null,
    parkingSpaces: [],
  });

  const [newParkingSpace, setNewParkingSpace] = useState({
    photo: null,
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleOwnerPhotoChange = (e) => {
    const file = e.target.files[0];
    setOwner((prevOwner) => ({
      ...prevOwner,
      photo: file,
    }));
  };

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
  };

  const handleParkingSpaceChange = (e) => {
    const { name, value } = e.target;
    setNewParkingSpace({ ...newParkingSpace, [name]: value });
  };

  const handleImageUpload = (e) => {
    setNewParkingSpace({ ...newParkingSpace, photo: e.target.files[0] });
  };

  const addParkingSpace = () => {
    const formData = new FormData();
    formData.append("photo", newParkingSpace.photo);
    formData.append("name", newParkingSpace.name);
    formData.append("address", newParkingSpace.address);
    formData.append("city", newParkingSpace.city);
    formData.append("state", newParkingSpace.state);
    formData.append("country", newParkingSpace.country);
    formData.append("pincode", newParkingSpace.pincode);

    if (editIndex !== null) {
      const updatedParkingSpaces = owner.parkingSpaces.map((space, index) =>
        index === editIndex ? newParkingSpace : space
      );
      setOwner((prev) => ({ ...prev, parkingSpaces: updatedParkingSpaces }));
      setEditIndex(null);
    } else {
      setOwner((prev) => ({
        ...prev,
        parkingSpaces: [...prev.parkingSpaces, newParkingSpace],
      }));
    }

    setNewParkingSpace({
      photo: null,
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  const handleEditParkingSpace = (index) => {
    setNewParkingSpace(owner.parkingSpaces[index]);
    setEditIndex(index);
  };

  const handleRemoveParkingSpace = (index) => {
    const updatedParkingSpaces = owner.parkingSpaces.filter(
      (_, i) => i !== index
    );
    setOwner((prev) => ({ ...prev, parkingSpaces: updatedParkingSpaces }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", owner.name);
      formData.append("age", owner.age);
      formData.append("contact", owner.contact);
      formData.append("email", owner.email);
      if (owner.photo) {
        formData.append("ownerPhoto", owner.photo);
      }

      const response = await axios.post(
        "http://localhost:5000/parkingOwner/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setRes({ status: response.status, data: response.data });
        const ownerId = response.data.ownerId;

        // Loop through the parkingSpaces array instead of newParkingSpace
        for (const space of owner.parkingSpaces) {
          const parkingFormData = new FormData();
          parkingFormData.append("parkingOwner", ownerId);
          parkingFormData.append("parkingPhoto", space.photo);
          parkingFormData.append("parkingName", space.name);
          parkingFormData.append("parkingAddress", space.address);
          parkingFormData.append("parkingCity", space.city);
          parkingFormData.append("parkingState", space.state);
          parkingFormData.append("parkingCountry", space.country);
          parkingFormData.append("parkingPincode", space.pincode);

          const parkingSpaceResponse = await axios.post(
            "http://localhost:5000/parkingSpace/add",
            parkingFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (parkingSpaceResponse.status === 201) {
            setRes({
              status: parkingSpaceResponse.status,
              data: parkingSpaceResponse.data,
            });
            setToast(true);
          } else {
            console.error(
              "Error adding parking space:",
              parkingSpaceResponse.data
            );
          }
        }

        setOwner({
          name: "",
          photo: null,
          age: "",
          contact: "",
          email: "",
          parkingSpaces: [],
        });
      } else {
        setRes({ status: response.status, data: response.data });
        setToast(true);
      }
    } catch (error) {
      console.error(error);
      setRes({ status: 500, message: "Internal Server Error" });
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
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Add Parking Space Owner</h1>
            </div>

            <div
              className={`toast align-items-center text-white ${
                res.status === 201 ? "bg-success" : "bg-danger"
              } border-0 position-fixed bottom-0 end-0 m-3 ${
                toast ? "show" : "hide"
              }`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              style={{ minWidth: "300px" }}
            >
              <div className="d-flex">
                <div className="toast-body">
                  {res.status === 201
                    ? "Parking Owner Created Successfully!"
                    : "Something went wrong. Please try again...! "}
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Close"
                  onClick={() => setToast(false)}
                ></button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={owner.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ageInput" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="ageInput"
                  name="age"
                  value={owner.age}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactInput" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactInput"
                  name="contact"
                  value={owner.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="email"
                  value={owner.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ownerPhotoInput" className="form-label">
                  Owner Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="ownerPhotoInput"
                  name="ownerPhoto"
                  accept="image/*"
                  onChange={handleOwnerPhotoChange}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#parkingSpaceModal"
              >
                Add Parking Space
              </button>
              <hr />
              {/* Conditionally render the heading if there are parking spaces */}
              {owner.parkingSpaces.length > 0 && <h4>Parking Spaces</h4>}

              <div className="row">
                {owner.parkingSpaces.map((space, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-3">
                    <div className="p-3 border rounded w-100">
                      <h5>Parking Space {index + 1}</h5>
                      <p>
                        <strong>Name:</strong> {space.name}
                      </p>
                      <p>
                        <strong>Address:</strong> {space.address}
                      </p>
                      <p>
                        <strong>City:</strong> {space.city}
                      </p>
                      <p>
                        <strong>State:</strong> {space.state}
                      </p>
                      <p>
                        <strong>Country:</strong> {space.country}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {space.pincode}
                      </p>
                      {space.photo && (
                        <img
                          src={URL.createObjectURL(space.photo)}
                          alt={`Parking space at ${space.address}`}
                          className="img-fluid mb-2 rounded small-img"
                        />
                      )}
                      <hr />
                      <button
                        type="button" // Set to button type
                        className="btn btn-warning me-2"
                        onClick={() => handleEditParkingSpace(index)}
                        data-bs-toggle="modal"
                        data-bs-target="#parkingSpaceModal"
                      >
                        Edit
                      </button>
                      <button
                        type="button" // Set to button type
                        className="btn btn-danger"
                        onClick={() => handleRemoveParkingSpace(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-success mb-4">
                Submit
              </button>
            </form>

            {/* Modal for Adding/Editing Parking Space */}
            <div
              className="modal fade"
              id="parkingSpaceModal"
              tabIndex="-1"
              aria-labelledby="parkingSpaceModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="parkingSpaceModalLabel">
                      {editIndex !== null
                        ? "Edit Parking Space"
                        : "Add Parking Space"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="photoInput" className="form-label">
                        Upload Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="photoInput"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nameInput" className="form-label">
                        Parking Space Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        name="name"
                        value={newParkingSpace.name}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="addressInput" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addressInput"
                        name="address"
                        value={newParkingSpace.address}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cityInput" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cityInput"
                        name="city"
                        value={newParkingSpace.city}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="stateInput" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="stateInput"
                        name="state"
                        value={newParkingSpace.state}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="countryInput" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="countryInput"
                        name="country"
                        value={newParkingSpace.country}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pincodeInput" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincodeInput"
                        name="pincode"
                        value={newParkingSpace.pincode}
                        onChange={handleParkingSpaceChange}
                      />
                    </div>
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
                      onClick={addParkingSpace}
                      data-bs-dismiss="modal"
                    >
                      {editIndex !== null
                        ? "Update Parking Space"
                        : "Add Parking Space"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ParkingOwnerAdd;
