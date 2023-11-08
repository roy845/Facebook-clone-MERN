import MenuItem from "@mui/material/MenuItem";
import { fuelTypes } from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const FuelTypeSelect = () => {
  const { fuelType, setFuelType } = useVehicles();
  const handleTypeChange = (event) => {
    setFuelType(event.target.value);
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
        label="Fuel type"
        value={fuelType}
        onChange={handleTypeChange}
      >
        {fuelTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default FuelTypeSelect;
