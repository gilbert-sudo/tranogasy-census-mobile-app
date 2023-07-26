// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonShelter, faShower } from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { updateActiveLink } from "../redux/redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
const AddingPage = () => {
  const dispatch = useDispatch();
  const [disabledPriceInput, setDisabledPriceInput] = useState(true);
  const { loadOwnersName, loadQuartersName, loadLocationsName } = useLoader();
  const {
    addProperty,
    resetPropertyInput,
    msgError,
    bootstrapClassname,
    isLoading,
    setBootstrap,
    setMsgError,
    setResetPropertyInput,
  } = useProperty();
  const censusTaker = useSelector((state) => state.user._id);
  const ownersName = useSelector((state) => state.owner[1].ownersName);
  const quartersName = useSelector((state) => state.quarter[1].quartersName);
  const locationsName = useSelector((state) => state.location[1].locationsName);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  const links = useSelector((state) => state.pagination);
  const resetAllInputs = () => {
    setTitle("");
    setDescription("");
    setBedrooms("");
    setArea("");
    setBathrooms("");
    setArea("");
    setPrice("");
    setRent("");
  };
  //get the autocomplete id value
  const getDocId = (inputClassName, data) => {
    const inputValue = document.getElementById(inputClassName).value;
    if (inputValue) {
      const documentId = data.filter(
        (document) => document.name === inputValue
      );
      if (documentId && documentId.length) {
        setMsgError(null);
        setBootstrap(null);
        setDocErrorClass(null);
        setDocumentIdError(null);
        return documentId[0].id;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  //handle the property form submiting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch the owner's id
    const owner = getDocId("owner-input", ownersName);
    // fetch the quarter's id
    const city = getDocId("quarter-input", quartersName);
    // fetch the address
    const address = getDocId("address-input", locationsName);

    var type = "sale";
    //get the property type
    if (disabledPriceInput) {
      type = "rent";
    }
    if ((city && owner && address) !== undefined) {
      const addressName = document.getElementById("address-input").value;
      Swal.fire({
        title: "Insertion",
        text: "S'il vous plaît, patientez...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
     await addProperty(
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
    } else {
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass("alert alert-danger");
      setDocumentIdError(
        "veuillez selectionner un propriètaire, addresse ou quartier suggéré "
      );
    }
  };

  useEffect(() => {
    console.log(ownersName);

    const pageLoader = async () => {
      if (ownersName.length===0) {
        await loadOwnersName();
      } else if (quartersName.length===0) {
        await loadQuartersName();
      } else if (locationsName.length===0) {
        await loadLocationsName();
      }
    };
    if (resetPropertyInput) {
      resetAllInputs();
      Swal.fire({
        icon: "success",
        title: "succès",
        text: "l'immobilier a été ajouter avec succès!",
        confirmButtonColor: "rgb(124, 189, 30)",
      }).then((result) => {
        if (result.isConfirmed) {
          setResetPropertyInput(false);
        }
      });
    }

    if (links[2].activeLink !== "/adding") {
      dispatch(updateActiveLink("/adding"));
    }
    pageLoader();
  }, [
    loadOwnersName,
    quartersName,
    locationsName,
    links,
    dispatch,
    loadQuartersName,
    ownersName,
    loadLocationsName,
    resetPropertyInput,
    setResetPropertyInput,
  ]);
  return (
    <>
      <div
        className="border justify-content-between mt-5 p-1"
        style={{ backgroundColor: "#f1f1f1" }}
      >
     <center className="mt-2">
            <Link className="btn btn-primary" to="/adding">
              Maison
            </Link>
            {"  "}
            <Link className="btn btn-outline-primary" to="/addingLandPage">
              Terrain
            </Link>
          </center>
      </div>
      <div
        className="widget border rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h3 className="h4 text-black widget-title mt-2 mb-3">
          Ajouter votre immobilier
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
            {ownersName && (
              <AutocompleteInput
                reset={resetPropertyInput}
                className="form-control auto-input"
                placeholder="Nom complet"
                inputId="owner-input"
                suggestions={ownersName}
                style={{ width: "100%" }} // add style prop
              />
            )}
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
            {locationsName && (
              <AutocompleteInput
                reset={resetPropertyInput}
                className="form-control auto-input"
                placeholder="Une adresse exacte"
                inputId="address-input"
                suggestions={locationsName}
                style={{ width: "100%" }} // add style prop
              />
            )}
          </div>
          <div className="form-group">
            <label>Quartier</label>
            <div className="input-group">
              {quartersName && (
                <AutocompleteInput
                  reset={resetPropertyInput}
                  className="form-control auto-input"
                  placeholder="Nom du quartier"
                  inputId="quarter-input"
                  suggestions={quartersName}
                  style={{ width: "100%" }} // add style prop
                />
              )}
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
                onChange={(e) => setBedrooms(e.target.value)}
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
                onChange={(e) => setBathrooms(e.target.value)}
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
                onChange={(e) => setArea(e.target.value)}
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
      id="flexRadioDefault1"
      checked={disabledPriceInput} // Check the state value directly
      onClick={() => {
        setDisabledPriceInput(true);
      }}
    />
    <label className="form-check-label" htmlFor="flexRadioDefault1">
      Location
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="flexRadioDefault"
      id="flexRadioDefault2"
      checked={!disabledPriceInput} // Check the opposite of the state value
      onClick={() => {
        setDisabledPriceInput(false);
      }}
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
                  onChange={(e) => setPrice(e.target.value)}
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
                  onChange={(e) => setRent(e.target.value)}
                  required="ON"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Ajouter la propriété
            </button>
          </div>
        </form>

        {(msgError || documentIdError) && (
          <div className={bootstrapClassname || docErrorClass}>
            {msgError || documentIdError}
          </div>
        )}
      </div>
    </>
  );
};

export default AddingPage;
