import { setGoogleLogin, setUser } from "../redux/redux";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();
  console.log(location);

  const logout = () => {
    //remove user from localStorage
    localStorage.removeItem("user");

    //update the user redux state
    dispatch(setGoogleLogin({ googleLogin: null }));
    setLocation("/login");
    dispatch(setUser(null));
  };

  return { logout };
};
