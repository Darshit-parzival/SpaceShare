/* eslint-disable react/no-unescaped-entities */
import Header from "./components/Header";
import sliderBg from "./img/slider-bg.jpg";
import AboutImg from "./img/about-img.jpg";
import w1 from "./img/w1.png";
import w2 from "./img/w2.png";
import w3 from "./img/w3.png";
import PricingBg from "./img/pricing-bg.jpg";

import Footer from "./components/Footer";
import ClientSection from "./components/ClientSection";

const Index = () => {
  return (
    <>
      <div className="hero_area">
        <div className="bg-box">
          <img src={sliderBg} alt="Space Share" />
        </div>
        <Header />
        <section className="slider_section ">
          <div className="container">
            <div className="detail-box col-md-9 mx-auto px-0">
              <h1>Finding Parking Lots Made Easy</h1>
              <p>
              Unlock the potential of every corner – seamlessly connecting those with space to share and those in need, making city living more convenient and efficient for everyone.
              </p>
            </div>
            <div className="find_form_container">
              <form action="#">
                <div className="form-row d-flex">
                  <div className="col-md-4 px-0">
                    <div className="form-group">
                      <label>Select Parking</label>
                      <div className="input-group">
                        <select className="form-control">
                          <option data-display="Highway Park">
                          Residential Driveways
                          </option>
                          <option value="1">Commercial Parking Lots</option>
                          <option value="2">Apartment Complex</option>
                          <option value="3">Public Parking</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 px-0">
                    <div className="form-group ">
                      <label>Your Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Naruto Uzumaki"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 px-0">
                    <div className="form-group">
                      <label>Your Mobile Number</label>
                      <div className="input-group ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="91 9876543210"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-box">
                  <button type="submit" className="">
                    <span>Search Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <section className="about_section layout_padding">
        <div className="container  ">
          <div className="heading_container ">
            <h2>About Us</h2>
            <p>
            we connect people looking for parking and storage solutions with those who have space to share, making city living more convenient and efficient. Our platform ensures a secure, easy, and reliable way to rent out or find spaces whenever you need them.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6 ">
              <div className="img-box">
                <img src={AboutImg} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="detail-box">
                <h3>We Are Here For Help</h3>
                <p>
                We are here to help you find the perfect parking or storage solution with ease and convenience. Whether you need a spot to park your vehicle for a few hours or a secure space to store your belongings temporarily, our platform connects you with trusted space providers in your area. Our user-friendly search tools and verified listings ensure that you can quickly find and book the space that meets your needs without any hassle.
                </p>
                <p>
                At <b>SpaceShare</b>, customer satisfaction is our top priority. Our dedicated support team is always available to assist you with any questions or concerns, providing guidance every step of the way. We strive to make the process of finding and renting parking or storage spaces as seamless as possible, giving you peace of mind and more time to focus on what matters most. Let us help you simplify your space needs today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="why_section layout_padding-bottom">
        <div className="container">
          <div className="col-md-10 px-0">
            <div className="heading_container">
              <h2>Why Choose Us</h2>
              <p>
              Choose us for a seamless and secure experience in finding parking and storage solutions tailored to your needs. With verified listings, real-time availability, and dedicated customer support, we make it easy to find and rent spaces with confidence.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src={w1} alt="" />
                </div>
                <div className="detail-box">
                  <h4>No Booking Fees for Customers</h4>
                  <p>
                  Enjoy a cost-effective experience with no hidden charges or booking fees. Our platform allows you to rent parking and storage spaces without any extra costs, ensuring transparency and affordability.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box">
                <div className="img-box">
                  <img src={w2} alt="" />
                </div>
                <div className="detail-box">
                  <h4>Online Payments</h4>
                  <p>
                  Secure and convenient online payment options make transactions smooth and hassle-free. With multiple payment methods supported, you can book your space confidently from anywhere, anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="box ">
                <div className="img-box">
                  <img src={w3} alt="" />
                </div>
                <div className="detail-box">
                  <h4>Simple Booking Process</h4>
                  <p>
                  Our streamlined booking process ensures you can find, select, and book a space in just a few clicks. User-friendly navigation and clear instructions make it easy to rent a space, saving you time and effort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing_section layout_padding">
        <div className="bg-box">
          <img src={PricingBg} alt="" />
        </div>
        <div className="container">
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
                  of parking for your extended needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClientSection />
      <Footer />
    </>
  );
};

export default Index;
