import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: "lg",
        margin: 1,
        marginBottom: 2,
        backgroundColor: "purple",
        color: "white",
        fontSize: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
      onClick={handleFunction}
    >
      {user.username}
      <CloseIcon sx={{ paddingLeft: 1, color: "red" }} />
    </Box>
  );
};

export default UserBadgeItem;
