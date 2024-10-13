import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";
import w1 from "./img/w1.png";
import w2 from "./img/w2.png";
import w3 from "./img/w3.png";

const Profile = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="" />
        </div>
        <Header />
      </div>
      <section className="why_section layout_padding">
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
      <Footer />
    </div>
  );
};

export default Profile;
