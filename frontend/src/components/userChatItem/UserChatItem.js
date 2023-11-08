import React from "react";
import { Avatar, Typography } from "@mui/material";

const UserChatItem = ({ user }) => {
  return (
    <div
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",

        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <Avatar src={user?.profilePicture?.url} />
      <Typography style={{ marginLeft: "10px" }}>{user?.username}</Typography>
    </div>
  );
};

export default UserChatItem;
