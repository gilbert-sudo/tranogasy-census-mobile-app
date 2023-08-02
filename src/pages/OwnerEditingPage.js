// import { useSelector } from "react-redux";
// import BookingDetails from "../components/BookingDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useOwner } from "../hooks/useOwner";
import { useLoader } from "../hooks/useLoader";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link} from "wouter";
import { useSelector } from "react-redux";
import { useRoute } from "wouter";
// import { useSelector } from "react-redux";

const OwnerEditingPage = () => {
  const [match, params] = useRoute("/edit-owner/:ownerId");
  const ownerId = match ? params.ownerId : null;
   const { loadLocationsName } = useLoader();
  const {
    updateOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
    setResetOwnerInput, 
    setMsgError,
    setBootstrap
  } = useOwner();
  const owners = useSelector((state) => state.owner[0].owners);
  const owner = owners.find((owner) => owner._id === ownerId);

  const [fullname, setFullName] = useState(owner.fullName);
  const [newAdress, setNewAdress] = useState(owner.location.address);
  const locationsName= useSelector((state) => state.location[1].locationsName);
  const [phone1, setPhone1] = useState(owner.phone1);
  const [phone2, setPhone2] = useState(owner.phone2);
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  // const owner = useSelector((state) => state.owner);

  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue !== undefined && inputValue.length) {
      const documentId = data.filter(
        (document) => document.name === inputValue
      );
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
        setDocumentIdError("veuillez selectionner un propriètaire, addresse ou quartier suggéré ");
        return
      }
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch the location's id
    const locationId = getDocId("address-input", locationsName);
    if (locationId !== undefined) {
      Swal.fire({
        title: "Modification",
        text: "S'il vous plaît, patientez...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await updateOwner(ownerId, fullname, locationId, phone1, phone2);
      Swal.close();
    } else{
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass("alert alert-danger");
      setDocumentIdError("veuillez selectionner un  addresse suggéré ");
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      if (!locationsName.length) {
        await loadLocationsName();
        }
    };
    if (resetOwnerInput) {
      Swal.fire({
        icon: "success",
        title: "succès",
        text: "le propriètaire a été modifié avec succès!",
        confirmButtonColor: "rgb(124, 189, 30)",
      }).then((result) => {
        if (result.isConfirmed) {
          setResetOwnerInput(false);
        }
      })
    }
    if(document.getElementById("btnValidate").disabled){
      setDocErrorClass(null);
      setDocumentIdError(null);
      setMsgError(null);
      setBootstrap(null);
    }
  pageLoader(); 
  }, [
    resetOwnerInput,
    loadLocationsName,
    setMsgError,
    setBootstrap,
    locationsName,
    setResetOwnerInput
  ]);

  const handleAddressChange = (value) => {
    setNewAdress(value);
  };
  return (
    <div className="bg-white widget border mt-5 rounded">
      <h3 className="h4 text-black widget-title mb-3">
        Modifier ce propriètaire
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Le nom complet</label>
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
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">
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
            inputId="address-input"
            initialValue={owner.location.address}
            suggestions={locationsName}
            onNameChange={handleAddressChange} // pass the callback function
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
              type="number"
              id="phone"
              className="form-control"
              value={phone1}
              onChange={(e) => {
                let phone1 = e.target.value.trim().replace(/\s/g, "");
                setPhone1(phone1);
              }}
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
              type="number"
              id="phone"
              className="form-control"
              value={phone2}
              onChange={(e) => {
                let phone2 = e.target.value.trim().replace(/\s/g, "");
                setPhone2(phone2);
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            id="btnValidate"
            className="btn btn-primary"
            defaultValue="Insérer"
            disabled={
              (owner.fullName === fullname &&
              owner.phone1 === phone1  &&
              owner.location.address === newAdress && owner.phone2 === phone2
                ? true
                : false) || (owner.fullName === fullname &&
                owner.phone1 === phone1  &&
                owner.location.address === newAdress && owner.phone2 === "" 
                  ? true: false) || isLoading
            }
          >
            Sauvegarder
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

export default OwnerEditingPage;
