import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBg from "./img/slider-bg.jpg";
import AboutImg from "./img/about-img.jpg";

const About = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="" />
        </div>
        <Header />
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
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage to be sure there isn&apos;t anything the middle of
                  text.
                </p>
                <p>
                  Molestiae odio earum non qui cumque provident voluptates,
                  repellendus exercitationem, possimus at iste corrupti officiis
                  unde alias eius ducimus reiciendis soluta eveniet. Nobis ullam
                  ab omnis quasi expedita.
                </p>
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
