import { useState, useEffect } from "react";
import { useProfil } from "../hooks/useProfil";
import { useRoute} from "wouter";
const EmailUpdating = ()=>{
    const [email, setEmail] = useState("");
    const [isValidReset, setIsValidReset] = useState(false);
    const [match, params] = useRoute("/update-email/:censusTakerId");
  const censusTakerId = match ? params.censusTakerId : null;
    const {
      updateProfilEmail,
      resetProfilInput,
      setResetProfilInput,
      isLoading,
      msgError,
      bootstrapClassname,
    } = useProfil();
  
    const resetAllInputs = () => {
      setEmail("");
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      updateProfilEmail(censusTakerId, email);
      setIsValidReset(true);
    };
    
    useEffect(() => {
      if (resetProfilInput && isValidReset) {
        resetAllInputs();
        setIsValidReset(false);
        setResetProfilInput(false);
      }
    }, [resetProfilInput, isValidReset, setResetProfilInput]);
return(
    <div className="mt-5">
    <form onSubmit={handleSubmit}
    action=""
    id="form4"
  >
    <div className="form-group px-3 ">
    <label htmlFor="password">Changer votre email</label>
      <div className="input-group">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Votre adresse email"
          className="form-control pr-2"
        />
      </div>
    </div>
    <button  style={{width:"289px"}} disabled={isLoading} className="btn btn-primary btn-block m-3" type="submit">
          sauvegarder
        </button>
  </form>
  {msgError && <div className={bootstrapClassname}>{msgError}</div>}
  </div>
)
}
export default EmailUpdating;