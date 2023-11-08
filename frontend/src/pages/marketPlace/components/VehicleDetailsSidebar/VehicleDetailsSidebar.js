import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { formatPrice } from "../../../../utils/helpers";
import { Avatar, TextField } from "@mui/material";
import { defaultProfilePic } from "../../../../context/users/UsersConstants";
import { Link } from "react-router-dom";
import { messangerIcon } from "../../../../context/items/ItemsConstants";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useChat } from "../../../../context/chat/ChatContext";
import { createChat, sendNewChatMessage } from "../../../../Api/ServerAPI";
import toast from "react-hot-toast";
import { useSocket } from "../../../../context/socket/SocketContext";
import { messageSentSound } from "../../../../components/singleChat/SingleChat";

const VehicleDetailsSidebar = ({ vehicle }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [message, setMessage] = useState(""); // State for the message input
  const { auth } = useAuth();

  const {
    isSoundEnabled,
    // selectedChat,
    // setSelectedChat,
    chats,
    setChats,
    chatMessages,
    setChatMessages,
  } = useChat();

  const { socket } = useSocket();

  // Function to toggle the description expansion state
  const toggleDescriptionExpansion = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const sendMessage = async (userId) => {
    const { data: chat } = await createChat(userId);

    if (!chats?.find((c) => c._id === chat._id)) setChats([chat, ...chats]);

    const formData = new FormData();
    formData.append("sender", auth?.userInfo?._id);
    formData.append("content", message);
    formData.append("chatId", chat._id);

    try {
      setMessage("");

      const { data } = await sendNewChatMessage(formData);
      socket.emit("new message", data);
      setChatMessages([...chatMessages, data]);
      setMessage("");
      if (isSoundEnabled) {
        messageSentSound.play();
      }
    } catch (error) {
      console.log(error);
      if (error?.response.status === 403) {
        toast.error(error?.response?.data);
        // setOpen(true);
      }
      if (error?.response.status === 401) {
        toast.error(error?.response?.data);
      }
    }
    // setIsPressedSend(false);
  };

  // Display the full description if expanded, or truncate it with "See More" button
  const descriptionToShow = isDescriptionExpanded
    ? vehicle?.description
    : `${vehicle?.description?.slice(0, 150)}${
        vehicle?.description?.length > 150 ? "..." : ""
      }`;

  return (
    <Box
      sx={{
        width: 300,
        padding: 2,
      }}
    >
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h6">Vehicle Details</Typography>
          <Divider />
          <Typography variant="subtitle1" mt={2}>
            <strong>Type:</strong> {vehicle?.type}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Year:</strong> {formatPrice(vehicle?.year, "Shekel")}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Description:</strong> {descriptionToShow}
            {vehicle?.description?.length > 150 && (
              <Button
                onClick={toggleDescriptionExpansion}
                color="primary"
                size="small"
                sx={{ marginLeft: 1 }}
              >
                {isDescriptionExpanded ? "See Less" : "See More"}
              </Button>
            )}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Make:</strong> {vehicle?.make}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Model:</strong> {vehicle?.model}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Mileage:</strong> {vehicle?.mileage}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Location:</strong> {vehicle?.location}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Price:</strong> {vehicle?.price}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Body Style:</strong> {vehicle?.bodyStyle}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Condition:</strong> {vehicle?.condition}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Fuel Type:</strong> {vehicle?.fuelType}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Transmission:</strong> {vehicle?.transmission}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Minimal/No Damage:</strong>{" "}
            {vehicle?.cleanTitle ? "Yes" : "No"}
          </Typography>

          {auth?.userInfo?._id !== vehicle?.seller?._id && (
            <Typography variant="subtitle1" mt={2}>
              <strong>Seller Information:</strong>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <Link to={`/profile/${vehicle?.seller?.username}`}>
                  <Avatar
                    src={
                      vehicle?.seller?.profilePicture?.url || defaultProfilePic
                    }
                  />
                </Link>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  <strong>{vehicle?.seller?.username}</strong>
                </Typography>
                <img
                  src={PF + "facebook_icon.png"}
                  width="18"
                  height="18"
                  alt=""
                  style={{ marginTop: 10 }}
                />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  Joined Facebook in:{" "}
                  {new Date(vehicle?.seller?.createdAt).getFullYear()}
                </Typography>
              </Box>
            </Typography>
          )}
          {auth?.userInfo?._id !== vehicle?.seller?._id && (
            <Typography variant="subtitle1" mt={2}>
              <strong>
                <img src={messangerIcon} width="20px" height="20px" /> Send
                Message to Seller:
              </strong>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  placeholder="שלום, האם פריט זה עדיין זמין?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                />
                <Button
                  variant="contained"
                  onClick={() => sendMessage(vehicle?.seller?._id)}
                  color="primary"
                  size="small"
                >
                  Send
                </Button>
              </div>
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default VehicleDetailsSidebar;
