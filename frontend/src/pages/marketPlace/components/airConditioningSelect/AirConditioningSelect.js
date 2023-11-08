import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { useProperty } from "../../../../context/property/PropertyContext";
import { airConditioningArray } from "../../../../context/property/PropertyConstants";

const AirConditioningSelect = () => {
  const { airConditioning, setAirConditioning } = useProperty();
  const handleTypeChange = (event) => {
    setAirConditioning(event.target.value);
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
        label="Air conditioning"
        value={airConditioning}
        onChange={handleTypeChange}
      >
        {airConditioningArray.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default AirConditioningSelect;
