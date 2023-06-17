const PropertyFilter = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="view-options bg-white py-3 px-3 d-md-flex align-items-center">
          <div className="ml-auto d-flex align-items-center">
            <div>
              <a href="#" className="view-list px-3 border-right">
                Location
              </a>
              <a href="#" className="view-list px-3">
                Vente
              </a>
            </div>
            <div className="select-wrap">
              <span className="icon icon-arrow_drop_down" />
              <select className="form-control form-control-sm d-block rounded-0">
                <option value="">Trier par</option>
                <option value="">Prix croissant</option>
                <option value="">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
