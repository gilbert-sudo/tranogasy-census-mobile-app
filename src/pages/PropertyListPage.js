
import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import { FaUserPlus } from "react-icons/fa";
import PropertyDetails from "../components/PropertyDetails";
import { useEffect, useState } from "react";
import { useLoader } from "../hooks/useLoader";
import SquarePaging from "../components/SquarePaging";
import {
  updateIsSearch,
  setTotalPage,
  updateSearchCurrentPage,
  setNavbar,
} from "../redux/redux";

const PropertyListPage = () => {
  const dispatch = useDispatch();
  const { loadProperties, loadLocationsName, loadOwnersName, loadQuartersName } = useLoader();
  const properties = useSelector((state) => state.properties);
  const locationsName = useSelector((state) =>state.location[1].locationsName);
  const ownersName = useSelector((state)=>state.owner[1].ownersName);
  const quartersName = useSelector((state) =>state.quarter[1].quartersName);
  const navbar = useSelector((state) => state.navbar);
  const paginationIndex = useSelector((state) => state.pagination);
  const [searchResult, setSearchResult] = useState(properties);
  const [isLoading, setIsLoading] = useState(null);
  const searchStates = (searchText) => {
    const matches = properties.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.owner.fullName.match(regex) ||
        state.title.match(regex) ||
        state.description.match(regex) ||
        state.censusTaker.username.match(regex) ||
        state.city.quarter.match(regex) ||
        state.address.match(regex)
      );
    });

    if (searchText.length !== 0) {
      dispatch(updateSearchCurrentPage({ index: 0, newSearchCurrentPage: 1 }));
      dispatch(updateIsSearch({ index: 0, isSearch: true }));
      setSearchResult(matches);
      dispatch(setTotalPage({ index: 0, subjectLength: matches.length }));
    } else {
      dispatch(updateIsSearch({ index: 0, isSearch: false }));
      setSearchResult(properties);
      dispatch(setTotalPage({ index: 0, subjectLength: properties.length }));
    }

    if (matches.length === 0) {
      setSearchResult(null);
      dispatch(updateIsSearch({ index: 0, isSearch: false }));
    }
  };

  const handleInputFocus = () => {
    if (navbar) {
      dispatch(setNavbar(false));
    }
  };

  const handleBlur = () => {
    if (!navbar) {
      dispatch(setNavbar(true));
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      const propertiesPreload = await loadProperties();
      if (propertiesPreload) {
        setIsLoading(null);
      }
      setSearchResult(propertiesPreload);
      if(locationsName.length <0 ){
        await loadLocationsName();
      }
      if(ownersName.length <0 ){
        await loadOwnersName();
      }
      if(quartersName.length <0 ){
        await loadQuartersName();
      }
    };

    if (properties.length === 0) {
      setIsLoading(true);
      pageLoader();
    }

  
  }, [ loadProperties, properties, ownersName, locationsName, quartersName, loadLocationsName, loadQuartersName, loadOwnersName]);

  useEffect(() => {
    if (searchResult) {
      dispatch(setTotalPage({ index: 0, subjectLength: searchResult.length }));
    }

    if (paginationIndex[0].currentPage[0] !== 1) {
      const element = document.getElementById("prodisplay");
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [dispatch, paginationIndex, searchResult]);

  return (
    <>
  <div className="container mt-5 mb-5">
        <div className="card">
          <center className="mt-2">
            <Link className="btn btn-primary" to="/property">
              Maison
            </Link>
            {"  "}
            <Link className="btn btn-outline-primary" to="/land">
              Terrain
            </Link>
          </center>
          <div className="bottom">
            <div className="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 Entrer un mot clé"
                id="owner-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
              />
              <Link to="/adding">
                <center>
                  <a
                    href="/ht"
                    style={{ height: "100%", paddingTop: "10px" }}
                    className="btn btn-primary"
                  >
                    <FaUserPlus />
                  </a>
                </center>
              </Link>
            </div>
            {isLoading && (
              <div className="mt-4 ml-3 d-flex justify-content-center">
                <img
                  src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/loading/Double_Ring-1s-200px__1_.gif?updatedAt=1683022393415"
                  alt=""
                />
              </div>
            )}
            {!searchResult ? (
              <div className="mt-4 ml-3">
                <h6>Aucun résultat trouvé</h6>
              </div>
            ) : (
              <div>
                {searchResult &&
                  searchResult
                    .slice(
                      paginationIndex[1].startIndex[0],
                      paginationIndex[1].endIndex[0]
                    )
                    .map((property) => (
                      <PropertyDetails
                        key={property._id}
                        property={property}
                        type="home"
                      />
                    ))}
                <hr></hr>
                {searchResult && <SquarePaging index={0} linkKey="/property" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
