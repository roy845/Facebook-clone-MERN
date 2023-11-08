import { useEffect, useState } from "react";

const useCities = (country) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    const fetchCitiesByCountry = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: country }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const citiesData = data.data;
          setCities(citiesData);
          return cities;
        } else {
          throw new Error(`Failed to retrieve data for ${country}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    fetchCitiesByCountry();
  }, [country]);

  return cities;
};

export default useCities;
