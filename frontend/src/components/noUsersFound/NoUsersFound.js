import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoUsersFound = ({ chats }) => {
  if (chats) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SearchOffIcon sx={{ fontSize: 100, color: "red" }} />
        <Typography variant="h5" gutterBottom>
          No Chats Found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Your search returned no chat results.
        </Typography>
      </div>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "500px",
        height: "200px",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 100, color: "red" }} />
      <Typography variant="h5" gutterBottom>
        No Users Found
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Your search returned no user results.
      </Typography>
    </Paper>
  );
};

export default NoUsersFound;
