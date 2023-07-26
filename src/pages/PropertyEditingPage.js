// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import Swal from "sweetalert2";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link, useRoute} from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonShelter, faShower } from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const PropertyEditingPage = () => {
  const dispatch = useDispatch();
  const [match, params] = useRoute("/edit-property/:propertyId");
  const propertyId = match ? params.propertyId : null;
  const properties = useSelector((state) => state.properties.properties);
  const property = properties.find((property) => property._id === propertyId);
  const [disabledPriceInput, setDisabledPriceInput] = useState(
    property.type === "rent" ? true : false
  );
  const { loadOwnersName, loadQuartersName, loadLocationsName } = useLoader();
  const {
    updateProperty,
    resetPropertyInput,
    msgError,
    bootstrapClassname,
    isLoading,
    setMsgError,
    setResetPropertyInput,
    setBootstrap
  } = useProperty();
  const ownersName = useSelector((state) => state.owner[1].ownersName);
  const quartersName= useSelector((state) => state.quarter[1].quartersName);
  const locationsName= useSelector((state) => state.location[1].locationsName);
  const censusTaker = useSelector((state) => state.user._id);
  const [ownerName, setOwnerName] = useState(
    property.owner ? property.owner.fullName : ""
  );
  const [quarterName, setQuarterName] = useState(
    property
    ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
    : ""
  );
  const [locationName, setLocationName] = useState(
    property ? property.address : ""
  );
  const [title, setTitle] = useState(property ? property.title : "");
  const [description, setDescription] = useState(
    property ? property.description : ""
  );
  const [bedrooms, setBedrooms] = useState(property ? property.bedrooms : "");
  const [bathrooms, setBathrooms] = useState(
    property ? property.bathrooms : ""
  );
  const [area, setArea] = useState(property ? property.area : "");
  const [price, setPrice] = useState(property ? property.price : "");
  const [rent, setRent] = useState(property ? property.rent : "");
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  const [checked, setChecked] = useState(false);
  const links = useSelector((state) => state.pagination);

  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue) {
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
        return undefined
      }
    }else{
      return undefined;
    } 
  };

  //handle the property form submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {propertyId} = useParams();
    // fetch the owner's id
    const owner = getDocId("owner-input", ownersName);
    // fetch the quarter's id
    const city = getDocId("quarter-input", quartersName);
    // fetch the address
    const address = getDocId("address-input", locationsName);
    console.log("the info is ", owner, address, city);
    var type = "sale";
    //get the property type
    if (disabledPriceInput) {
      type = "rent";
    }
    if ((owner && city && address) !== undefined) {
      const addressName = document.getElementById("address-input").value;
      Swal.fire({
        title: "Modification",
        text: "S'il vous plaît, patientez...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await updateProperty(
        propertyId,
        title,
        description,
        addressName,
        city,
        price,
        rent,
        bedrooms,
        bathrooms,
        area,
        type,
        owner,
        censusTaker
      );
      Swal.close();
    }else{
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass("alert alert-danger mt-2");
      setDocumentIdError("veuillez selectionner un propriètaire, addresse ou quartier suggéré ");
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      if (ownersName.length === 0) {
      await loadOwnersName();
      } else if (quartersName.length === 0) {
      await loadQuartersName();
      } else if (!locationsName.length === 0) {
      await loadLocationsName();
      }
    };
    if (resetPropertyInput) {
      Swal.fire({
        icon: "success",
        title: "succès",
        text: "l'immobilier a été modifié avec succès!",
        confirmButtonColor: "rgb(124, 189, 30)",
      }).then((result) => {
        if (result.isConfirmed) {
          setResetPropertyInput(false);
        }
      })
    }
    if(document.getElementById("btnValidate").disabled){
      setDocErrorClass(null);
      setDocumentIdError(null);
      setMsgError(null);
      setBootstrap(null)
    }
    pageLoader();
  }, [
    property,
    setMsgError,
    setBootstrap,
    loadOwnersName,
    links,
    dispatch,
    loadQuartersName,
    ownersName,
    locationsName,
    quartersName,
    loadLocationsName,
    resetPropertyInput,
    setResetPropertyInput
  ]);
  const handleOwnerName = (Name) => {
    setOwnerName(Name);
  };
  const handleLocationName = (Name) => {
    setLocationName(Name);
  };
  const handleQuarterName = (Name) => {
    setQuarterName(Name);
  };

  return (
    <>
      <div
        className="widget border rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h3 className="h4 text-black widget-title mt-5 mb-3">
          Modifier cet immobilier
        </h3>
        <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Propriétaire{" "}
              <Link to="/create-owner">
                <nb style={{ color: "blue" }}>
                  {" "}
                  &nbsp; &nbsp; &nbsp; &nbsp; <small>Inscrire un nouveau</small>
                </nb>
              </Link>
            </label>
            <AutocompleteInput
              className="form-control auto-input"
              placeholder="Nom complet"
              inputId="owner-input"
              initialValue={property.owner ? property.owner.fullName : ""}
              onNameChange={handleOwnerName}
              suggestions={ownersName}
              style={{ width: "100%" }} // add style prop
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Un titre</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdTitle />
                </span>
              </div>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Description de l'immobilier</label>
            <textarea
              style={{ minHeight: "100px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="form-control"
              required="ON"
            ></textarea>
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
              inputId="address-input"
              initialValue={property ? property.address : ""}
              onNameChange={handleLocationName}
              suggestions={locationsName}
              style={{ width: "100%" }} // add style prop
            />
          </div>
          <div className="form-group">
            <label>Quartier</label>
            <div className="input-group">
              <AutocompleteInput
                className="form-control auto-input"
                placeholder="Nom du quartier"
                inputId="quarter-input"
                initialValue={property
                  ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                  : ""}
                onNameChange={handleQuarterName}
                suggestions={quartersName}
                style={{ width: "100%" }} // add style prop
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Nombre de chambre</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faPersonShelter} />
                </span>
              </div>
              <input
                type="number"
                id="bedrooms"
                className="form-control"
                value={bedrooms}
                onChange={(e) => setBedrooms(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bathrooms">Salle de bain</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faShower} />
                </span>
              </div>
              <input
                type="number"
                id="bathrooms"
                className="form-control"
                value={bathrooms}
                onChange={(e) => {setBathrooms(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="area">
              Surface habitable
              <nb style={{ color: "blue" }}>
                &nbsp; &nbsp; <small>(en m²)</small>
              </nb>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaGripHorizontal />
                </span>
              </div>
              <input
                type="number"
                id="area"
                className="form-control"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value="location"
                checked={disabledPriceInput ? "location" : ""}
                id="flexRadioDefault1"
                onClick={(e) => {
                  setDisabledPriceInput(true);
                  if(property.type !== "rent"){
                    setChecked(true);
                  }else{
                    setChecked(false);
                  }
                }}
              />

              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Location
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                value="vente"
                checked={disabledPriceInput ? "" : "vente"}
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={(e) => {
                  setDisabledPriceInput(false);
                  if(property.type !== "sale"){
                    setChecked(true);
                  }else{
                    setChecked(false);
                  }
                }}
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Vente
              </label>
            </div>
          </div>
          {!disabledPriceInput ? (
            <div className="form-group">
              <label htmlFor="price">
                Prix de vente
                <nb style={{ color: "blue" }}>
                  &nbsp; &nbsp; <small>(en Ariary)</small>
                </nb>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FaMoneyBill />
                  </span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                  required="ON"
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="rent">
                Prix de location
                <nb style={{ color: "blue" }}>
                  &nbsp; &nbsp; <small>(en Ariary)</small>
                </nb>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <GiPayMoney />
                  </span>
                </div>
                <input
                  type="number"
                  id="rent"
                  className="form-control"
                  value={rent}
                  onChange={(e) => setRent(parseInt(e.target.value.trim().replace(/\s+/g, " ")))}
                  required="ON"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <button
              id="btnValidate"
              type="submit"
              className="btn btn-primary"
              disabled={
                (((property.owner ? property.owner.fullName : "") ===  ownerName) &&
               ((property? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                : "")  === quarterName) &&
                ((property ? property.address : "") === locationName) &&
                 property.title === title &&
                property.area === area  &&
                 property.description === description &&
                 property.bathrooms === bathrooms &&
                 property.bedrooms === bedrooms &&
                 property.rent  === rent &&
                property.price ===  price && !checked 
                  ?true
                  : false) || isLoading 
              }
            >
              sauvegarder
            </button>
          </div>
        </form>
        {(msgError || documentIdError)  && (
          <div className={bootstrapClassname || docErrorClass}>
            {msgError || documentIdError}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyEditingPage;
