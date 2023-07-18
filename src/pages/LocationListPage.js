import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import LocationDetails from "../components/LocationDetails";
import { useEffect, useState } from "react";
import SquarePaging from "../components/SquarePaging";
import {
  setTotalPage,
  setNavbar,
  updateIsSearch,
  updateSearchCurrentPage,
  setLocationSearchResult,
  setUser,
  setLoader,
  updateCurrentPage
} from "../redux/redux";
import { Link } from "wouter";
import { MdAddLocationAlt } from "react-icons/md";
const LocationListPage = () => {
  const user = useSelector((state) => state.user);
  const { loadLocations, loadLands, loadProperties } = useLoader();
  const locations = useSelector((state) => state.location[0].locations);
  const dispatch = useDispatch();
  const paginationIndex = useSelector((state) => state.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const searchResult = useSelector((state) => state.location[2].searchResult);
  const isSearch = paginationIndex[0].isSearch[2];
  const totalPage = paginationIndex[0].totalPage[2];
  const currentPage = paginationIndex[0].currentPage[2];
  const searchResultCurrentPage = paginationIndex[0].searchCurrentPage[2];
  const navbar = useSelector((state) => state.navbar);
  //search states and filter it
  const searchStates = async (searchText) => {
    dispatch(updateIsSearch({ index: 2, isSearch: true }));
    //get matches to current text input
    let matches = locations.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return state.address.match(regex) || state.locationLink.match(regex);
    });
    if (searchText.length !== 0 && matches.length !== 0) {
      dispatch(updateSearchCurrentPage({ index: 2, newSearchCurrentPage: 1 }));
      dispatch(setLocationSearchResult(matches));
      dispatch(setTotalPage({ index: 2, subjectLength: matches.length }));
    }
    if (!searchText) {
      dispatch(updateIsSearch({ index: 2, isSearch: false }));
      dispatch(setLocationSearchResult(null));
      dispatch(setTotalPage({ index: 2, subjectLength:locations.length }));
    }

    if (matches.length === 0 && isSearch && searchText.length !== 0) {
      dispatch(setLocationSearchResult(null));
    }
  };

  useEffect(() => {
    if (!user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        dispatch(setUser(localUser.censusTaker));
        dispatch(setLoader("done"));
      }
    }
    const pageLoader = async () => {
      const locationsPreLoad = await loadLocations();
      if (locationsPreLoad) {
        setIsLoading(null);
      }
    };
    if (!locations) {
      setIsLoading(true);
      pageLoader();
    }
    if(locations && locations.length >= 0){
      setIsLoading(false)
    }
  }, [
    loadLocations,
    loadLands,
    loadProperties,
    locations,
    navbar,
    setIsLoading,
    paginationIndex,
    dispatch,
    user,
  ]);
  useEffect(() => {
    if (searchResult) {
      dispatch(setTotalPage({ index: 2, subjectLength: searchResult.length }));
      if (totalPage !== 0) {
        if (searchResultCurrentPage > totalPage) {
          dispatch(
            updateSearchCurrentPage({
              index: 2,
              newSearchCurrentPage: totalPage,
            })
          );
        }
      }
    }
    if (!searchResult && locations && locations.length !== 0) {
      dispatch(setTotalPage({ index: 2, subjectLength: locations.length }));
      if (totalPage !== 0) {
        if (currentPage > totalPage) {
          dispatch(updateCurrentPage({ index: 2, newCurrentPage: totalPage }));
        }
      }
    }
    if (!isSearch) {
      if (paginationIndex[0].currentPage[2] !== 1) {
        const element = document.getElementById("prodisplay");
        if (element) {
          element.scrollIntoView();
        }
      }
    }
    if (isSearch) {
      if (paginationIndex[0].searchCurrentPage[2] !== 1) {
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
    locations,
    isSearch
  ]);
  //handle the vabar visibility

  const handleInputFocus = () => {
    if (navbar) {
      dispatch(setNavbar(false)); // Hide the div when input is focused and it's currently visible
    }
  };
  const handleBlur = () => {
    if (!navbar) {
      dispatch(setNavbar(true)); // show the div when input is focused and it's currently visible
    }
  };
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n\n   body{\n\n    background-color: #eeeff3;\n    font-family: "Poppins", sans-serif;\n    font-weight: 300;\n\n   }\n\n   .container{\n\n\n      display: flex;\n      align-items: center;\n      padding: 10px;\n\n   }\n\n\n   .card{\n\n      width: 100%;\n      \n      border-radius: 10px;  \n      border: none;\n\n   }\n\n   .top{\n\n      background-color: #eee;\n      padding: 10px;\n      padding-left: 20px;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n   }\n\n   .bottom{\n     \n     padding:10px;\n     background-color: #fff;\n     border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n\n   }\n\n   .image{\n      \n       position: relative;\n\n   }\n\n   .image .type{\n     \n        position: absolute;\n    left: 49px;\n    bottom: 0;\n    background: #fff;\n    height: 30px;\n    width: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n\n   }\n\n   .line-height{\n\n        line-height: 20px;\n   }\n\n   .live{\n\n          height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: green;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n\n   }\n\n   .l-now{\n\n    font-size: 12px;\n   }\n\n\n   .dots{\n     \n           height: 10px;\n   margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n   }',
        }}
      />
      <div className="container mt-5">
        <div className="card">
          <div className="bottom">
            <div class="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 Entrer une adresse"
                id="search-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
              />
              <Link to="/create-location">
                <center>
                  <a
                    href="/create-location"
                    style={{ height: "100%", paddingTop: "10px" }}
                    className="btn btn-primary"
                  >
                    <MdAddLocationAlt />
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
                    paginationIndex[1].startIndex[2],
                    paginationIndex[1].endIndex[2]
                  )
                  .map((location) => (
                    <LocationDetails key={location._id}  location={location} />
                  ))}
              <hr></hr>
              {searchResult && isSearch && (
                <SquarePaging index={2} linkKey="/location-list" />
              )}
            </div>

            <div>
              {locations &&
                !isSearch &&
                locations
                  .slice(
                    paginationIndex[1].startIndex[2],
                    paginationIndex[1].endIndex[2]
                  )
                  .map((location) => (
                    <LocationDetails key={location._id}  location={location} />
                  ))}
              <hr></hr>
              {locations && !isSearch && (
                <SquarePaging index={2} linkKey="/location-list" />
              )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListPage;
