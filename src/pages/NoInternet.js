import { useLocation } from 'wouter';
import { FiRefreshCw } from "react-icons/fi";

const NoInternetPage = () => {

  const [location, setLocation] = useLocation();

  function refreshPage() {
    setLocation("/property");
  }

  return (
    <>
      <div className="container mt-5 no-internet-connection">
        <img src="images/no connction.jpg" alt="Pas de connexion Internet" />
        <center>
          {" "}
          <p style={{fontFamily: "Arial, sans-serif"}}>
            Aucune connexion Internet détectée. Veuillez vérifier votre
            connexion Internet et réessayer.
          </p>
          <a href="/#" className="btn btn-dark" onClick={refreshPage}>
            <i className="refresh-icon fas fa-sync-alt"><FiRefreshCw /></i> Réessayer
          </a>
        </center>
      </div>
    </>
  );
};

export default NoInternetPage;
