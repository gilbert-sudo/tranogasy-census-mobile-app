import { Link } from "wouter";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
const OwnerDetails = ({ owner }) => {
  const date = new Date(owner.created_at);
  const censusTaker = useSelector((state) => state.user._id);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return (
    <div id={owner._id} className="d-flex justify-content-between align-items-center border border-secondary py-2 border-right-0 border-bottom-0  border-left-0">
      <div className="d-flex flex-row align-items-center">
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
      <div className="dots">
        {censusTaker === owner.censusTaker._id?(<Link
          to={`/edit-owner/${owner._id}/${owner.fullName}${
            owner.location ? "/" + owner.location.address : ""
          }/${owner.phone1}/${+owner.phone2 ? owner.phone2 : ""}`}
        >
          <FaUserEdit />
        </Link>):null}
      </div>
    </div>
  );
};
export default OwnerDetails;
