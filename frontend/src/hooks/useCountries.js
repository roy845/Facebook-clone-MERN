import { useEffect, useState } from "react";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
        }));
        setCountries(countriesData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return countries;
};

export default useCountries;
