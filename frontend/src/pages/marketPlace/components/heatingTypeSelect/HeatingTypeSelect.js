import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { useProperty } from "../../../../context/property/PropertyContext";
import { heatingTypeArray } from "../../../../context/property/PropertyConstants";

const HeatingTypeSelect = () => {
  const { heatingType, setHeatingType } = useProperty();
  const handleTypeChange = (event) => {
    setHeatingType(event.target.value);
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
        label="Heating type"
        value={heatingType}
        onChange={handleTypeChange}
      >
        {heatingTypeArray.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default HeatingTypeSelect;
