import { Link } from "react-router-dom";
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
      <section className="pricing_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="text-black">Our Pricing for Become an Owner</h2>
          </div>
          <div className="pricing_grid">
            <div className="pricing_plan basic_plan">
              <h4 className="price">100₹</h4>
              <h5 className="name">Basic</h5>
              <p className="description">
                Get access to our basic parking owner subscription, valid for 2
                months.
              </p>
              <Link to="/RegisterOwner?plan=basic" className="btn btn-primary">
                Purchase{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="pricing_plan premium_plan">
              <h4 className="price">300₹</h4>
              <h5 className="name">Premium</h5>
              <p className="description">
                Get access to our basic parking owner subscription, valid for 4
                months.
              </p>
              <Link to="/RegisterOwner?plan=premium" className="btn btn-primary">
                Purchase{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="pricing_plan standard_plan">
              <h4 className="price">500₹</h4>
              <h5 className="name">Standard</h5>
              <p className="description">
                Get access to our basic parking owner subscription, valid for 6
                months.
              </p>
              <Link to="/RegisterOwner?plan=standard" className="btn btn-primary">
                Purchase{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Price;
