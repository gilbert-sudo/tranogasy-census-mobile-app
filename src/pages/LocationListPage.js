import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../hooks/useLoader";
import LocationDetails from "../components/LocationDetails";
import { useEffect, useState } from "react";
import SquarePaging from "../components/SquarePaging";
import { setTotalPage, setNavbar,updateIsSearch, updateSearchCurrentPage } from "../redux/redux";
import { Link } from "wouter";
import { MdAddLocationAlt } from "react-icons/md";
const LocationListPage = () => {
  const { loadLocations} = useLoader();
  const locations = useSelector((state) => state.location[0].locations);
  const dispatch = useDispatch();
  const paginationIndex = useSelector((state) => state.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(locations);
  const navbar = useSelector((state) => state.navbar);

 
  //set the total of the page
  if (searchResult) {
    dispatch(setTotalPage({ index: 2, subjectLength: searchResult.length }));
  }
  if (paginationIndex[0].currentPage[2] !== 1) {
    // scroll to top of the page
    const element = document.getElementById("prodisplay");
    if (element) {
      element.scrollIntoView();
    }
  }
  //search states and filter it
  const searchStates = async (searchText) => {
    //get matches to current text input
    let matches = locations.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return state.address.match(regex) || state.locationLink.match(regex);
    });
    if (searchText.length !== 0) {
      dispatch(updateSearchCurrentPage({index: 2, newSearchCurrentPage: 1}));
      dispatch(updateIsSearch({index: 2, isSearch:true}));
      setSearchResult(matches);
      dispatch(setTotalPage({ index: 2, subjectLength: matches.length }));
    }
    if (searchText.length === 0) {
      dispatch(updateIsSearch({index: 2, isSearch:false}));
      setSearchResult(locations);
      dispatch(setTotalPage({ index: 2, subjectLength: locations.length }));
    }
    if (matches.length === 0) {
      setSearchResult(null);
      dispatch(updateIsSearch({index: 2, isSearch:false}));
    }
    if (paginationIndex[0].currentPage[2] !== 1) {
      // scroll to top of the page
      const element = document.getElementById("prodisplay");
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const pageLoader = async () => {
      const locationsPreLoad = await loadLocations();
      if (locationsPreLoad) {
        setIsLoading(null);
      }
      setSearchResult(locationsPreLoad);
    };
    if (!locations.length) {
      setIsLoading(true);
      pageLoader();
    }
  }, [loadLocations, locations, setIsLoading, paginationIndex, dispatch]);
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
      {/* <meta charSet="utf-8" /> */}
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* <title>Snippet - BBBootstrap</title> */}
      <link href="#" rel="stylesheet" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } body{\n    display:flex;\n    justify-content:center;\n    align-items:center;\n    background-color:#fff;\n}\n\n.wrapper{\n  margin-top:20px;\n margin-bottom:50px;\n}",
        }}
      />
       <div className="container mt-5">
        <div className="card">
          <div className="">
            <div class="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 addresse complet"
                id="owner-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
              />
              <Link to="/create-location">
                <center>
                  <a
                    href="#"
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
            {!searchResult ? (
              <div className="mt-4 ml-3">
                <h6>Aucun résultat trouvé</h6>
              </div>
            ) : (
              <div>
                {searchResult &&
                  searchResult
                    .slice(
                      paginationIndex[1].startIndex[2],
                      paginationIndex[1].endIndex[2]
                    )
                    .map((location) => (
                        <LocationDetails
                        key={location._id}
                        location={location}
                      />
                    ))}
                <hr></hr>
                {searchResult && <SquarePaging index={2} linkKey = "/location-list"/>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationListPage;
