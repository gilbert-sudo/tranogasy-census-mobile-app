import { Link, useRoute } from "wouter";
import { BiTask, BiUser, BiPlusCircle } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdNotListedLocation } from "react-icons/md";

//redux store
import { useDispatch, useSelector } from "react-redux";
import { setTotalPage,setLandsSearchResult, setLocationSearchResult, setSearchResult, setOwnerSearchResult, updateIsSearch } from "../redux/redux";
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
  const dispatch = useDispatch();
  const locationSearchResult =  useSelector((state)  => state.location[2].searchResult);
  const landsSearchResult = useSelector((state)  => state.lands.searchResult);
  const houseSearchResult  = useSelector((state)=> state.properties.searchResult);
  const ownerSearchResult = useSelector((state) => state.owner[2].searchResult);
  const pagination = useSelector((state) =>state.pagination);
  const isOwnerSearch = pagination[0].isSearch[1];
  const isLandSearch = pagination[0].isSearch[3];
  const isHouseSearch = pagination[0].isSearch[0];
  const isLocationSearch = pagination[0].isSearch[2];
  const owners = useSelector((state) => state.owner[0].owners);
  const locations = useSelector((state) => state.location[0].locations);
  const properties = useSelector((state) => state.properties.properties);
  const lands= useSelector((state) => state.lands.lands);
  const handleClick = async () => {
    const searchInput = document.getElementById("search-input");
    if(searchInput !== null){
      searchInput.value = "";
    }
    if(locationSearchResult && isLocationSearch){
    dispatch(setLocationSearchResult(null));
    dispatch(updateIsSearch({index:2, isSearch:false}));
    dispatch(setTotalPage({ index: 2, subjectLength: locations.length }));
  }
  if(ownerSearchResult && isOwnerSearch){
    dispatch(setOwnerSearchResult(null));
    dispatch(updateIsSearch({index:1, isSearch:false}));
    dispatch(setTotalPage({ index: 1, subjectLength: owners.length }));
  }
  if(landsSearchResult && isLandSearch){
    dispatch(setLandsSearchResult(null));
    dispatch(updateIsSearch({index:3, isSearch:false}));
    dispatch(setTotalPage({ index: 3, subjectLength: lands.length }));
  }
  if(houseSearchResult && isHouseSearch){
    dispatch(setSearchResult(null));
    dispatch(updateIsSearch({index:0, isSearch:false}))
    dispatch(setTotalPage({ index: 0, subjectLength: properties.length }));
  }}
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
                <li className="nav__item mt-3" onClick={handleClick}>
                    <Link
                      to="/property"
                      className="nav__link"
                      style={ActiveLink("/property", "/land", "/edit-property/:ownerId", "/edit-land/:landId") || ActiveLink("/land")}
                    >
                      <BiTask className="nav__icon" />
                      <span className="nav__name">Article</span>
                    </Link>
                </li>

                <li className="nav__item mt-3"  onClick={handleClick}>
                  <Link
                    to="/owner-list"
                    className="nav__link"
                    style={ActiveLink("/owner-list", "/edit-owner/:ownerId")}
                  >
                    <HiOutlineUserGroup className="nav__icon" />
                    <span className="nav__name">Proprio</span>
                  </Link>
                </li>

                <li className="nav__item mt-3"  onClick={handleClick}>
                  <Link
                    to="/adding"
                    className="nav__link"
                    style={ActiveLink("/Adding", "/AddingLandPage", "/create-owner", "/create-location")}
                  >
                    <BiPlusCircle className="nav__icon" />
                    <span className="nav__name">Ajouter</span>
                  </Link>
                </li>
                <li className="nav__item mt-3"  onClick={handleClick}>
                  <Link
                    to="/location-list"
                    className="nav__link"
                    style={ActiveLink("/location-list", "/edit-location/:locationId")}
                  >
                    <MdNotListedLocation className="nav__icon" />
                    <span className="nav__name">Loca</span>
                  </Link>
                </li>
                <li className="nav__item mt-3"  onClick={handleClick}>
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
