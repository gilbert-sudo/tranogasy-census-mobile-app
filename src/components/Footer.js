const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="footer mb-4">Suivez-nous</h3>
            <div>
              <a href="#" className="pl-0 pr-3">
                <span className="icon-facebook" />
              </a>
              <a href="#" className="pl-3 pr-3">
                <span className="icon-twitter" />
              </a>
              <a href="#" className="pl-3 pr-3">
                <span className="icon-instagram" />
              </a>
              <a href="#" className="pl-3 pr-3">
                <span className="icon-linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div className="row pt-2 text-center">
          <div className="col-md-12">
            <p>
              Copyright © All rights reserved | This Website is made with
              <i
                className="icon-heart text-danger"
                aria-hidden="true"
              /> by{" "}
              <a href="https://www.gilbertmadagascar.mg" target="_blank">
                Gilbert Madagascar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
