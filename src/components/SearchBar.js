const SearchBar = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossOrigin="anonymous"
      />
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center py-2 px-2">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body" />
                </div>
                {/*end of col*/}
                <div className="col">
                  <input
                    className="form-control form-control-lg form-control-borderless"
                    type="search"
                    placeholder="N° de la propriété"
                  />
                </div>
                {/*end of col*/}
                <div className="col-auto">
                  <button className="btn btn-lg btn-success" type="submit">
                    Search
                  </button>
                </div>
                {/*end of col*/}
              </div>
            </form>
          </div>
          {/*end of col*/}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
