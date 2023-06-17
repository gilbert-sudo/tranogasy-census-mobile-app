import OwlCarousel from "react-owl-carousel";

const options = {
  items: 1,
  nav: true,
  dots: false,
  autoplay: true,
  loop: true,
};

const HomeSlider = () => {
  return (
    <OwlCarousel className="slide-one-item home-slider owl-theme" {...options}>
      <div
        className="site-blocks-cover overlay"
        style={{
          backgroundImage:
          "url(https://ik.imagekit.io/ryxb55mhk/Tranogasy/rova-tranogasy.png?updatedAt=1679328193424)",
        }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-6" style={{ marginTop: "50px" }}>
              <p>
                <a
                  href="#"
                  className="btn btn-white btn-outline-white py-3 px-3 rounded-0 btn-2"
                >
                  Voir détails
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="site-blocks-cover overlay"
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/ryxb55mhk/Tranogasy/rova-tranogasy_2.png?updatedAt=1679331634605)",
        }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-md-10" style={{ marginTop: "50px" }}>
              <p>
                <a
                  href="#"
                  className="btn btn-white btn-outline-white py-3 px-3 rounded-0 btn-2"
                >
                  Voir détails
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </OwlCarousel>
  );
};

export default HomeSlider;
