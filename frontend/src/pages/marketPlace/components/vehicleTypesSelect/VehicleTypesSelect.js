import MenuItem from "@mui/material/MenuItem";
import { vehicleType } from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const VehicleTypesSelect = () => {
  const { type, setType } = useVehicles();
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <TextField
        style={{ width: "320px", marginBottom: "10px", marginRight: "10px" }}
        variant="outlined"
        select
        label="Vehicle type"
        value={type}
        onChange={handleTypeChange}
      >
        {vehicleType.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default VehicleTypesSelect;
