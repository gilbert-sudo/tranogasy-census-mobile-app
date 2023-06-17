
const CardDetails = () => {
  return (
    <div className="bg-white property-body border-bottom border-left border-right">
      <div className="row">
        <div className="col-md-6">
          <strong className="text-success h3 mb-3">1,000,500AR/mois</strong>
        </div>
        <div className="col-md-6">
          <ul className="property-specs-wrap mb-3 mb-lg-0 float-lg-right">
            <li>
              <span className="property-specs">Beds</span>
              <span className="property-specs-number">
                2 <sup>+</sup>
              </span>
            </li>
            <li>
              <span className="property-specs">Baths</span>
              <span className="property-specs-number">2</span>
            </li>
            <li>
              <span className="property-specs">SQ FT</span>
              <span className="property-specs-number">7,000</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
          <span className="d-inline-block text-black mb-0 caption-text">
            Home Type
          </span>
          <strong className="d-block">Condo</strong>
        </div>
        <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
          <span className="d-inline-block text-black mb-0 caption-text">
            Year Built
          </span>
          <strong className="d-block">2018</strong>
        </div>
        <div className="col-md-6 col-lg-4 text-center border-bottom border-top py-3">
          <span className="d-inline-block text-black mb-0 caption-text">
            Price/Sqft
          </span>
          <strong className="d-block">$520</strong>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
