import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, deleteOneLocationById, updateOneLocationById } from "../redux/redux";
import { useLocation as useLocationFromWouter} from "wouter";
import Swal from "sweetalert2";
export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [,setLocation] = useLocationFromWouter();
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetLocationInput, setResetLocationInput] = useState(false); // new state
  const censusTaker = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  //redux

  const createLocation = async (inputedAddress, locationLink) => {
    setIsLoading(true);
    setMsgError(null);
    setResetLocationInput(false);
    const link = locationLink.replace(/\s/g, "");
    const address = inputedAddress.trim().replace(/\s{2,}/g, ' ');
    if (!address.length || !link.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "l'addresse et le lien sont obligatoires."
      );
      setIsLoading(false);
      return;
    }
        try {
          const response = await fetch(
            "http://localhost:3600/api/Location",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                address,
                link,
                censusTaker
              }),
            }
          );

          const result = await response.json();
          if (response.ok) {
            setBootstrap(null);
             setMsgError(null);
            setIsLoading(false);
            setResetLocationInput(true);
            dispatch(addLocation(result.newLocation));
            return;
          } 
          if (!response.ok) {
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(result.message);
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
  };

  
  const updateLocation = async (locationId, inputedAddress, locationLink) => {
    setIsLoading(true);
    setMsgError(null);
    setResetLocationInput(false);
    if (!inputedAddress.length || !locationLink.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "l'addresse et le lien sont obligatoires."
      );
      setIsLoading(false);
      return;
    }
    const link = locationLink.replace(/\s/g, "");
    const address = inputedAddress.trim().replace(/\s{2,}/g, ' ');
        try {  const response = await fetch(
          `http://localhost:3600/api/Location/${locationId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                address,
                link, 
                censusTaker
              }),
            }
          );

          const result = await response.json();
          if (response.ok) {
            setBootstrap(null);
            setMsgError(null);
            setIsLoading(false);
            setResetLocationInput(true);
            dispatch(updateOneLocationById(result.modifiedLocation));
          } 
          if (!response.ok) {
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(result.message);
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
  };

  
  const deleteLocation= async (locationId) => {
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
            `http://localhost:3600/api/location/${locationId}`,
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
            dispatch(deleteOneLocationById(locationId));
            // Show success message after deletion
            Swal.fire(
              'Supprimé!',
              'location supprimé avec succès',
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
    })
  };
  return {
    createLocation,
    updateLocation,
    deleteLocation,
    isLoading,
    msgError,
    bootstrapClassname,
    resetLocationInput,
    setMsgError,
    setBootstrap,
    setResetLocationInput
  };
};
