import axios from "axios";
import { useState } from "react";

const Footer = () => {
  const [toast, setToast] = useState(false);
  const [res, setRes] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/contact/add",
        formData
      );
      setRes(response.status);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setRes(500);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <>
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
            {res === 201
              ? "Your message has been sent successfully!"
              : "Something went wrong!"}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={() => setToast(false)}
          ></button>
        </div>
      </div>

      <section className="info_section">
        <div className="container">
          <div className="info_top">
            <div className="row">
              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_form">
                  <h4>Stay Connected</h4>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Your Email"
                      value={formData.email.toLowerCase()}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="message"
                      className="mb-1"
                      placeholder="Enter Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                  </form>
                  <div className="social_box">
                    <a href="">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_detail">
                  <h4>About Us</h4>
                  <p>
                    We connect people looking for parking and storage solutions
                    with those who have space to share, making city living more
                    convenient and efficient. Our platform ensures a secure,
                    easy, and reliable way to rent out or find spaces whenever
                    you need them.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_detail">
                  <h4>Online Booking</h4>
                  <p>
                    Our streamlined booking process ensures you can find,
                    select, and book a space in just a few clicks. User-friendly
                    navigation and clear instructions make it easy to rent a
                    space, saving you time and effort.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 info_col">
                <h4>Contact us</h4>
                <p>
                  &quot;Reach out to us anytime for assistance, inquiries, or
                  feedback—we&apos;re here to help!&quot;
                </p>
                <div className="contact_nav">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span>Location</span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>Call : +91 9876543210</span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>Email : demo@email.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer_section">
        <div className="container">
          <p>
            &copy; <span id="displayYear"></span> Created by Jay Purani & Janvi
            Suthar
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
