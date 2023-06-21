//import hooks
import { Link } from "wouter";
import { useProperty } from "../hooks/useProperty";
import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "../redux/redux";

//react icons
import { FaUserPlus } from "react-icons/fa";

const PropertyListPage = () => {
  const { getProperties } = useProperty();
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties);

  useEffect(() => {
    if (!properties.length) {
      const pageLoader = async () => {
        dispatch(setProperties(await getProperties()));
      };
      pageLoader();
    }
  }, [properties]);

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
          <div className="bottom">
            <div class="d-flex mb-2">
              <input
                className="form-control auto-input"
                placeholder="🔍 Addresse complet"
                id="owner-input"
                style={{ width: "100%" }} // add style prop
              />
              <Link to="/adding" className="btn btn-primary ml-1">
                <FaUserPlus />
              </Link>
            </div>
            <div>
              {properties &&
                properties.map((property) => <div>{property.title}</div>)}
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListPage;
