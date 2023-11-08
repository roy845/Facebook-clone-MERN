import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useActivities from "../../hooks/useActivities";
import { FormControl, InputLabel } from "@mui/material";

const ActivitiesSelect = ({ setActivity }) => {
  const { activities, loading, error } = useActivities();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%", textAlign: "center" }}>
      <InputLabel id="city-label">Select an activity</InputLabel>
      <Select
        onChange={handleActivityChange}
        placeholder="Select an Activity"
        label="Select an Activity"
        fullWidth
      >
        {activities.map((activity) => (
          <MenuItem
            key={activity.id}
            value={activity.emoji + "-" + activity.activity}
          >
            {activity.emoji} - {activity.activity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ActivitiesSelect;
