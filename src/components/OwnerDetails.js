import { Link } from "wouter";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useOwner } from "../hooks/useOwner";

const OwnerDetails = ({owner }) => {
  const censusTaker = useSelector((state) => state.user._id);
  const {deleteOwner} = useOwner();
  const date = new Date(owner.created_at);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    const handleClick = async () =>{
      deleteOwner(owner._id)
      }
  return (
    <div id={owner._id} className="d-flex justify-content-between align-items-center border border-secondary py-2 border-left-0 border-right-0">
      {censusTaker === owner.censusTaker._id && !owner.used?(<Link
          to={`/edit-owner/${owner._id}`}
        >
  <div className="d-flex flex-row align-items-center ">
        <div className="image">
          <img src="https://i.imgur.com/vxEWOFl.png" alt="" width={40} />
        </div>
        <div className="d-flex flex-column line-height ml-2">
          <span className="font-weight-bold">{owner.fullName}</span>
          <span className="ml-3">Tél : {owner.phone1}</span>
          <span className="ml-3">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {owner.phone2}
          </span>
          <span className="d-flex flex-row align-items-center l-now">
            <small className="live" />
            Ajouté le: {formattedDate}
          </span>
        </div>
      </div>
      </Link>):( <div className="d-flex flex-row align-items-center ">
        <div className="image">
          <img src="https://i.imgur.com/vxEWOFl.png" alt="" width={40} />
        </div>
        <div className="d-flex flex-column line-height ml-2">
          <span className="font-weight-bold">{owner.fullName}</span>
          <span className="ml-3">Tél : {owner.phone1}</span>
          <span className="ml-3">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {owner.phone2}
          </span>
          <span className="d-flex flex-row align-items-center l-now">
            <small className="live" />
            Ajouté le: {formattedDate}
          </span>
        </div>
      </div>)} 
      <div>
      {!owner.used && censusTaker === owner.censusTaker._id ? (
               <button
               onClick={handleClick}
               className="btn btn-danger delete-button"
             >
               <FaTrash />
             </button>
        ) : null}
      </div>
    </div>
  );
};
export default OwnerDetails;
