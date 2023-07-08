import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import {
  setLikedPropreties,
  setBooking,
  setOwner,
  setProperties,
  setLands,
  setLocation as setLocationList,
  setQuartersName,
  setLocationsName,
  setOwnersName
} from "../redux/redux";

export const useLoader = () => {
  //redux
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  // Load liked properties
  const loadLikes = async (userId) => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/favorite/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
     
      if (response.ok) {
        dispatch(setLikedPropreties(json));
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  // Load liked properties
  const loadBooking = async (userId) => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/messages/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
      
      if (response.ok) {
        dispatch(setBooking(json));
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };
  // Load liked properties
  const loadOwnersName = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/owners/all-owners-name`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
     
      if (response.ok) {
        dispatch(setOwnersName(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  const loadOwners = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/owners/all-owners`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
      
      if (response.ok) {
        dispatch(setOwner(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  const loadQuartersName = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/cities/all-quarter-name`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
     
      if (response.ok) {
        dispatch(setQuartersName(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };
  const loadLocationsName = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/location/names`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
      
      if (response.ok) {
        dispatch(setLocationsName(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  const loadLocations = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/location`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
      
      if (response.ok) {
        dispatch(setLocationList(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  const loadProperties = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/properties`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
     
      if (response.ok) {
        dispatch(setProperties(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };
  const loadLands = async () => {
    try {
      const response = await fetch(
        `https://vast-erin-monkey-cape.cyclic.app/api/lands`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "aplication/json",
          },
        }
      );
      const json = await response.json();
      
     
      if (response.ok) {
        dispatch(setLands(json));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };

  return {
    loadLikes,
    loadBooking,
    loadOwnersName,
    loadLocationsName,
    loadOwners,
    loadQuartersName,
    loadProperties,
    loadLands,
    loadLocations,
  };
};
