//import { useBooking } from "../hooks/useBooking";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PropertyDetails({ property }) {
  // const { cancelBooking } = useBooking();

  // const cancelMessage = (messageId) => {
  //   cancelBooking(messageId);
  // };
  const censusTaker = useSelector((state) => state.user._id);
  return (
    <div className="card border-0">
      <div className="row set-p justify-content-center">
        <div className="col px-0">
            <img
              className="image"
              src={property.images.length > 0 ? property.images[0].url : ""}
              alt={property.images.length > 0 ? property.images[0].alt : ""}
            />
        </div>
        <div className="col">
          <div className="row px-3 mt-2">
            <p className="rating mb-0 px-2 mr-3" style={{ fontSize: "2.5vw" }}>
              <strong>10/10/23</strong>
            </p>
            <p
              className="text-success mb-0 mr-2 grade"
              style={{ fontSize: "3vw" }}
            >
              <strong>...en atente</strong>
            </p>
          </div>
          <div className="row px-3">
            <h3 className="font-weight-bold" style={{ fontSize: "3vw" }}>
              {property.title}
            </h3>
          </div>
          {/* <div class="row px-3 mb-2 mt-2">
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
              <span class="fa fa-star text-warning mr-1"></span>
          </div> */}
          {/* <div class="row px-3">
              <h5 class="mb-1">1 bedroom &middot; 1 living &middot; 2 beds</h5>
          </div>
          <div class="row px-3">
              <p class="">Mitte, Berlin &middot; 2.6 km from center</p>
          </div> */}
          <div className="line" />
          <div className="row px-3 mt-3">
            <h5 className="text-secondary mb-1" style={{ fontSize: "3vw" }}>
              Prix du loyer
            </h5>
          </div>
          <div className="row px-3">
            <h2
              className="text-success mb-1 font-weight-bold"
              style={{ fontSize: "4vw" }}
            >
              {property.rent.toLocaleString("en-US")} <small>AR/mois</small>
            </h2>
          </div>
         
            <div className="row px-3 mt-2 d-flex justify-content-end">
            {censusTaker === property.censusTaker._id?(<Link to={"/edit-property/" + property._id}>
              <p
                className="rating mb-0 px-2"
                style={{ fontSize: "3vw", backgroundColor: "#ec1c24" }}
                // onClick={(e) => cancelMessage(booking._id)}
              >
                <strong>Editer</strong>
              </p>
               </Link>):null}
            </div>
         
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
