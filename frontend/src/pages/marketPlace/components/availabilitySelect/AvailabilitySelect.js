import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { useItems } from "../../../../context/items/ItemsContext";
import { availabilities } from "../../../../context/items/ItemsConstants";

function AvailabilitySelect() {
  const { selectedAvailability, setSelectedAvailability } = useItems();

  const handleOptionChange = (event) => {
    setSelectedAvailability(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      style={{ width: "320px" }}
      select
      label="Availability"
      value={selectedAvailability}
      onChange={handleOptionChange}
    >
      {availabilities.map((availability) => (
        <MenuItem key={availability} value={availability}>
          {availability}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AvailabilitySelect;
