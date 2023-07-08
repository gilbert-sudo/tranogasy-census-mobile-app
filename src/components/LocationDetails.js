
// import { faLocationPen } from "@fortawesome/free-solid-svg-icons";
import { MdEditLocationAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link} from "wouter";
const LocationDetails = ({ location }) => {
  const censusTaker = useSelector((state) => state.user._id);
  const handleLocationClick = () => {
    window.location.href = location.locationLink; // Redirect to location.locationLink
  };

  return (
    <div className="row">
    <div className="list-group-item list-group-item-action py-3 lh-tight">
      <div className="d-flex w-100 align-items-center justify-content-between  overflow-x-auto">
        <strong className="mb-1">{location.address}</strong>{" "}
        {censusTaker === location.censusTaker._id?(<Link to={`/edit-location/${location._id}`}>
          <MdEditLocationAlt />
        </Link>):null} 
      </div>
      <div className="col-10 mb-1 small text-uppercase overflow-x-auto">
      <strong><u><li className="list-group-item" style={{color: "#17a2b8"}} onClick={handleLocationClick}>{location.locationLink}</li></u></strong>
         </div>
    </div>
    </div>
  );
};
export default LocationDetails;
