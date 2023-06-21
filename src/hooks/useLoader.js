import { useDispatch } from "react-redux";
import { setLikedPropreties, setBooking, setOwner, setLocation, setProperties } from "../redux/redux";

export const useLoader = () => {
  //redux
  const dispatch = useDispatch();

  // Load liked properties
  const loadLikes = async (userId) => {
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
  };

    // Load liked properties
    const loadBooking = async (userId) => {
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
    };
    // Load liked properties
    const loadOwnersName = async () => {
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
        return json;
      }
    };
    
    
    const loadOwners = async () => {
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
    };
    
    const loadQuartersName = async () => {
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
        return json;
      }
    };
    const loadLocationsName = async () => {
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
        return json;
      }
    };

    const loadLocations = async () => {
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
        console.log("the result is ", json);
        dispatch(setLocation(json));
        return json;
      }
    };
    
    const loadProperties = async () => {
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
    };
    

  return { loadLikes, loadBooking, loadOwnersName, loadLocationsName ,loadOwners, loadQuartersName, loadProperties, loadLocations };
};

