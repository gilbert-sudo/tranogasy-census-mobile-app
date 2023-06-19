import { useLocation } from "wouter";

export const useProperty = () => {

  const [location, setLocation] = useLocation();

  const getProperties = async () => {
    try {
      const response = await fetch('https://vast-erin-monkey-cape.cyclic.app/api/properties',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const json = await response.json();
      return json;
    } catch (error) {
      setLocation("/nosignal")
      console.log(error);
      return [];
    }
  };
  return { getProperties };
};
