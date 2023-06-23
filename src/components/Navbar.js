import { Link, useRoute } from "wouter";
import { BiHome, BiUser, BiPlusCircle } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdNotListedLocation } from "react-icons/md";

//redux store
import { useSelector } from "react-redux";

/**
 * `Utility components
 */
const ActiveLink = (href) => {
  const [isActive] = useRoute(href);
  const LinkStyle = isActive ? { color: "#7cbd1e" } : { color: "#222B2A" };
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
                      style={ActiveLink("/property")}
                    >
                      <BiHome className="nav__icon" />
                      <span className="nav__name">Acceuil</span>
                    </Link>
                </li>

                <li className="nav__item mt-3">
                  <Link
                    to="/owner-list"
                    className="nav__link"
                    style={ActiveLink("/owner-list")}
                  >
                    <HiOutlineUserGroup className="nav__icon" />
                    <span className="nav__name">Propriétaire</span>
                  </Link>
                </li>

                <li className="nav__item mt-3">
                  <Link
                    to="/adding"
                    className="nav__link"
                    style={ActiveLink("/adding")}
                  >
                    <BiPlusCircle className="nav__icon" />
                    <span className="nav__name">Ajouter</span>
                  </Link>
                </li>
                <li className="nav__item mt-3">
                  <Link
                    to="/location-list"
                    className="nav__link"
                    style={ActiveLink("/location-list")}
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
                      style={ActiveLink("/user")}
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
