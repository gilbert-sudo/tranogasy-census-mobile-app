import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import { BsHouseAddFill } from "react-icons/bs";
import PropertyDetails from "../components/PropertyDetails";
import { useEffect, useState } from "react";
import { useLoader } from "../hooks/useLoader";
import SquarePaging from "../components/SquarePaging";
import {
  updateIsSearch,
  setTotalPage,
  updateSearchCurrentPage,
  updateCurrentPage,
  setNavbar,
  setSearchResult,
} from "../redux/redux";

const PropertyListPage = () => {
  const dispatch = useDispatch();
  const {
    loadProperties,
    loadLocationsName,
    loadOwnersName,
    loadQuartersName,
  } = useLoader();
  const properties = useSelector((state) => state.properties.properties);
  const censusTaker = useSelector((state) =>state.user._id);
  const locationsName = useSelector((state) => state.location[1].locationsName);
  const ownersName = useSelector((state) => state.owner[1].ownersName);
  const quartersName = useSelector((state) => state.quarter[1].quartersName);
  const navbar = useSelector((state) => state.navbar);
  const paginationIndex = useSelector((state) => state.pagination);
  const searchResult = useSelector((state) => state.properties.searchResult);
  const isSearch = paginationIndex[0].isSearch[0];
  const totalPage = paginationIndex[0].totalPage[0];
  const currentPage = paginationIndex[0].currentPage[0];
  const searchResultCurrentPage = paginationIndex[0].searchCurrentPage[0];
  const [isLoading, setIsLoading] = useState(null);

  const searchStates = (searchText) => {
    dispatch(updateIsSearch({ index: 0, isSearch: true }));
    const matches = properties.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.propertyNumber.toString().match(regex) ||
        state.address.match(regex)
      );
    });

    if (searchText.length !== 0 && matches.length !== 0) {
      dispatch(updateSearchCurrentPage({ index: 0, newSearchCurrentPage: 1 }));
      dispatch(setSearchResult(matches));
      dispatch(setTotalPage({ index: 0, subjectLength: matches.length }));
    }
    if (!searchText) {
      dispatch(updateIsSearch({ index: 0, isSearch: false }));
      dispatch(setSearchResult(null));
      dispatch(setTotalPage({ index: 0, subjectLength: properties.length }));
    }

    if (matches.length === 0 && isSearch && searchText.length !== 0) {
      dispatch(setSearchResult(null));
    }
  };

  const handleInputFocus = () => {
    if (navbar) {
      dispatch(setNavbar(false));
    }
  };

  const handleBlur = (e) => {
    if (!navbar) {
      dispatch(setNavbar(true));
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      const propertiesPreload = await loadProperties(censusTaker);
      if (propertiesPreload) {
        setIsLoading(null);
      }
      if (locationsName.length === 0) {
        await loadLocationsName();
      }
      if (ownersName.length === 0) {
        await loadOwnersName();
      }
      if (quartersName.length === 0) {
        await loadQuartersName();
      }
    };

    if (!properties && censusTaker) {
      setIsLoading(true);
      pageLoader();
    }
    if(properties && properties.length >= 0){
        setIsLoading(false);
      }
    
  }, [
    loadProperties,
    properties,
    ownersName,
    locationsName,
    quartersName,
    loadLocationsName,
    loadQuartersName,
    loadOwnersName,
    censusTaker
  ]);

  useEffect(() => {
    if (searchResult) {
      dispatch(setTotalPage({ index: 0, subjectLength: searchResult.length }));
      if (totalPage !== 0) {
        if (searchResultCurrentPage > totalPage) {
          console.log("the total page uhgg is", totalPage);
          console.log("totueiu", currentPage, totalPage);
          dispatch(
            updateSearchCurrentPage({
              index: 0,
              newSearchCurrentPage: totalPage,
            })
          );
        }
      }
    }
    if (!searchResult && properties && properties.length !== 0) {
      dispatch(setTotalPage({ index: 0, subjectLength: properties.length }));
      if (totalPage !== 0) {
        if (currentPage > totalPage) {
          console.log("the total page uhgg is", totalPage);
          console.log("totueiu", currentPage, totalPage);
          dispatch(updateCurrentPage({ index: 0, newCurrentPage: totalPage }));
        }
      }
    }
    if (!isSearch) {
      if (paginationIndex[0].currentPage[0] !== 1) {
        const element = document.getElementById("prodisplay");
        if (element) {
          element.scrollIntoView();
        }
      }
    }
    if (isSearch) {
      if (paginationIndex[0].searchCurrentPage[0] !== 1) {
        const element = document.getElementById("prodisplay");
        if (element) {
          element.scrollIntoView();
        }
      }
    }
  }, [
    dispatch,
    searchResult,
    searchResultCurrentPage,
    totalPage,
    currentPage,
    paginationIndex,
    properties,
    isSearch
  ]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n\n   body{\n\n    background-color: #eeeff3;\n    font-family: "Poppins", sans-serif;\n    font-weight: 300;\n\n   }\n\n   .container{\n\n\n      display: flex;\n      align-items: center;\n      padding: 10px;\n\n   }\n\n\n   .card{\n\n      width: 100%;\n      \n      border-radius: 10px;  \n      border: none;\n\n   }\n\n   .top{\n\n      background-color: #eee;\n      padding: 10px;\n      padding-left: 20px;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n   }\n\n   .bottom{\n     \n     padding:10px;\n     background-color: #fff;\n     border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n\n   }\n\n   .image{\n      \n       position: relative;\n\n   }\n\n   .image .type{\n     \n        position: absolute;\n    left: 49px;\n    bottom: 0;\n    background: #fff;\n    height: 30px;\n    width: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n\n   }\n\n   .line-height{\n\n        line-height: 20px;\n   }\n\n   .live{\n\n          height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: green;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n\n   }\n\n   .l-now{\n\n    font-size: 12px;\n   }\n\n\n   .dots{\n     \n           height: 10px;\n   margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n   }',
        }}
      />
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
                placeholder="🔍 addresse complète ou un numéro de maison "
                id="search-input"
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
                    <BsHouseAddFill />
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
            {!searchResult && isSearch && (
              <div className="mt-4 ml-3">
                <h6>Aucun résultat trouvé</h6>
              </div>
            )}
            <div>
              {searchResult &&
                isSearch &&
                searchResult
                  .slice(
                    paginationIndex[1].startIndex[0],
                    paginationIndex[1].endIndex[0]
                  )
                  .map((property) => (
                    <PropertyDetails
                      key={property._id}
                      property={property}
                      type="properties"
                    />
                  ))}
              <hr></hr>
              {searchResult && isSearch && (
                <SquarePaging index={0} linkKey="/property" />
              )}
            </div>

            <div>
              {properties &&
                !isSearch &&
                properties
                  .slice(
                    paginationIndex[1].startIndex[0],
                    paginationIndex[1].endIndex[0]
                  )
                  .map((property) => (
                    <PropertyDetails
                      key={property._id}
                      property={property}
                      type="properties"
                    />
                  ))}
              <hr></hr>
              {properties && !isSearch && (
                <SquarePaging index={0} linkKey="/property" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
