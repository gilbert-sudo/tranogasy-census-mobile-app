import { Link, useRoute } from "wouter";
import { BiHome, BiUser, BiPlusCircle } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdNotListedLocation } from "react-icons/md";

//redux store
import { useSelector } from "react-redux";

/**
 * `Utility components
 */
const ActiveLink = (href, href1="", href2="", href3="") => {
  const [isActive] = useRoute(href);
  const [isActive1] = useRoute(href1);
  const [isActive2] = useRoute(href2);
  const [isActive3] = useRoute(href3);
  const LinkStyle = isActive || isActive1 || isActive2 || isActive3? { color: "#7cbd1e" } : { color: "#222B2A" };
  return LinkStyle;
};

const ShowNavbar = (isActive) => {
  const navBarStyle = isActive ? { display: "block" } : { display: "none" };
  return navBarStyle;
};

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navbar = useSelector((state) => state.navbar);
  return (
    <>
      {/*=============== HEADER ===============*/}
      <div className="header" id="header">
        <nav>
          <div className="navigation container p-3">
            <Link to="/" className="nav__logo">
              <trano style={{ color: "#7cbd1e" }}>Trano</trano>
              <gasy style={{ color: "#ec1c24" }}>Gasy</gasy>.
            </Link>
            <div className="nav__menu" id="nav-menu" style={ShowNavbar(navbar)}>
              <ul className="nav__list">
                <li className="nav__item mt-3">
                    <Link
                      to="/property"
                      className="nav__link"
                      style={ActiveLink("/property", "/land", "/edit-property/:ownerId", "/edit-land/:landId") || ActiveLink("/land")}
                    >
                      <BiHome className="nav__icon" />
                      <span className="nav__name">Acceuil</span>
                    </Link>
                </li>

                <li className="nav__item mt-3">
                  <Link
                    to="/owner-list"
                    className="nav__link"
                    style={ActiveLink("/owner-list", "/edit-owner/:ownerId")}
                  >
                    <HiOutlineUserGroup className="nav__icon" />
                    <span className="nav__name">Propriétaire</span>
                  </Link>
                </li>

                <li className="nav__item mt-3">
                  <Link
                    to="/adding"
                    className="nav__link"
                    style={ActiveLink("/Adding", "/AddingLandPage", "/create-owner", "/create-location")}
                  >
                    <BiPlusCircle className="nav__icon" />
                    <span className="nav__name">Ajouter</span>
                  </Link>
                </li>
                <li className="nav__item mt-3">
                  <Link
                    to="/location-list"
                    className="nav__link"
                    style={ActiveLink("/location-list", "/edit-location/:locationId")}
                  >
                    <MdNotListedLocation className="nav__icon" />
                    <span className="nav__name">Location</span>
                  </Link>
                </li>
                <li className="nav__item mt-3">
                  {user && (
                    <Link
                      to="/user"
                      className="nav__link"
                      style={ActiveLink("/user", "/update-fullName/:censusTakerId", "/update-email/:censusTakerId")}
                    >
                      <BiUser className="nav__icon" />
                      <span className="nav__name">Profile</span>
                    </Link>
                  )}
                  {!user && (
                    <Link
                      to="/login"
                      className="nav__link"
                      style={ActiveLink("/login")}
                    >
                      <BiUser className="nav__icon" />
                      <span className="nav__name">Connexion</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <img src="images/logo.png" alt="" className="nav__img" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
