import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { defaultProfilePic } from "../../context/users/UsersConstants";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        "&:hover": {
          backgroundColor: "#1775ee",
          color: "white",
        },
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        paddingX: 3,
        paddingY: 2,
        marginBottom: 2,
        borderRadius: "10px",
      }}
    >
      <Avatar
        sx={{
          marginRight: 2,
          width: 40,
          height: 40,
          cursor: "pointer",
        }}
        alt={user?.username}
        src={user?.profilePicture?.url || defaultProfilePic}
      />
      <Box>
        <Typography variant="body1">{user?.username}</Typography>
        <Typography variant="body2">
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
