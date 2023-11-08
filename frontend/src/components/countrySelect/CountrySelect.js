import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import useCountries from "../../hooks/useCountries";

function CountrySelect({ setCountry, setShowCities }) {
  const countries = useCountries();
  const [loadedCountries, setLoadedCountries] = useState([]);

  useEffect(() => {
    // Load a limited number of countries initially
    const initialLoad = countries.slice(0, 10); // Change the number as needed
    setLoadedCountries(initialLoad);
  }, [countries]);

  const handleChange = (event) => {
    setCountry(event.target.value.toLowerCase());
    setShowCities(true);
  };

  const loadMoreCountries = () => {
    const currentlyLoadedCount = loadedCountries.length;
    const remainingCountries = countries.slice(
      currentlyLoadedCount,
      currentlyLoadedCount + 10
    ); // Change the number as needed
    setLoadedCountries([...loadedCountries, ...remainingCountries]);
  };

  return (
    <FormControl sx={{ width: "100%", textAlign: "center" }}>
      <InputLabel id="country-label">Select a Country</InputLabel>
      <Select
        labelId="country-label"
        id="country-select"
        onChange={handleChange}
        sx={{ width: "100%", marginTop: "10px" }}
      >
        {loadedCountries.map((country, index) => (
          <MenuItem key={index} value={country.name}>
            <img src={country.flag} alt={`${country.name} flag`} width="20" />
            {country.name}
          </MenuItem>
        ))}
      </Select>
      {loadedCountries.length < countries.length && (
        <button onClick={loadMoreCountries}>Load More Countries</button>
      )}
    </FormControl>
  );
}

export default CountrySelect;
