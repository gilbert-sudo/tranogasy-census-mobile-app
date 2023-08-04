import { useDispatch, useSelector } from "react-redux";
import { Link } from "wouter";
import { FaUserPlus } from "react-icons/fa";
import { useLoader } from "../hooks/useLoader";
import OwnerDetails from "../components/OwnerDetails";
import { useEffect, useState } from "react";
import SquarePaging from "../components/SquarePaging";
import {
  updateIsSearch,
  setTotalPage,
  updateSearchCurrentPage,
  updateCurrentPage,
  setNavbar,
  setOwnerSearchResult,

} from "../redux/redux";

const OwnerListPage = () => {
  const { loadOwners, loadOwnersName, loadProperties, loadLands, loadLocationsName} = useLoader();
  const locationsName = useSelector((state) =>state.location[1].locationsName);
  const ownersName = useSelector((state)=>state.owner[1].ownersName);
  const owners = useSelector((state) => state.owner[0].owners);
  const navbar = useSelector((state) => state.navbar);
  const dispatch = useDispatch();
  const paginationIndex = useSelector((state) => state.pagination);
  const searchResult = useSelector((state) => state.owner[2].searchResult);
  const isSearch = paginationIndex[0].isSearch[1];
  const totalPage = paginationIndex[0].totalPage[1];
  const currentPage = paginationIndex[0].currentPage[1];
  const searchResultCurrentPage = paginationIndex[0].searchCurrentPage[1];
  const [isLoading, setIsLoading] = useState(null);
  //set the total of the page
  //search states and filter it
  const searchStates = async (searchText) => {
    //get matches to current text input
    dispatch(updateIsSearch({ index: 1, isSearch: true }));
    let matches = owners.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.fullName.match(regex) ||
        (state.phone1 ? state.phone1.match(regex) : "") ||
        (state.phone2 ? state.phone2.match(regex) : "")
      );
    });
    if (searchText.length !== 0 && matches.length !== 0) {
      dispatch(updateSearchCurrentPage({ index: 1, newSearchCurrentPage: 1 }));
      dispatch(setOwnerSearchResult(matches));
      dispatch(setTotalPage({ index: 1, subjectLength: matches.length }));
    }
    if (!searchText) {
      dispatch(updateIsSearch({ index: 1, isSearch: false }));
      dispatch(setOwnerSearchResult(null));
      dispatch(setTotalPage({ index: 1, subjectLength: owners.length }));
    }
    if (matches.length === 0 && isSearch && searchText.length !== 0) {
      dispatch(setOwnerSearchResult(null));
    }
  };

  //handle the vabar visibility

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
    const pageLoader = async () => {
      const ownersPreoad = await loadOwners();
      if(locationsName.length ===0 ){
        await loadLocationsName();
      }
      if(ownersName.length ===0 ){
        await loadOwnersName();
      }
      if (ownersPreoad) {
        setIsLoading(null);
      }
    };
    if (!owners && !isLoading) {
      setIsLoading(true);
      pageLoader();
    }
    if(owners  && owners.length >= 0 && isLoading){
  setIsLoading(false)
    }
  }, [loadOwners, owners, isLoading, loadProperties, loadLands, paginationIndex, dispatch, ownersName, locationsName, loadLocationsName, loadOwnersName]);
  useEffect(() => {
    if (searchResult) {
      dispatch(setTotalPage({ index: 1, subjectLength: searchResult.length }));
      if (totalPage !== 0) {
        if (searchResultCurrentPage > totalPage) {
          dispatch(
            updateSearchCurrentPage({
              index: 1,
              newSearchCurrentPage: totalPage,
            })
          );
        }
      }
    }
    if (!searchResult && owners && owners.length !== 0) {
      dispatch(setTotalPage({ index: 1, subjectLength: owners.length }));
      if (totalPage > 0) {
        if (currentPage > totalPage) {
          dispatch(updateCurrentPage({ index: 1, newCurrentPage: totalPage }));
        }
      }
    }
    if (!isSearch) {
      if (paginationIndex[0].currentPage[1] !== 1) {
        const element = document.getElementById("prodisplay");
        if (element) {
          element.scrollIntoView();
        }
      }
    }
    if (isSearch) {
      if (paginationIndex[0].searchCurrentPage[1] !== 1) {
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
    owners,
    isSearch
  ])
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
                placeholder="🔍 Nom ou téléphone complet"
                id="search-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={(e)=>handleBlur(e)}
              />
              <Link to="/create-owner">
                <center>
                  <a
                    href="/create-owner"
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
                    paginationIndex[1].startIndex[1],
                    paginationIndex[1].endIndex[1]
                  )
                  .map((owner) => (
                    <OwnerDetails key={owner._id} owner={owner} />
                  ))}
              <hr></hr>
              {searchResult && isSearch && (
                <SquarePaging index={1} linkKey="/owner-list" />
              )}
            </div>

            <div>
              {owners &&
                !isSearch &&
                owners
                  .slice(
                    paginationIndex[1].startIndex[1],
                    paginationIndex[1].endIndex[1]
                  )
                  .map((owner) => (
                    <OwnerDetails key={owner._id}   owner={owner} />
                  ))}
              <hr></hr>
              {owners && !isSearch && (
                <SquarePaging index={1} linkKey="/owner-list" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerListPage;
