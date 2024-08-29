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
                  <h4 className="price">10$</h4>
                  <h5 className="name">Basic</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
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
                  <h4 className="price">30$</h4>
                  <h5 className="name">Premium</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
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
                  <h4 className="price">20$</h4>
                  <h5 className="name">Standard</h5>
                  <p>
                    Consequuntur iure, quam vero quidem minima obcaecati veniam,
                    praesentium impedit quod repudiandae tempora amet deserunt
                    rerum accusamus. Commodi qui, illum ad ipsa porro ipsum
                    nostrum magni minus.
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
