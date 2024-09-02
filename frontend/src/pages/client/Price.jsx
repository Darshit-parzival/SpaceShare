import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";

const Price = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="" />
        </div>
        <Header />
      </div>
      <section className="pricing_section bg-box layout_padding">
        <div className="container ">
          <div className="heading_container heading_center">
            <h2>Our Pricing</h2>
          </div>
          <div className="col-xl-10 px-0 mx-auto">
            <div className="row">
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className="box">
                  <h4 className="price">100₹</h4>
                  <h5 className="name">Basic</h5>
                  <p>
                  Get access to our basic parking plan, which includes a reserved parking spot
                  for up to 2 hours at any of our participating locations. Enjoy hassle-free
                  parking with easy booking, real-time availability updates, and secure payments.
                  Ideal for quick errands or short visits to the city.
                  </p>
                  <a href="">
                    Read More{" "}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className="box box-center">
                  <h4 className="price">300₹</h4>
                  <h5 className="name">Premium</h5>
                  <p>
                  Upgrade to our Premium plan and enjoy exclusive benefits such as extended parking
                  durations, priority access to high-demand spots, and free cancellations. Perfect
                  for business trips or long city visits, this plan ensures a convenient and stress-free
                  parking experience with added security and round-the-clock support.
                  </p>
                  <a href="">
                    Read More{" "}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className="box">
                  <h4 className="price">500₹</h4>
                  <h5 className="name">Standard</h5>
                  <p>
                  Opt for our Standard plan for enhanced security and extended parking durations of up to 10 days. 
                  This plan is ideal for longer stays, offering secure parking with 24/7 surveillance, easy access, 
                  and flexible booking options. Enjoy peace of mind with high security for your vehicle and the convenience 
                  of parking for your extended needs
                  </p>
                  <a href="">
                    Read More{" "}
                    <i
                      className="fa fa-long-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Price;