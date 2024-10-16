import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { TestimonialContext } from "../../middleware/TestimonialContext";

const ClientSection = () => {
  const { testimonials } = useContext(TestimonialContext);

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
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <div className="box">
                  <div className="detail-box">
                    <p className="ms-5">{testimonial.testimonial}</p>
                  </div>
                  <div className="client_id">
                    <div className="name">
                      <h6>{testimonial.userName}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
