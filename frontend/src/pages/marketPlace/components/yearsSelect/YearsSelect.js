import MenuItem from "@mui/material/MenuItem";
import {
  vehicleType,
  years,
} from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const YearsSelect = () => {
  const { year, setYear } = useVehicles();
  const handleTypeChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <TextField
        style={{
          width: "320px",
          marginBottom: "10px",
          marginRight: "10px",
          marginTop: "10px",
        }}
        variant="outlined"
        select
        label="Year"
        value={year}
        onChange={handleTypeChange}
      >
        {years.map((year, index) => (
          <MenuItem key={index} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default YearsSelect;
