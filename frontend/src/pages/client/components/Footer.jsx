const Footer = () => {
  return (
    <>
    <section className="info_section ">
        <div className="container">
          <div className="info_top ">
            <div className="row ">
              <div className="col-md-6 col-lg-3 info_col">
                <div className="info_form">
                  <h4>Stay Connected</h4>
                  <form action="">
                    <input type="text" placeholder="Enter Your Email" />
                    <button type="submit">Subscribe</button>
                  </form>
                  <div className="social_box">
                    <a href="">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 info_col ">
                <div className="info_detail">
                  <h4>About Us</h4>
                  <p>
                  we connect people looking for parking and storage solutions with those who have space to share, making city living more convenient and efficient. Our platform ensures a secure, easy, and reliable way to rent out or find spaces whenever you need them.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 info_col ">
                <div className="info_detail">
                  <h4>Online Booking</h4>
                  <p>
                  Our streamlined booking process ensures you can find, select, and book a space in just a few clicks. User-friendly navigation and clear instructions make it easy to rent a space, saving you time and effort.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 info_col">
                <h4>Contact us</h4>
                <p>"Reach out to us anytime for assistance, inquiries, or feedback—we're here to help!"</p>
                <div className="contact_nav">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span>Location</span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>Call : +91 9876543210</span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>Email : demo@email.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer_section">
    <div className="container">
      <p>
        &copy; <span id="displayYear"></span> Created by Jay Purani, Janvi Suthar, Tanvi Vara
      </p>
    </div>
  </footer>
    </>
  )
}

export default Footer