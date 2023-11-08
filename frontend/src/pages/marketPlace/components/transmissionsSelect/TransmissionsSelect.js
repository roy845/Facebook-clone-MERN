import MenuItem from "@mui/material/MenuItem";
import { transmissions } from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const TransmissionsSelect = () => {
  const { transmission, setTransmission } = useVehicles();
  const handleTypeChange = (event) => {
    setTransmission(event.target.value);
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
        label="Transmission"
        value={transmission}
        onChange={handleTypeChange}
      >
        {transmissions.map((transmission, index) => (
          <MenuItem key={index} value={transmission}>
            {transmission}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default TransmissionsSelect;
