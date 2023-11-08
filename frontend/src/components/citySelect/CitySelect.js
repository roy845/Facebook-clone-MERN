import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import useCities from "../../hooks/useCities";

function CitySelect({ country, setCity }) {
  const [loadedCities, setLoadedCities] = useState([]);
  const cities = useCities(country);

  useEffect(() => {
    // Load a limited number of cities initially
    const initialLoad = cities.slice(0, 10); // Change the number as needed
    setLoadedCities(initialLoad);
  }, [cities]);

  // Handle city selection
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Function to load more cities
  const loadMoreCities = () => {
    const currentlyLoadedCount = loadedCities.length;
    const remainingCities = cities.slice(
      currentlyLoadedCount,
      currentlyLoadedCount + 10
    ); // Change the number as needed
    setLoadedCities([...loadedCities, ...remainingCities]);
  };

  return (
    <FormControl sx={{ width: "100%", textAlign: "center" }}>
      <InputLabel id="city-label">Select a City</InputLabel>
      <Select
        labelId="city-label"
        id="city-select"
        onChange={handleCityChange}
        sx={{ width: "100%", marginTop: "10px" }}
      >
        {loadedCities.map((city, index) => (
          <MenuItem key={index} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
      {loadedCities.length < cities.length && (
        <button onClick={loadMoreCities}>Load More Cities</button>
      )}
    </FormControl>
  );
}

export default CitySelect;
