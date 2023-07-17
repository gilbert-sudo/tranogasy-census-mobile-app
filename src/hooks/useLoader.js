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
  setOwnersName,
} from "../redux/redux";

export const useLoader = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  // Load liked properties
  const loadLikes = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3600/api/favorite/${userId}`,
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
        `http://localhost:3600/api/messages/${userId}`,
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
        `http://localhost:3600/api/owners/all-owners-name`,
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
        `http://localhost:3600/api/owners/all-owners`,
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
        `http://localhost:3600/api/cities/all-quarter-name`,
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
      const response = await fetch(`http://localhost:3600/api/location/names`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "aplication/json",
        },
      });
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
      const response = await fetch(`http://localhost:3600/api/location`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "aplication/json",
        },
      });
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

  const loadProperties = async (censusTaker) => {
    try {
      const response = await fetch(`http://localhost:3600/api/properties`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "aplication/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        let properties = json.filter(
          (property) =>
            property.censusTaker._id === censusTaker &&
            (property.status === "pending" || property.status === "canceled")
        );
        dispatch(setProperties(properties));
        return json;
      }
    } catch (error) {
      console.log(error);
      console.log(location);
      setLocation("/nosignal");
    }
  };
  const loadLands = async (censusTaker) => {
    try {
      const response = await fetch(`http://localhost:3600/api/lands`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "aplication/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        let properties = json.filter(
          (property) =>
            property.censusTaker._id === censusTaker &&
            (property.status === "pending" || property.status === "canceled")
        );
        dispatch(setLands(properties));
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
