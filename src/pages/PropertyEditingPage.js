// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import BookingDetails from "../components/BookingDetails";
import { useLoader } from "../hooks/useLoader";
import { useProperty } from "../hooks/useProperty";
import Swal from "sweetalert2";
import AutocompleteInput from "../components/AutocompleteInput";
import { Link, useRoute } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonShelter, faShower } from "@fortawesome/free-solid-svg-icons";
import { FaGripHorizontal, FaMoneyBill, FaToilet } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { GrStackOverflow } from "react-icons/gr";
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
    setBootstrap,
  } = useProperty();
  const ownersName = useSelector((state) => state.owner[1].ownersName);
  const quartersName = useSelector((state) => state.quarter[1].quartersName);
  const locationsName = useSelector((state) => state.location[1].locationsName);
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
    property ? property.location.address : ""
  );
  const [title, setTitle] = useState(property ? property.title : "");
  const [description, setDescription] = useState(
    property ? property.description : ""
  );
  const [rooms, setRooms] = useState(property ? property.rooms : "");

  const [area, setArea] = useState(property ? property.area : "");
  const [price, setPrice] = useState(property ? property.price : "");
  const [rent, setRent] = useState(property ? property.rent : "");
  const [docErrorClass, setDocErrorClass] = useState("");
  const [documentIdError, setDocumentIdError] = useState("");
  const [checked, setChecked] = useState(false);
  const [toilet, setToilets] = useState(property ? property.toilet : null);
  const [kitchen, setKitchens] = useState(property ? property.kitchen : null);
  const [wifiAvailability, setWifiAvailability] = useState(
    property ? property.features.wifiAvailability : null
  );
  const [bathrooms, setBathrooms] = useState(property?property.bathrooms:null);
  const [floor, setFloors] = useState(property ? property.floor : null);
  const [motoAccess, setMotoAccess] = useState(
    property ? property.features.motoAccess : false
  );
  const [carAccess, setCarAccess] = useState(
    property ? property.features.carAccess : false
  );
  const [parkingSpaceAvailable, setParkingSpaceAvailable] = useState(
    property ? property.features.parkingSpaceAvailable : false
  );
  const [waterPumpSupply, setWaterPumpSupply] = useState(
    property ? property.features.electricityPower : false
  );
  const [electricityPower, setElectricityPower] = useState(
    property ? property.features.electricityPower : false
  );
  const [securitySystem, setSecuritySystem] = useState(
    property ? property.features.securitySystem : false
  );
  const [waterPumpSupplyJirama, setWaterPumpSupplyJirama] = useState(
    property ? property.features.waterPumpSupplyJirama :false
  );
  const [surroundedByWalls, setSurroundedByWalls] = useState(
    property ? property.features.surroundedByWalls : false
  );
  const [electricityPowerJirama, setElectricityPowerJirama] = useState(
    property ? property.features.electricityPowerJirama : false
  );
  const [kitchenFacilities, setKitchenFacilities] = useState(
    property ? property.features.kitchenFacilities : false
  );
  const [toiletFacility, setToiletFacility] = useState(
    property ? property.features.toiletFacility : false
  );
  const [airConditionerAvailable, setAirConditionerAvailable] = useState(
    property ? property.features.airConditionerAvailable : false
  );
  const [smokeDetector, setSmokeDetector] = useState(
    property ? property.features.smokeDetectorsAvailable : false
  );
  const links = useSelector((state) => state.pagination);
  const [waterWellSupply, setWaterWellSupply] = useState(
    property ? property.features.waterWellSupply :false
  );
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
    // const {propertyId} = useParams();
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
    if ((owner && city && address) !== undefined) {
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
        address,
        city,
        price,
        rent,
        rooms,
        bathrooms,
        area,
        type,
        owner,
        censusTaker,
        floor,
        kitchen,
        toilet,
        wifiAvailability,
        parkingSpaceAvailable,
        airConditionerAvailable,
        smokeDetector,
        toiletFacility,
        kitchenFacilities,
        surroundedByWalls,
        electricityPowerJirama,
        electricityPower,
        waterPumpSupply,
        waterPumpSupplyJirama,
        securitySystem,
        motoAccess,
        carAccess,
        waterWellSupply,
        property.features._id
      );
      Swal.close();
    } else {
      setMsgError(null);
      setBootstrap(null);
      setDocErrorClass("alert alert-danger mt-2");
      setDocumentIdError(
        "veuillez selectionner un propriètaire, addresse ou quartier suggéré "
      );
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
      });
    }
    if (document.getElementById("btnValidate").disabled) {
      setDocErrorClass(null);
      setDocumentIdError(null);
      setMsgError(null);
      setBootstrap(null);
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
    setResetPropertyInput,
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
              initialValue={property ? property.location.address : ""}
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
                initialValue={
                  property
                    ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                    : ""
                }
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
                id="rooms"
                className="form-control"
                value={rooms}
                onChange={(e) =>
                  setRooms(parseInt(e.target.value.trim().replace(/\s+/g, " ")))
                }
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
                id="rooms"
                className="form-control"
                value={bathrooms}
                onChange={(e) => {
                  setBathrooms(
                    parseInt(e.target.value.trim().replace(/\s+/g, " "))
                  );
                }}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="toilet">Nombre de toilette</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaToilet />
                </span>
              </div>
              <input
                type="number"
                id="toilet"
                className="form-control"
                value={toilet}
                onChange={(e) => {
                  setToilets(
                    parseInt(e.target.value.trim().replace(/\s+/g, " "))
                  );
                }}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="floor">Nombre d'etage</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <GrStackOverflow />
                </span>
              </div>
              <input
                type="number"
                id="floor"
                className="form-control"
                value={floor}
                onChange={(e) => {
                  setFloors(
                    parseInt(e.target.value.trim().replace(/\s+/g, " "))
                  );
                }}
                required="ON"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="kitchens">Nombre de cuisine</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaKitchenSet />
                </span>
              </div>
              <input
                type="number"
                id="kitchens"
                className="form-control"
                value={kitchen}
                onChange={(e) => {
                  setKitchens(
                    parseInt(e.target.value.trim().replace(/\s+/g, " "))
                  );
                }}
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
                onChange={(e) =>
                  setArea(parseInt(e.target.value.trim().replace(/\s+/g, " ")))
                }
                required="ON"
              />
            </div>
          </div>{" "}
          <div>
            <label>les caractéristiques</label>
            <div className="form-group">
              <input
                type="checkbox"
                id="wifiAvailability"
                className="ml-2 mr-2"
                checked={wifiAvailability}
                onChange={(e) => setWifiAvailability(e.target.checked)}
              />
              <label htmlFor="wifiAvailability">disponibilité Wifi</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="airConditionner"
                className="ml-2 mr-2"
                checked={airConditionerAvailable}
                onChange={(e) => setAirConditionerAvailable(e.target.checked)}
              />
              <label htmlFor="wifiAvailability">climatiseur</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="smokeDetector"
                className="ml-2 mr-2"
                checked={smokeDetector}
                onChange={(e) => setSmokeDetector(e.target.checked)}
              />
              <label htmlFor="wifiAvailability">detécteur de fumée</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="carAccess"
                className="ml-2 mr-2"
                checked={carAccess}
                onChange={(e) => setCarAccess(e.target.checked)}
              />
              <label htmlFor="carAccess">accès voiture</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="motoAccess"
                className="ml-2 mr-2"
                checked={motoAccess}
                onChange={(e) => setMotoAccess(e.target.checked)}
              />
              <label htmlFor="motoAccess">accès moto</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="parking"
                className="ml-2 mr-2"
                checked={parkingSpaceAvailable}
                onChange={(e) => setParkingSpaceAvailable(e.target.checked)}
              />
              <label htmlFor="parking">disponibilité parking</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="waterWell"
                className="ml-2 mr-2"
                checked={waterWellSupply}
                onChange={(e) => setWaterWellSupply(e.target.checked)}
              />
              <label htmlFor="waterWell"> eau avec puit</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="waterPump"
                className="ml-2 mr-2"
                checked={waterPumpSupply}
                onChange={(e) => setWaterPumpSupply(e.target.checked)}
              />
              <label htmlFor="waterPump">Pompe à eau sans JIRAMA</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="waterPumpJirama"
                className="ml-2 mr-2"
                checked={waterPumpSupplyJirama}
                onChange={(e) => setWaterPumpSupplyJirama(e.target.checked)}
              />
              <label htmlFor="waterPumpJirama">Pompe à eau avec JIRAMA</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="electricityPower"
                className="ml-2 mr-2"
                checked={electricityPower}
                onChange={(e) => setElectricityPower(e.target.checked)}
              />
              <label htmlFor="electricityPower">Electricité sans JIRAMA</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="electricityJirama"
                className="ml-2 mr-2"
                checked={electricityPowerJirama}
                onChange={(e) => setElectricityPowerJirama(e.target.checked)}
              />
              <label htmlFor="electricityJirama">Electricité avec JIRAMA</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="securitySystem"
                className="ml-2 mr-2"
                checked={securitySystem}
                onChange={(e) => setSecuritySystem(e.target.checked)}
              />
              <label htmlFor="securitySystem">système de sécurité</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="surroundedByWalls"
                className="ml-2 mr-2"
                checked={surroundedByWalls}
                onChange={(e) => setSurroundedByWalls(e.target.checked)}
              />
              <label htmlFor="surroundedByWalls">cloturé par un mur</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="kitchenFacility"
                className="ml-2 mr-2"
                checked={kitchenFacilities}
                onChange={(e) => setKitchenFacilities(e.target.checked)}
              />
              <label htmlFor="kitchenFacility">cuisine comfortable</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="toiletFacility"
                className="ml-2 mr-2"
                checked={toiletFacility}
                onChange={(e) => setToiletFacility(e.target.checked)}
              />
              <label htmlFor="toiletFacility">comfortable toilette</label>
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
                  if (property.type !== "rent") {
                    setChecked(true);
                  } else {
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
                  if (property.type !== "sale") {
                    setChecked(true);
                  } else {
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
                  onChange={(e) =>
                    setPrice(
                      parseInt(e.target.value.trim().replace(/\s+/g, " "))
                    )
                  }
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
                  onChange={(e) =>
                    setRent(
                      parseInt(e.target.value.trim().replace(/\s+/g, " "))
                    )
                  }
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
                ((property.owner ? property.owner.fullName : "") ===
                  ownerName &&
                (property
                  ? `${property.city.quarter} ${property.city.district} ${property.city.reference} Arr`
                  : "") === quarterName &&
                (property ? property.location.address : "") === locationName &&
                property.title === title &&
                property.area === area &&
                property.description === description &&
                property.bathrooms === bathrooms &&
                property.rooms === rooms &&
                property.rent === rent &&
                property.price === price &&
                property.toilet === toilet &&
                property.floor === floor &&
                property.kitchen === kitchen &&
                property.features.airConditionerAvailable ===
                  airConditionerAvailable &&
                  property.features.wifiAvailability === wifiAvailability &&
                property.features.waterPumpSupply === waterPumpSupply &&
                property.features.waterWellSupply === waterWellSupply &&
                property.features.waterPumpSupplyJirama ===
                  waterPumpSupplyJirama &&
                property.features.electricityPower === electricityPower &&
                property.features.electricityPowerJirama ===
                  electricityPowerJirama &&
                property.features.securitySystem === securitySystem &&
                property.features.surroundedByWalls === surroundedByWalls &&
                property.features.carAccess === carAccess &&
                property.features.motoAccess === motoAccess &&
                property.features.kitchenFacilities === kitchenFacilities && property.features.toiletFacility=== toiletFacility &&
                property.features.smokeDetectorsAvailable === smokeDetector && property.features.parkingSpaceAvailable === parkingSpaceAvailable &&
                !checked
                  ? true
                  : false) || isLoading
              }
            >
              sauvegarder
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

export default PropertyEditingPage;
