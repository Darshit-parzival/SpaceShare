import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import c1 from "../img/c1.jpg";
import c2 from "../img/c2.jpg";

const ClientSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="client_section layout_padding">
      <div className="container">
        <div className="heading_container col">
          <h2>
            What Says Our <span>Client</span>
          </h2>
        </div>
        <div className="client_container">
          <Slider {...settings}>
            <div>
              <div className="box">
                <div className="detail-box">
                  <p>
                  "I've been using this platform for a few months now, and it's been a game-changer. The booking process is incredibly easy, and the availability of parking spaces in prime locations is fantastic. I especially appreciate the transparent pricing with no hidden fees, which makes budgeting simple and straightforward. Highly recommend it to anyone looking for a hassle-free parking experience."
                  </p>
                </div>
                <div className="client_id">
                  <div className="img-box">
                    <img src={c1} alt="" className="img-1" />
                  </div>
                  <div className="name">
                    <h6>Hinata Hyuga</h6>
                    <p>Magna</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="box">
                <div className="detail-box">
                  <p>
                  "This service has made finding storage space so convenient! The online payment options are secure, and I love that I can manage everything from my phone. The customer support team is responsive and genuinely helpful, making the whole process smooth and stress-free. It's clear that they prioritize customer satisfaction, and it shows in every interaction."
                  </p>
                </div>
                <div className="client_id">
                  <div className="img-box">
                    <img src={c2} alt="" className="img-1" />
                  </div>
                  <div className="name">
                    <h6>Sasuke Uchiha</h6>
                    <p>Magna</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more slides if needed */}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
