import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import { BsMapFill } from "react-icons/bs";
import PropertyDetails from "../components/PropertyDetails";
import { useEffect, useState } from "react";
import { useLoader } from "../hooks/useLoader";
import SquarePaging from "../components/SquarePaging";
import {
  updateIsSearch,
  setTotalPage,
  setNavbar,
  updateSearchCurrentPage,
  updateCurrentPage,
  setLandsSearchResult
} from "../redux/redux";
const LandListPage = () => {
  const dispatch = useDispatch();
  const navbar = useSelector((state) => state.navbar);
  const { loadLands, loadOwnersName, loadQuartersName } = useLoader();
  const censusTaker = useSelector((state) =>state.user._id);
  const lands= useSelector((state) => state.lands.lands);
  const ownersName = useSelector((state)=>state.owner[1].ownersName);
  const quartersName = useSelector((state) =>state.quarter[1].quartersName);
  const paginationIndex = useSelector((state) => state.pagination);
  const [isLoading, setIsLoading] = useState(null);
  const searchResult = useSelector((state) => state.lands.searchResult);
  const isSearch =paginationIndex[0].isSearch[3];
  const totalPage = paginationIndex[0].totalPage[3];
  const currentPage = paginationIndex[0].currentPage[3];
  const searchResultCurrentPage = paginationIndex[0].searchCurrentPage[3];
  //search states and filter it
  const searchStates = async (searchText) => {
    dispatch(updateIsSearch({ index: 3, isSearch: true }));
    //get matches to current text input
    let matches = lands.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.landNumber.toString().match(regex)
      );
    });
    if (searchText.length !== 0 && matches.length !== 0) {
      dispatch(updateSearchCurrentPage({ index: 3, newSearchCurrentPage: 1 }));
     dispatch(setLandsSearchResult(matches));
      dispatch(setTotalPage({ index: 3, subjectLength: matches.length }));
    }
    if (!searchText) {
      dispatch(updateIsSearch({ index: 3, isSearch: false }));
      dispatch(setLandsSearchResult(null));
      dispatch(setTotalPage({ index: 3, subjectLength: lands.length }));
    }
    if (matches.length === 0 && isSearch && searchText.length !== 0) {
      dispatch(setLandsSearchResult(null))
    }
  };
  useEffect(() => {
    const pageLoader = async () => {
      const landsPreload = await loadLands(censusTaker);
      if (landsPreload) {
        setIsLoading(null);
      }
      if(ownersName.length === 0 ){
        await loadOwnersName();
      }
      if(quartersName.length  === 0 ){
        await loadQuartersName();
      }
    };
    if (!lands && censusTaker && !isLoading) {
      setIsLoading(true);
      pageLoader();
    }
      if(lands && lands.length >= 0 && isLoading){
        setIsLoading(false);
      }
  }, [censusTaker, loadLands,isLoading, lands, paginationIndex, dispatch, ownersName, quartersName, loadQuartersName, loadOwnersName]);
  
  const handleInputFocus = () => {
    if (navbar) {
      dispatch(setNavbar(false)); // Hide the div when input is focused and it's currently visible
    }
  };
  const handleBlur = (e) => {
    if (!navbar) {
      dispatch(setNavbar(true)); // show the div when input is focused and it's currently visible
    }
  };
  useEffect(() => {
    if (searchResult) {
      dispatch(setTotalPage({ index: 3, subjectLength: searchResult.length }));
      if(totalPage !== 0){
      if(searchResultCurrentPage > totalPage){
        dispatch(updateSearchCurrentPage({index: 3, newSearchCurrentPage:totalPage}));
      }}
    }
    if(!searchResult && lands && lands.length !== 0){
      dispatch(setTotalPage({index: 3, subjectLength: lands.length}));
      if(totalPage !== 0){
      if(currentPage > totalPage){
        dispatch(updateCurrentPage({index: 3, newCurrentPage:totalPage}));
      }
    }}
    if(!isSearch){
    if (paginationIndex[0].currentPage[3] !== 1) {
      const element = document.getElementById("prodisplay");
      if (element) {
        element.scrollIntoView();
      }
    }}
    if(isSearch){
      if (paginationIndex[0].searchCurrentPage[3] !== 1) {
        const element = document.getElementById("prodisplay");
        if (element) {
          element.scrollIntoView();
        }}
    }
  }, [dispatch, searchResult, isSearch, searchResultCurrentPage, totalPage, currentPage, paginationIndex, lands]);
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
            <Link className="btn btn-outline-primary" to="/property">
              Maison
            </Link>
            {"  "}
            <Link className="btn btn-primary" to="/land">
              Terrain
            </Link>
          </center>
          <div className="bottom">
            <div className="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 Entrer un numéro de terrain"
                id="search-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={(e)=>handleBlur(e)}
              />
              <Link to="/addingLandPage">
                <center>
                  <a
                    href="/addingLandPage"
                    style={{ height: "100%", paddingTop: "10px" }}
                    className="btn btn-primary"
                  >
                    <BsMapFill />
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
                    paginationIndex[1].startIndex[3],
                    paginationIndex[1].endIndex[3]
                  )
                  .map((property) => (
                    <PropertyDetails
                      key={property._id}
                      property={property}
                      type="lands"
                    />
                  ))}
              <hr></hr>
              {searchResult && isSearch && (
                <SquarePaging index={3} linkKey="/property" />
              )}
            </div>

            <div>
              {lands &&
                !isSearch &&
                lands
                  .slice(
                    paginationIndex[1].startIndex[3],
                    paginationIndex[1].endIndex[3]
                  )
                  .map((property) => (
                    <PropertyDetails
                      key={property._id}
                      property={property}
                      type="lands"
                    />
                  ))}
              <hr></hr>
              {lands && !isSearch && (
                <SquarePaging index={3} linkKey="/land" />
              )}
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default LandListPage;
