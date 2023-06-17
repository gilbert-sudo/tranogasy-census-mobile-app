const SearchForm = () => {
  return (
    <div className="row">
      <form className="form-search col-md-12" style={{ marginTop: "-300px" }}>
        <div className="row  align-items-end">
          <div className="col-md-3">
            <label htmlFor="offer-types">Type d'offre</label>
            <div className="select-wrap">
              <span className="icon icon-arrow_drop_down" />
              <select
                name="offer-types"
                id="offer-types"
                className="form-control d-block rounded-0"
              >
                <option value="">À vendre</option>
                <option value="">A louer</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="list-types">Prix max</label>
            <div className="select-wrap">
              <span className="icon icon-arrow_drop_down" />
              <select
                name="list-types"
                id="list-types"
                className="form-control d-block rounded-0"
              >
                <option value="">200000 AR</option>
                <option value="">500000 AR</option>
                <option value="">800000 AR</option>
                <option value="">1000000 AR</option>
                <option value="">2000000 AR</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="select-city">Sélectionnez un quartier</label>
            <div className="select-wrap">
              <span className="icon icon-arrow_drop_down" />
              <select
                name="select-city"
                id="select-city"
                className="form-control d-block rounded-0"
              >
                <option value="">Mahamasina</option>
                <option value="">Tsimbazaza</option>
                <option value="">Ampefiloha</option>
                <option value="">Ampasapito</option>
                <option value="">Andraisoro</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <input
              type="submit"
              className="btn btn-success text-white btn-block rounded-0 mt-4"
              defaultValue="Chercher"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
