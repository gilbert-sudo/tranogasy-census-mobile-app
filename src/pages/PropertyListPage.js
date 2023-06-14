import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {FaUserPlus } from "react-icons/fa";
import PropertyDetails from "../components/PropertyDetails";
import { useEffect, useState } from "react";
import { useLoader } from "../hooks/useLoader";
import SquarePaging from "../components/SquarePaging";
import { updateActiveLink, updateIsSearch, setTotalPage} from "../redux/redux";
const PropertyListPage = () => {
  const dispatch = useDispatch();
  const { loadProperties } = useLoader();
  const properties = useSelector((state) => state.properties);
  const paginationIndex = useSelector((state) => state.pagination);
  const [searchResult, setSearchResult] = useState(properties);
  const [isLoading, setIsLoading] = useState(null);
  //set the total of the page
  if (searchResult) {
    dispatch(setTotalPage({index: 0, subjectLength: searchResult.length}));
  }
  if (paginationIndex[0].currentPage[0] !== 1) {
    // scroll to top of the page
    const element = document.getElementById("prodisplay");
    if (element) {
      element.scrollIntoView();
    }
  }
  //search states and filter it
  const searchStates = async (searchText) => {
    //get matches to current text input
    let matches = properties.filter((state) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return (
        state.fullName.match(regex) ||
        state.phone1.match(regex) ||
        state.phone2.match(regex)
      );
    });
    if (searchText.length !== 0) {
      dispatch(updateIsSearch({index: 0, isSearch:true}))
      setSearchResult(matches);
      dispatch(setTotalPage({index: 0, subjectLength: matches.length}));
    }
    if (searchText.length === 0) {
      dispatch(updateIsSearch({index: 0, isSearch:false}));
      setSearchResult(properties);
      dispatch(setTotalPage({index: 0, subjectLength: properties.length}));
    }
    if (matches.length === 0) {
      setSearchResult(null);
      dispatch(updateIsSearch({index: 0, isSearch:false}));
    }
    if (paginationIndex[0].currentPage[0] !== 1) {
      // scroll to top of the page
      const element = document.getElementById("prodisplay");
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const pageLoader = async () => {
      const propertiesPreoad = await loadProperties();
      if (propertiesPreoad) {
        setIsLoading(null);
      }
      setSearchResult(propertiesPreoad);
    };
    if (!properties.length) {
      setIsLoading(true);
      pageLoader();
    }
    if(paginationIndex[2].activeLink !=="/"){
      dispatch(updateActiveLink("/"))
    }
  }, [loadProperties, properties, paginationIndex, dispatch,]);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '::-webkit-scrollbar {\n                                  width: 8px;\n                                }\n                                /* Track */\n                                ::-webkit-scrollbar-track {\n                                  background: #f1f1f1; \n                                }\n                                 \n                                /* Handle */\n                                ::-webkit-scrollbar-thumb {\n                                  background: #888; \n                                }\n                                \n                                /* Handle on hover */\n                                ::-webkit-scrollbar-thumb:hover {\n                                  background: #555; \n                                } @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n\n   body{\n\n    background-color: #eeeff3;\n    font-family: "Poppins", sans-serif;\n    font-weight: 300;\n\n   }\n\n   .container{\n\n\n      display: flex;\n      align-items: center;\n      padding: 10px;\n\n   }\n\n\n   .card{\n\n      width: 100%;\n      \n      border-radius: 10px;  \n      border: none;\n\n   }\n\n   .top{\n\n      background-color: #eee;\n      padding: 10px;\n      padding-left: 20px;\n      border-top-right-radius: 10px;\n      border-top-left-radius: 10px;\n   }\n\n   .bottom{\n     \n     padding:10px;\n     background-color: #fff;\n     border-bottom-right-radius: 10px;\n      border-bottom-left-radius: 10px;\n\n   }\n\n   .image{\n      \n       position: relative;\n\n   }\n\n   .image .type{\n     \n        position: absolute;\n    left: 49px;\n    bottom: 0;\n    background: #fff;\n    height: 30px;\n    width: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: 50%;\n\n   }\n\n   .line-height{\n\n        line-height: 20px;\n   }\n\n   .live{\n\n          height: 10px;\n    width: 10px;\n    border-radius: 50%;\n    background: green;\n    margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n\n   }\n\n   .l-now{\n\n    font-size: 12px;\n   }\n\n\n   .dots{\n     \n           height: 10px;\n   margin-left: 1px;\n    display: flex;\n    margin-right: 5px;\n\n   }',
        }}
      />
      <div className="container pt-4 mb-5">
        <div className="card mt-3">
          <div className="bottom">
            <div class="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 Addresse complet"
                id="owner-input"
                style={{ width: "100%" }} // add style prop
                onInput={(e) => searchStates(e.target.value)}
              />
              <Link to="/adding" className="btn btn-primary ml-1">
                <FaUserPlus />
              </Link>
            </div>
            {isLoading && (
              <div className="mt-4 ml-3 d-flex justify-content-center">
                <img src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/loading/Double_Ring-1s-200px__1_.gif?updatedAt=1683022393415" alt="" />
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
                      <PropertyDetails key={property._id} property={property} />
                    ))}
                <hr></hr>
                {searchResult && <SquarePaging index = {0} linkKey = ""/>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
