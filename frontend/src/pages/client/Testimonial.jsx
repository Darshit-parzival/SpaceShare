import ClientSection from "./components/ClientSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";

const Testimonial = () => {
  return (
    <div className="sub_page">
  <div className="hero_area">
    <div className="bg-box">
      <img src={NavBg} alt="" />
    </div>
    <Header />
  </div>
  <ClientSection />
  <section className="testimonial-form py-5">
    <div className="container">
      <h2 className="text-center mb-4">We&apos;d Love to Hear From You!</h2>
      <p className="text-center mb-5">
        Your feedback is valuable to us. Please take a moment to share your experience and help us improve. Leave a testimonial below!
      </p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="testimony" className="form-label">Your Testimonial</label>
              <textarea
                className="form-control"
                id="testimony"
                rows="4"
                placeholder="Share your experience"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit Testimonial
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</div>

  );
};

export default Testimonial;
