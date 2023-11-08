import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { typeOfRent } from "../../../../context/property/PropertyConstants";
import { useProperty } from "../../../../context/property/PropertyContext";

const PropertyTypesSelect = () => {
  const { type, setType } = useProperty();
  const handleTypeChange = (event) => {
    setType(event.target.value);
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
        label="Type of property to rent"
        value={type}
        onChange={handleTypeChange}
      >
        {typeOfRent.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default PropertyTypesSelect;
