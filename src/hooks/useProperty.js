import { useLocation } from "wouter";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  pushProperty,
  pushLand,
  updateOneLandById,
  updateOnePropertyById,
  deleteOneLandById,
  deleteOnePropertyById
} from "../redux/redux";
import { useDispatch} from "react-redux";
export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetPropertyInput, setResetPropertyInput] = useState(false);
  const dispatch = useDispatch();
  const [,setLocation] = useLocation();
  // const censusTaker = useSelector((state) => state.user._id);
  //add house function
  const addProperty = async (
    title,
    description,
    address,
    city,
    price,
    rent,
    bedrooms,
    bathrooms,
    area,
    type,
    owner,
    censusTaker
  ) => {
    setIsLoading(true);
    console.log(
      title,
      description,
      address,
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
    if (
      title === undefined ||
      description === undefined ||
      address === undefined ||
      city === undefined ||
      price === undefined ||
      rent === undefined ||
      bedrooms === undefined ||
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
            bedrooms,
            bathrooms,
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
          dispatch(pushProperty(json));
          console.log("the pushed is ", json);
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

  // update house function
  const updateProperty = async (
    propertyId,
    title,
    description,
    address,
    city,
    price,
    rent,
    bedrooms,
    bathrooms,
    area,
    type,
    owner,
    censusTaker
  ) => {
    setIsLoading(true);
    if (
      title === undefined ||
      description === undefined ||
      address === undefined ||
      city === undefined ||
      price === undefined ||
      rent === undefined ||
      bedrooms === undefined ||
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
              bedrooms,
              bathrooms,
              area,
              type,
              owner,
              censusTaker
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          setBootstrap(null);
          setMsgError(null);
          setIsLoading(false);
          setResetPropertyInput(true);
          dispatch(updateOnePropertyById(json));
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
  const deleteProperty = async (propertyId, propertyType) => {
    setIsLoading(true);
    Swal.fire({
      text: "En êtes-vous sûr?",
      showCancelButton: true,
      confirmButtonText: '<span class="bold-text">OK</span>',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-secondary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      didRender: () => {
        const confirmButton = Swal.getConfirmButton();
        // Set styles for the buttons
        confirmButton.style.marginRight = '100px'; // Adjust the value as per your spacing requirements
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:3600/api/${propertyType}/${propertyId}`,
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
            setBootstrap(null);
            setMsgError(null);
            setIsLoading(false);
            if(propertyType === "properties"){
            dispatch(deleteOnePropertyById(propertyId));
          }else if(propertyType === "lands"){
            dispatch(deleteOneLandById(propertyId))
          }
            // Show success message after deletion
            Swal.fire(
              'Supprimé!',
              'Propriété supprimé avec succès',
              'success'
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
    console.log(
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
    );
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
      setBootstrap("alert alert-danger");
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
    console.log(
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
    );
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
      setBootstrap("alert alert-danger");
      setMsgError("Veuilléz remplir toutes les champs correctemment");
      setIsLoading(false);
    } else {
      console.log("the type is ", type);
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
          dispatch(updateOneLandById(json));
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
