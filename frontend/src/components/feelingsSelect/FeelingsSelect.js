import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useFeelings from "../../hooks/useFeelings";
import { FormControl, InputLabel } from "@mui/material";

const FeelingsSelect = ({ setFeeling }) => {
  const { feelings, loading, error } = useFeelings();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFeelingChange = (event) => {
    setFeeling(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%", textAlign: "center" }}>
      <InputLabel id="city-label">Select a feeling</InputLabel>
      <Select onChange={handleFeelingChange} label="Select a Feeling" fullWidth>
        {feelings.map((feeling) => (
          <MenuItem
            key={feeling.id}
            value={feeling.emoji + "-" + feeling.feeling}
          >
            {feeling.emoji} - {feeling.feeling}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FeelingsSelect;
