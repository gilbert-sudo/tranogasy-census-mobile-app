import React from "react";
import "magnific-popup/dist/magnific-popup.css"; // import the Magnific Popup CSS
import $ from "jquery";
import "magnific-popup/dist/jquery.magnific-popup.min.js"; // import the Magnific Popup JS

const PropertyGallery = () => {
  React.useEffect(() => {
    // initialize the Magnific Popup
    $(".image-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }, []);

  return (
    <div className="bg-white property-body border-bottom border-left border-right p-0">
      <div className="row no-gutters mt-5">
        <div className="col-12">
          <h2 className="h4 text-black mb-3">QUELQUES PHOTOS :</h2>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <a href="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" className="image-popup gal-item">
            <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/properties/img_6.jpg?updatedAt=1678881706834" alt="Image" className="img-fluid" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
