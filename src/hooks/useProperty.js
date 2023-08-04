import { useLocation } from "wouter";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  pushProperty,
  pushLand,
  updateOneLandById,
  updateOnePropertyById,
  updateOneLocationById,
  updateOneOwnerById,
  deleteOneLandById,
  deleteOnePropertyById,
} from "../redux/redux";
import { useDispatch } from "react-redux";
export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetPropertyInput, setResetPropertyInput] = useState(false);
  const dispatch = useDispatch();
  const [, setLocation] = useLocation();
  // const censusTaker = useSelector((state) => state.user._id);
  //add house function
  const addProperty = async (
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
    waterWellSupply
  ) => {
    setIsLoading(true);
    console.log(
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
      censusTaker
    );
    if (
      title === undefined ||
      description === undefined ||
      address === undefined ||
      city === undefined ||
      price === undefined ||
      rent === undefined ||
      rooms === undefined ||
      bathrooms === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger mt-2");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
      try {
        const response = await fetch(`http://localhost:3600/api/properties`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
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
            waterWellSupply
          }),
        });

        const json = await response.json();

        if (response.ok) {
          setBootstrap(null);
          setMsgError(null);
          setIsLoading(false);
          setResetPropertyInput(true);
          console.log(json);
          dispatch(pushProperty(json));
          dispatch(updateOneOwnerById(json.owner));
          dispatch(
            updateOneLocationById({ toUsed: true, address: json.address })
          );
        }
        if (!response.ok) {
          setBootstrap("alert alert-danger mt-2");
          setMsgError(json.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setLocation("/nosignal");
        console.log(error);
        return [];
      }
    }
  };

  // update house function
  const updateProperty = async (
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
    featureId
  ) => {
    setIsLoading(true);
    if (
      title === undefined ||
      description === undefined ||
      address === undefined ||
      city === undefined ||
      price === undefined ||
      rent === undefined ||
      rooms === undefined ||
      bathrooms === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
      try {
        const response = await fetch(
          `http://localhost:3600/api/properties/` + propertyId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
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
              featureId
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          setBootstrap(null);
          setMsgError(null);
          setIsLoading(false);
          setResetPropertyInput(true);
          dispatch(updateOnePropertyById(json.populatedProperty));
          dispatch(updateOneOwnerById(json.populatedProperty.owner));
          dispatch(updateOneOwnerById(json.unusedOwner));
          dispatch(updateOneLocationById(json.unusedLocation));
          dispatch(
            updateOneLocationById({
              toUsed: true,
              address: json.populatedProperty.address,
            })
          );
        }
        if (!response.ok) {
          setBootstrap("alert alert-danger");
          setMsgError(json.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setLocation("/nosignal");
        console.log(error);
        return [];
      }
    }
  };
  const deleteProperty = async (propertyId, propertyType, admin = null) => {
    setIsLoading(true);
    Swal.fire({
      text: "En êtes-vous sûr?",
      showCancelButton: true,
      confirmButtonText: '<span class="bold-text">OK</span>',
      cancelButtonText: "Annuler",
      customClass: {
        confirmButton: "btn btn-secondary",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
      didRender: () => {
        const confirmButton = Swal.getConfirmButton();
        // Set styles for the buttons
        confirmButton.style.marginRight = "100px"; // Adjust the value as per your spacing requirements
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "suppression",
          text: "S'il vous plaît, patientez...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          const response = await fetch(
            `http://localhost:3600/api/${propertyType}/${propertyId}/${admin}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          const json = await response.json();
          if (response.ok) {
            Swal.close();
            setBootstrap(null);
            setMsgError(null);
            setIsLoading(false);
            if (propertyType === "properties") {
              dispatch(deleteOnePropertyById(propertyId));
              dispatch(updateOneOwnerById(json.updatedOwner));
              dispatch(
                updateOneLocationById({
                  toUsed: json.updatedLocation.used,
                  address: json.updatedLocation.address,
                })
              );
            } else if (propertyType === "lands") {
              dispatch(deleteOneLandById(propertyId));
              dispatch(updateOneOwnerById(json));
            }
            // Show success message after deletion
            Swal.fire("Supprimé!", "Propriété supprimé avec succès", "success");
          }
          if (!response.ok) {
            if (propertyType === "lands" && json.update === false) {
              dispatch(updateOneLandById(json.populatedProperty));
              setLocation("/land");
              Swal.fire(
                "Action refusé!",
                "Propriété accèpté par l'Administrateur",
                "danger"
              );
              return;
            } else if (propertyType === "properties" && json.update === false) {
              dispatch(updateOnePropertyById(json.populatedProperty));
              setLocation("/property-list");
              Swal.fire(
                "Action refusé!",
                "Propriété accèpté par l'Administrateur",
                "danger"
              );
              return;
            }
            setBootstrap("alert alert-danger mt-2");
            setMsgError(json.message);
            setIsLoading(false);
            Swal.close();
          }
        } catch (error) {
          setIsLoading(false);
          setLocation("/nosignal");
          console.log(error);
          Swal.close();
          return [];
        }
      }
    });

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // });

    // swalWithBootstrapButtons.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, cancel!',
    //   reverseButtons: true
    // }).then(async (result) => {
    //   if (result.isConfirmed) {

    //   }
    // });
  };

  //add land function
  const addLand = async (
    title,
    description,
    location,
    city,
    price,
    rent,
    squarePerMeter,
    area,
    type,
    owner,
    censusTaker
  ) => {
    setIsLoading(true);
    if (
      title === undefined ||
      description === undefined ||
      location === undefined ||
      city === undefined ||
      price === undefined ||
      rent === undefined ||
      squarePerMeter === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger mt-2");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
      try {
        const response = await fetch(`http://localhost:3600/api/lands`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            title,
            description,
            location,
            city,
            price,
            rent,
            squarePerMeter,
            area,
            type,
            owner,
            censusTaker,
          }),
        });

        const json = await response.json();

        if (response.ok) {
          setBootstrap(null);
          setMsgError(null);
          setIsLoading(false);
          setResetPropertyInput(true);
          dispatch(pushLand(json));
          dispatch(updateOneOwnerById(json.owner));
          dispatch(
            updateOneLocationById({ toUsed: true, address: json.address })
          );
        }
        if (!response.ok) {
          setBootstrap("alert alert-danger mt-2");
          setMsgError(json.message);
          setIsLoading(false);
          Swal.close();
        }
      } catch (error) {
        setIsLoading(false);
        setLocation("/nosignal");
        console.log(error);
        Swal.close();
        return [];
      }
    }
  };

  //update land function
  const updateLand = async (
    landId,
    title,
    description,
    location,
    city,
    rent,
    squarePerMeter,
    area,
    type,
    owner,
    censusTaker
  ) => {
    setIsLoading(true);
  
    if (
      title === undefined ||
      description === undefined ||
      location === undefined ||
      city === undefined ||
      squarePerMeter === undefined ||
      rent === undefined ||
      squarePerMeter === undefined ||
      area === undefined ||
      type === undefined
    ) {
      setBootstrap("alert alert-danger mt-2");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      title.trim().replace(/\s+/g, " ");
      description.trim().replace(/\s+/g, " ");
      try {
        const response = await fetch(
          `http://localhost:3600/api/lands/` + landId,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              title,
              description,
              location,
              city,
              rent,
              squarePerMeter,
              area,
              type,
              owner,
              censusTaker,
            }),
          }
        );

        const json = await response.json();
        if (response.ok) {
          setBootstrap(null);
          setMsgError(null);
          setIsLoading(false);
          setResetPropertyInput(true);
          dispatch(updateOneLandById(json.populatedLand));
          dispatch(updateOneOwnerById(json.populatedLand.owner));
          dispatch(updateOneOwnerById(json.unusedOwner));
        }
        if (!response.ok) {
          if (response.update === false) {
            dispatch(updateOneLandById(json.populatedProperty));
            Swal.fire(
              "Action refusé!",
              "Propriété accèpté par l'Administrateur",
              "danger"
            );
            return;
          }
          setBootstrap("alert alert-danger mt-2");
          setMsgError(json.message);
          setIsLoading(false);
          Swal.close();
        }
      } catch (error) {
        setIsLoading(false);
        setLocation("/nosignal");
        console.log(error);
        Swal.close();
        return [];
      }
    }
  };

  return {
    addLand,
    deleteProperty,
    addProperty,
    updateProperty,
    updateLand,
    resetPropertyInput,
    isLoading,
    msgError,
    bootstrapClassname,
    setMsgError,
    setBootstrap,
    setResetPropertyInput,
  };
};
