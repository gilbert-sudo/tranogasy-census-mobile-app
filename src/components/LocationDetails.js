// import { faLocationPen } from "@fortawesome/free-solid-svg-icons";
import { MdEditLocationAlt } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link} from "wouter";
import {useLocation} from "../hooks/useLocation";
import Swal from 'sweetalert2';

const LocationDetails = ({ location}) => {
  const censusTaker = useSelector((state) => state.user._id);
  const {deleteLocation} = useLocation();
  const handleLocationClick = () => {
    if(!location.used && censusTaker === location.censusTaker._id ){
    // Display the alert
    Swal.fire({
      title: "Chargement",
      text: "S'il vous plaît, patientez...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    window.location.href = location.locationLink; // Redirect to location.locationLink
  }
  return
  };
  const handleClick = async () =>{
    deleteLocation(location._id)
    }
  return (
    <div className="row">
      <div className="d-flex justify-content-center list-group-item list-group-item-action py-3 lh-tight">
        <div
          onClick={handleLocationClick}
          className="d-flex w-100 align-items-center justify-content-between  overflow-x-auto"
        >
          <strong className="mb-1">{location.address}</strong>{" "}
        </div>
        {censusTaker === location.censusTaker._id ? (
          <Link to={!location.used?`/edit-location/${location._id}`:null}>
            <center>
            <button
              className="btn btn-success edit-button"
            >
              <span  className="text-white">
                <MdEditLocationAlt/>
                </span>
              </button>
            </center>
          </Link>
        ) : null}
        <div className="ml-1">
           {!location.used && censusTaker === location.censusTaker._id ? (
               <button
              onClick={handleClick}
               className="btn btn-danger delete-button"
             >
               <FaTrash />
             </button>
        ) : null}
        </div>
      </div>
    </div>
  );
};
export default LocationDetails;
