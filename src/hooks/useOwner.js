import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOwner , updateOneOwnerById} from "../redux/redux";
export const useOwner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [bootstrapClassname, setBootstrap] = useState(null);
  const [resetOwnerInput, setResetOwnerInput] = useState(false); // new state
  const censusTaker = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  //redux

  const createOwner = async (fullName, locationId, phoneOne, phoneTwo) => {
    setIsLoading(true);
    setMsgError(null);
    setResetOwnerInput(false);
    console.log("the location id is", locationId);
    if(locationId === undefined){
      setIsLoading(false);
      setBootstrap("alert alert-warning");
      setMsgError("veuillez selectionner un addresse suggéré ")
      return
    }
    const fullname = fullName.trim().replace(/\s{2,}/g, ' ').replace(/(^|\s)\S/g, function(match) {
      return match.toUpperCase(); // capitalize first letter of each word
    });
    const phone1 = phoneOne.trim().replace(/\s/g, "");
    if (!fullname.length || !phone1.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "Le nom complet et le prémier numéro de téléphone sont obligatoires."
      );
      setIsLoading(false);
      return;
    }
    if(phoneTwo){
    var phone2 = phoneTwo.replace(/\s/g, "");
    }

    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber1 = phone1;
    const phoneNumber2 = phone2;
    if (
      phoneNumberRegex.test(phoneNumber1) ||
      phoneNumberRegex.test(phoneNumber2)
    ) {
      if (
        phoneNumber1.length === 10 ||
        phoneNumber1.length === 9 ||
        phoneNumber2.length === 10 ||
        phoneNumber2.length === 9
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/owners`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                fullname,
                locationId,
                phone1,
                phone2,
                censusTaker
              }),
            }
          );

          const result = await response.json();
          console.log(result);
          if (result.success === true) {
            setBootstrap(null);
            setMsgError(null);
            setIsLoading(false);
            setResetOwnerInput(true);
            dispatch(addOwner(result.newOwner));
          } else if (result.errors.fullname) {
            let msg = result.errors.fullname 
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = result.error;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          let msg = "Une erreur s'est produite lors de l'envoi du message.";
          let bootstrapClass = "alert alert-danger";
          setBootstrap(bootstrapClass);
          setMsgError(msg);
          setIsLoading(false);
        }
      } else {
        // Phone number has invalid length
        let msg = "votre numéro de téléphone n'est pas validé.";
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      }
    } else {
      // Phone number has invalid format
      let msg = "votre numéro de téléphone n'est pas validé.";
      let bootstrapClass = "alert alert-danger";
      setBootstrap(bootstrapClass);
      setMsgError(msg);
      setIsLoading(false);
    }
  };

  
  const updateOwner = async (ownerId, fullName, locationId, phoneNumberOne, phoneNumberTwo) => {
    setIsLoading(true);
    setMsgError(null);
    setResetOwnerInput(false);
    if (!fullName.length || !phoneNumberOne.length) {
      setBootstrap("alert alert-warning");
      setMsgError(
        "Le nom complet et le prémier numéro de téléphone sont obligatoires."
      );
      setIsLoading(false);
      return;
    }
    const fullname = fullName.trim().replace(/\s{2,}/g, ' ').replace(/(^|\s)\S/g, function(match) {
      return match.toUpperCase(); // capitalize first letter of each word
    });
    const phone1 = phoneNumberOne.replace(/\s/g, "");
    if(phoneNumberTwo){
    var phone2 = phoneNumberTwo.replace(/\s/g, "");
    }
    const phoneNumberRegex = /^(03[2,3,4,8])(\d{7})$|^(3[2,3,4,8])(\d{7})$/;
    const phoneNumber1 = phone1;
    const phoneNumber2 = phone2;
    if (
      phoneNumberRegex.test(phoneNumber1) ||
      phoneNumberRegex.test(phoneNumber2)
    ) {
      if (
        phoneNumber1.length === 10 ||
        phoneNumber1.length === 9 ||
        phoneNumber2.length === 10 ||
        phoneNumber2.length === 9
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROXY}/api/owners/update-owner/${ownerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                fullname,
                locationId,
                phone1,
                phone2,
              }),
            }
          );

          const result = await response.json();
          if (result.success === true) {
            setBootstrap(null);
            setMsgError(null);
            setIsLoading(false);
            setResetOwnerInput(true);
            dispatch(updateOneOwnerById(result.modifiedOwner));
            return;
          } else if (result.errors) {
            let msg = result.errors.fullname || result.errors.existingOwner ;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          } else {
            let msg = result.error;
            let bootstrapClass = "alert alert-danger";
            setBootstrap(bootstrapClass);
            setMsgError(msg);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          let msg = "Une erreur s'est produite lors de l'envoi du message.";
          let bootstrapClass = "alert alert-danger";
          setBootstrap(bootstrapClass);
          setMsgError(msg);
          setIsLoading(false);
        }
      } else {
        // Phone number has invalid length
        let msg = "votre numéro de téléphone n'est pas validé.";
        let bootstrapClass = "alert alert-danger";
        setBootstrap(bootstrapClass);
        setMsgError(msg);
        setIsLoading(false);
      }
    } else {
      // Phone number has invalid format
      let msg = "votre numéro de téléphone n'est pas validé.";
      let bootstrapClass = "alert alert-danger";
      setBootstrap(bootstrapClass);
      setMsgError(msg);
      setIsLoading(false);
    }
  };
  return {
    createOwner,
    updateOwner,
    isLoading,
    msgError,
    bootstrapClassname,
    resetOwnerInput,
    setResetOwnerInput,
    setMsgError, 
    setBootstrap
  };
};
