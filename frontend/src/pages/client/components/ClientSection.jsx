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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim
                  </p>
                </div>
                <div className="client_id">
                  <div className="img-box">
                    <img src={c1} alt="" className="img-1" />
                  </div>
                  <div className="name">
                    <h6>Lisa Adams</h6>
                    <p>Magna</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="box">
                <div className="detail-box">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim
                  </p>
                </div>
                <div className="client_id">
                  <div className="img-box">
                    <img src={c2} alt="" className="img-1" />
                  </div>
                  <div className="name">
                    <h6>Michel Trout</h6>
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
