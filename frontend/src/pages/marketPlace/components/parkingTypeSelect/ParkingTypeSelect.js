import MenuItem from "@mui/material/MenuItem";
import { transmissions } from "../../../../context/vehicles/VehiclesConstants";
import { useVehicles } from "../../../../context/vehicles/VehiclesContext";
import { TextField } from "@mui/material";
import { useProperty } from "../../../../context/property/PropertyContext";
import { parkingTypeArray } from "../../../../context/property/PropertyConstants";

const ParkingTypeSelect = () => {
  const { parkingType, setParkingType } = useProperty();
  const handleTypeChange = (event) => {
    setParkingType(event.target.value);
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
        label="Parking Type"
        value={parkingType}
        onChange={handleTypeChange}
      >
        {parkingTypeArray.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default ParkingTypeSelect;
