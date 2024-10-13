import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const RegisterOwner = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const [toast, setToast] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!photo) {
      errors.photo = "Photo is required";
    } else if (!["image/jpeg", "image/png"].includes(photo.type)) {
      errors.photo = "Only JPEG or PNG formats are allowed";
    }

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (/[^a-zA-Z\s]/.test(name)) {
      errors.name = "Name must contain only letters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!contact.trim()) {
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(contact)) {
      errors.contact = "Contact number must be 10 digits";
    }

    if (!age.trim()) {
      errors.age = "Age is required";
    } else if (isNaN(age) || age < 18 || age > 100) {
      errors.age = "Age must be a number between 18 and 100";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const ownerData = new FormData();
      ownerData.append("ownerPhoto", photo);
      ownerData.append("name", name);
      ownerData.append("email", email);
      ownerData.append("contact", contact);
      ownerData.append("age", age);
      ownerData.append("approved", false);
      ownerData.append("planType", plan);

      // Log the FormData values
      console.log("name:", ownerData.get("ownerPhoto"));
      console.log("email:", ownerData.get("email"));
      console.log("contact:", ownerData.get("contact"));
      console.log("age:", ownerData.get("age"));
      console.log("planType:", ownerData.get("planType"));

      try {
        const response = await axios.post(
          "http://localhost:5000/parkingOwner/add",
          ownerData
        );

        if (response.status === 201) {
          setToast(true);
          setPhoto(null);
          setName("");
          setEmail("");
          setContact("");
          setAge("");
        }
      } catch (error) {
        console.error("Error registering owner:", error);
      }
    }
  };

  return (
    <>
      <div className="sub_page">
        <div className="hero_area">
          <div className="bg-box">
            <img src={NavBg} alt="Background" />
          </div>
          <Header />
        </div>
        <div className="form_container">
          <h1 className="form_heading">Become a Parking Owner</h1>
          <form className="form-sig" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                type="file"
                className={`form-control ${errors.photo ? "is-invalid" : ""}`}
                id="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {errors.photo && (
                <div className="invalid-feedback">{errors.photo}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                value={email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                id="contact"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
              />
              {errors.contact && (
                <div className="invalid-feedback">{errors.contact}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                id="age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
              {errors.age && (
                <div className="invalid-feedback">{errors.age}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </div>

      {/* Toast for success */}
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
          <div className="toast-body">
            Owner registered successfully! Your Request approval will be
            notified via Email
          </div>
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

export default RegisterOwner;
