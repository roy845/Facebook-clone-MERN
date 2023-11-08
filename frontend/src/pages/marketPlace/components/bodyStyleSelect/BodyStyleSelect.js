import MenuItem from "@mui/material/MenuItem";
import { bodyStyleArray } from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";

const BodyStyleSelect = () => {
  const { bodyStyle, setBodyStyle } = useVehicles();
  const handleTypeChange = (event) => {
    setBodyStyle(event.target.value);
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
        label="Body style"
        value={bodyStyle}
        onChange={handleTypeChange}
      >
        {bodyStyleArray.map((bodyStyle, index) => (
          <MenuItem key={index} value={bodyStyle}>
            {bodyStyle}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default BodyStyleSelect;
