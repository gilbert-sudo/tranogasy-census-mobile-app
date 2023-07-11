// import { faLocationPen } from "@fortawesome/free-solid-svg-icons";
import { MdEditLocationAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "wouter";
import Swal from 'sweetalert2';

const LocationDetails = ({ location }) => {
  const censusTaker = useSelector((state) => state.user._id);
  const handleLocationClick = () => {
    
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
  };

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
          <Link to={`/edit-location/${location._id}`}>
            <center>
              <a
                href={`/edit-location/${location._id}`}
                style={{ height: "100%", paddingTop: "10px" }}
                className="btn btn-success"
              >
                <MdEditLocationAlt />
              </a>
            </center>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default LocationDetails;
