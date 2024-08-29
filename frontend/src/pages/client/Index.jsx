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
                Necessitatibus non ducimus hic dolor? Maiores itaque vitae sit
                blanditiis porro, a expedita ex. Totam vel sed obcaecati.
                Placeat maxime asperiores deleniti tenetur officiis laboriosam
                laborum a nihil quisquam quis!
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
                            Highway Park
                          </option>
                          <option value="1">Highway Park</option>
                          <option value="2">Highway Park</option>
                          <option value="3">Highway Park</option>
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
                          placeholder="John doe"
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
                          placeholder="01 2345678910"
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
              Magni quod blanditiis non minus sed aut voluptatum illum quisquam
              aspernatur ullam vel beatae rerum ipsum voluptatibus
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
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage to
                  be sure there isn't anything the middle of text.
                </p>
                <p>
                  Molestiae odio earum non qui cumque provident voluptates,
                  repellendus exercitationem, possimus at iste corrupti officiis
                  unde alias eius ducimus reiciendis soluta eveniet. Nobis ullam
                  ab omnis quasi expedita.
                </p>
                <a to="about" className="text-decoration-none">
                  Read More
                </a>
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
                Eaque nostrum quis ad aliquam autem odio assumenda accusamus,
                consequuntur, iste voluptate voluptates quia non dicta hic
                repellendus similique a facere earum omnis? Repellendus nemo,
                aspernatur ullam est deserunt officiis.
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
                  <h4>No Booking Fees</h4>
                  <p>
                    Voluptatem earum eveniet mollitia sit animi dolorum. Iste,
                    quas? Omnis error culpa illo nihil consequatur consectetur
                    tenetur harum modi, quae libero ducimus reiciendis voluptat
                    excepturi. Cum ducimus nesciunt dicta tenetur ducimus
                    perferendis.
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
                    Voluptatem earum eveniet mollitia sit animi dolorum. Iste,
                    quas? Omnis error culpa illo nihil consequatur consectetur
                    tenetur harum modi, quae libero ducimus reiciendis voluptat
                    excepturi. Cum ducimus nesciunt dicta tenetur ducimus
                    perferendis.
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
                    Voluptatem earum eveniet mollitia sit animi dolorum. Iste,
                    quas? Omnis error culpa illo nihil consequatur consectetur
                    tenetur harum modi, quae libero ducimus reiciendis voluptat
                    excepturi. Cum ducimus nesciunt dicta tenetur ducimus
                    perferendis.
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
                  <h4 className="price">$10</h4>
                  <h5 className="name">Basic</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className="box box-center">
                  <h4 className="price">$30</h4>
                  <h5 className="name">Premium</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className="box">
                  <h4 className="price">$20</h4>
                  <h5 className="name">Standard</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
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
