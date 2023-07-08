// import { useSelector } from "react-redux";
// import BookingDetails from "../components/BookingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
    faLocationDot,
   faLink
  } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useLocation } from "../hooks/useLocation";
import { useRoute} from 'wouter';
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const LocationEditingPage = () => {
  const [match, params] = useRoute("/edit-location/:locationId");
  const locationId = match ? params.locationId : null;
const locations = useSelector(state => state.location[0].locations);
  let location = locations.filter(function(location) {
    return location._id === locationId;
  });
  const address = location[0].address;
  const locationLink = location[0].locationLink;
  const [Address, setAddress] = useState(address);
  const [addressLink, setAddressLink] = useState(locationLink);
  const [isValidReset, setIsValidReset] = useState(false);
  // const Location = useSelector((state) => state.Location);
  const resetAllInputs = () => {
    setAddress("");
    setAddressLink("");
  };

  const {
    updateLocation,
    isLoading,
    msgError,
    bootstrapClassname,
    resetLocationInput,
    setResetLocationInput,
    setMsgError,
    setBootstrap
  } = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateLocation(locationId, Address, addressLink);
    setIsValidReset(true);
  };
  useEffect(() => {
    if (resetLocationInput && isValidReset) {
      resetAllInputs();
      setIsValidReset(false)
      Swal.fire({
        icon: "success",
        title: "succès",
        text: "la location a été modifié avec succès!",
        confirmButtonColor: "rgb(124, 189, 30)",
      }).then((result) => {
        if (result.isConfirmed) {
          setResetLocationInput(false);
        }
      })
    }
    if(document.getElementById("btnValidate").disabled){
      setMsgError(null);
      setBootstrap(null);
    }
  }, [resetLocationInput, isValidReset, setResetLocationInput, setMsgError, setBootstrap]);

  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Modifier ce location
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">L'addresse complet</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
            </div>
            <input
              type="text"
              id="address"
              className="form-control"
              value={Address}
              onChange={(e) => {
               setAddress(e.target.value)}}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">le lien pour l'addresse</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLink} />
              </span>
            </div>
            <input
              type="text"
              id="link"
              className="form-control"
              value={addressLink}
              onChange={(e) =>{ const link = e.target.value.replace(/\s/g, "");setAddressLink(link)}}
              // required="ON"
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="btnValidate"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={address === Address && locationLink === addressLink?true:false || isLoading}
          >Modifier</button>
        </div>
      </form>
      {msgError && (
        <div className={bootstrapClassname}>
          {msgError}
        </div>
      )}
      {/* {!client && (
        <div className="alert alert-danger">
          Veuillez d'abord vous connecter pour envoyer une demande{" "}
          <Link to="/login">
            <u style={{ color: "blue" }}>Se connecter</u>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default LocationEditingPage;
