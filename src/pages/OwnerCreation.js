
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useOwner } from "../hooks/useOwner";
import { useLoader } from "../hooks/useLoader";
import AutocompleteInput from "../components/AutocompleteInput";
import Swal from "sweetalert2";
import { Link } from "wouter";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const OwnerCreation = () => {
  const { loadLocationsName } = useLoader();
  let {
    createOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
    setResetOwnerInput, 
    setMsgError,
    setBootstrap
  } = useOwner();
  const locationsName= useSelector((state) => state.location[1].locationsName);
  const [fullname, setFullName] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  // const owner = useSelector((state) => state.owner);
  const resetAllInputs = () => {
    setFullName("");
    setPhone1("");
    setPhone2("");
  };
  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if(inputValue){
      const documentId = data.filter((document) => document.name === inputValue);
    if(documentId && documentId.length){
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass(null);
      setDocumentIdError(null);
        return documentId[0].id;
    } else {
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass("alert alert-danger");
      setDocumentIdError("veuillez selectionner un addresse suggéré ");
      return
    }
    }   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // fetch the location's id 
    const locationId = getDocId("address-input", locationsName);
      if(locationId !== undefined){
      createOwner(fullname, locationId, phone1, phone2);
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      if (!locationsName.length) {
        await loadLocationsName();
        }
    };
    if (resetOwnerInput) {
      resetAllInputs();
      Swal.fire({
        icon: "success",
        title: "succès",
        text: "le propriètaire a été ajouté avec succès!",
        confirmButtonColor: "rgb(124, 189, 30)",
      }).then((result) => {
        if (result.isConfirmed) {
          setResetOwnerInput(false);
        }
      })
    }

      pageLoader();
  
  }, [resetOwnerInput, loadLocationsName, locationsName,  setResetOwnerInput]);
  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Ajouter un nouveau propriètaire
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Votre nom complet</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              id="name"
              className="form-control"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            L'adresse (Lot){" "}
            <Link to="/create-location">
              <nb style={{ color: "blue" }}>
                {" "}
                &nbsp;<small>Ajouter un nouveau</small>
              </nb>
            </Link>
          </label>
          <AutocompleteInput
            className="form-control auto-input"
            placeholder="Une adresse exacte"
            reset = {resetOwnerInput}
            inputId="address-input"
            suggestions={locationsName}
            style={{ width: "100%" }} // add style prop
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Premier numéro téléphone</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+261</span>
            </div>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">seconde numéro téléphone</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+261</span>
            </div>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="phone"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={isLoading}
          >
            Ajouter
          </button>
        </div>
      </form>
      
         
      {(msgError || documentIdError) && (
          <div className={bootstrapClassname || docErrorClass}>
            {msgError || documentIdError}
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

export default OwnerCreation;
