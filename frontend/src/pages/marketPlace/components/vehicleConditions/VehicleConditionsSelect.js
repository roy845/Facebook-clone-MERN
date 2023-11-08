import MenuItem from "@mui/material/MenuItem";
import {
  bodyStyleArray,
  vehicleConditions,
} from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const VehicleConditionsSelect = () => {
  const { condition, setCondition } = useVehicles();
  const handleTypeChange = (event) => {
    setCondition(event.target.value);
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
        label="Vehicle condition"
        value={condition}
        onChange={handleTypeChange}
      >
        {vehicleConditions.map((condition, index) => (
          <MenuItem key={index} value={condition}>
            {condition}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default VehicleConditionsSelect;
