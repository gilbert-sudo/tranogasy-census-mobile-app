import { setGoogleLogin, setUser } from "../redux/redux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "wouter";
import axios from "axios";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  const googleLogin = useSelector((state) => state.googleLogin);
  console.log(location);

  const logout = () => {
    if (googleLogin.googleLogin === true) {
      try {
        const url = `https://tranogasy-api.onrender.com/connexion/logout`;
        axios.get(url, { withCredentials: true }).then((response) => {
          if (response.data.msg) {
            localStorage.removeItem("user");
            dispatch(setGoogleLogin({ googleLogin: null }));
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    //remove user from localStorage
    localStorage.removeItem("user");

    //update the user redux state
    dispatch(setGoogleLogin({ googleLogin: null }));
    setLocation("/login");
    dispatch(setUser(null));
  };

  return { logout };
};
