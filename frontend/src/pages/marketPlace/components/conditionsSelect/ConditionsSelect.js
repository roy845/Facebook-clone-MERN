import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { useItems } from "../../../../context/items/ItemsContext";
import { conditions } from "../../../../context/items/ItemsConstants";

function ConditionsSelect() {
  const { selectedCondition, setSelectedCondition } = useItems();

  const handleOptionChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      style={{ width: "320px", marginBottom: "10px" }}
      select
      label="Condition"
      value={selectedCondition}
      onChange={handleOptionChange}
    >
      {conditions.map((condition) => (
        <MenuItem key={condition} value={condition}>
          {condition}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ConditionsSelect;
