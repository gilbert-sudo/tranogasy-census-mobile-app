import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useProfil } from "../hooks/useProfil";
import { Link, useRoute} from "wouter";
const FullNameUpdating = () => {
  const [fullName, setFullName] = useState("");
  const [isValidReset, setIsValidReset] = useState(false);
  const [match, params] = useRoute("/update-fullname/:censusTakerId");
  const censusTakerId = match ? params.censusTakerId : null;
  const {
    updateProfilFullName,
    resetProfilInput,
    setResetProfilInput,
    isLoading,
    msgError,
    bootstrapClassname,
  } = useProfil();
  const resetAllInputs = () => {
    setFullName("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfilFullName(censusTakerId, fullName);
    setIsValidReset(true);
  };
  
  useEffect(() => {
    if (resetProfilInput && isValidReset) {
      resetAllInputs();
      setIsValidReset(false);
      setResetProfilInput(false);
    }
  }, [resetProfilInput, isValidReset, setResetProfilInput]);
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group px-3">
          <label htmlFor="name">Votre nom complet</label>
          <div className="input-group">
            <button className="btn btn-outline-primary" type="button">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <input
              type="text"
              id="name"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>
        <button style={{width:"290px"}} disabled={isLoading} className="btn btn-primary btn-block m-3" type="submit">
          sauvegarder
        </button>
      </form>
      {msgError && <div className={bootstrapClassname}>{msgError}</div>}
    </div>
  );
};
export default FullNameUpdating;
