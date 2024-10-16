import { useState, useContext } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NavBg from "./img/slider-bg.jpg";
import { TestimonialContext } from "../middleware/TestimonialContext";

const GiveTestimonial = () => {
  const { testimonials, addTestimonial, deleteTestimonial } =
    useContext(TestimonialContext);
  const [testimonialText, setTestimonialText] = useState("");

  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testimonialText.trim()) {
      addTestimonial(testimonialText, userId, userName);
      setTestimonialText("");

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
                <h2 className="mb-4 fw-bold">Give your testimonial</h2>

                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                  <textarea
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    placeholder="Write your testimonial here..."
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      marginTop: "10px",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
                </form>

                <h3 className="mb-4">Your Testimonials</h3>
                {testimonials.length > 0 ? (
                  testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="testimonial-item"
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #eee",
                        borderRadius: "5px",
                      }}
                    >
                      <p>{testimonial.testimonial}</p>
                      <button
                        onClick={() => deleteTestimonial(testimonial._id)}
                        style={{
                          marginTop: "5px",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No testimonials yet. Be the first to give yours!</p>
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

export default GiveTestimonial;
