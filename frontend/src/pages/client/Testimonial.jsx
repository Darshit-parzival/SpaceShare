import ClientSection from "./components/ClientSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBg from "./img/slider-bg.jpg";

const Testimonial = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <div className="bg-box">
          <img src={NavBg} alt="" />
        </div>
        <Header />
      </div>
        <ClientSection />
        <Footer />
    </div>
  );
};

export default Testimonial;
