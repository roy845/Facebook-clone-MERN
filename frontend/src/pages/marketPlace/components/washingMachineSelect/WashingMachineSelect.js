import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { washingMachineArray } from "../../../../context/property/PropertyConstants";
import { useProperty } from "../../../../context/property/PropertyContext";

const WashingMachineSelect = () => {
  const { washingMachine, setWashingMachine } = useProperty();
  const handleTypeChange = (event) => {
    setWashingMachine(event.target.value);
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
        label="Washing machine/dryer"
        value={washingMachine}
        onChange={handleTypeChange}
      >
        {washingMachineArray.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default WashingMachineSelect;
