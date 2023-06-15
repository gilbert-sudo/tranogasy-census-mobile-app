export const useProperty = () => {
  const getProperties = async () => {
    try {
      const response = await fetch('https://tranogasy-api.onrender.com/api/properties',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { getProperties };
};
