//import { useBooking } from "../hooks/useBooking";
import { Link } from "wouter";
import { FaTrash } from "react-icons/fa";

function PropertyDetails({ property, type }) {
  const date = new Date(property.created_at);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="card border border-secondary mt-2">
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
              Ajouté le: <strong> {formattedDate}</strong>
            </p>
            <p
              className="text-success mb-0 mr-2 grade"
              style={{ fontSize: "3vw" }}
            >
              <strong>{property.pending ? "...en attente" : ""}</strong>
            </p>
          </div>
          <div className="row px-3">
            <h3 className="font-weight-bold" style={{ fontSize: "3vw" }}>
              {property.title}
            </h3>
          </div>
          <div className="line" />
          <div className="row px-3 mt-3">
            <h5 className="text-secondary mb-1" style={{ fontSize: "3vw" }}>
              Prix du {property.type === "rent" ? "loyer" : "vente"}
            </h5>
          </div>
          <div className="row px-3">
            <h2
              className="text-success mb-1 font-weight-bold"
              style={{ fontSize: "4vw" }}
            >
              {property.type === "sale"
                ? property.price.toLocaleString("en-US")
                : property.rent.toLocaleString("en-US")}{" "}
              <small>{property.type === "sale" ? "AR" : "AR/mois"}</small>
            </h2>
          </div>

          <div className="d-flex flex-row row px-3 mt-2 d-flex justify-content-end">
            <button className="btn btn-primary mr-1">
              <Link
                to={
                  type === "home"
                    ? "/edit-property/" + property._id
                    : "/edit-land/" + property._id
                }
              >
                <p
                  className="rating mb-0 px-2"
                  style={{ fontSize: "3vw" }}
                  // onClick={(e) => cancelMessage(booking._id)}
                >
                  <strong className="text-white">Éditer</strong>
                </p>
              </Link>
            </button>
            <button className="btn btn-danger">
              <p
                className="rating mb-0 px-2"
                style={{ fontSize: "3vw" }}
                // onClick={(e) => cancelMessage(booking._id)}
              >
                <strong className="text-white"><FaTrash/></strong>
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
