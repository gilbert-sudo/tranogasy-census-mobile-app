import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, updateOneLocationById } from "../redux/redux";
import { useLocation as useLocationFromWouter} from "wouter";
export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [setLocation] = useLocationFromWouter();
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
            "https://vast-erin-monkey-cape.cyclic.app/api/Location",
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
          }
        } catch (error) {
          setIsLoading(false);
          setLocation("/nosignal");
          console.log(error);
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
          `https://vast-erin-monkey-cape.cyclic.app/api/Location/${locationId}`,
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
          console.log(result);
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
          }
        } catch (error) {
          setIsLoading(false);
          setLocation("/nosignal");
          console.log(error);
          return [];
        }
  };
  return {
    createLocation,
    updateLocation,
    isLoading,
    msgError,
    bootstrapClassname,
    resetLocationInput,
    setMsgError,
    setBootstrap
  };
};