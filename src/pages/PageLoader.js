import { useLocation } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, setLoader } from "../redux/redux";

const PageLoader = () => {
  //redux
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Log the last user
    const fetchLastUser = async () => {
      if (!user) {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
          dispatch(setUser(localUser.client));
        }
        // Delay dispatching "done" by 5 seconds
        setTimeout(() => {
          setLocation("/property");
          dispatch(setLoader("done"));
        }, 2500);
      }
    };
    fetchLastUser();
    console.log(location);
  }, [dispatch, user, setLocation, location]);

  // Render the main content
  return (
    <div>
      <div className="logo-loader"></div>
      <div className="page-loader"></div>
    </div>
  );
};

export default PageLoader;
