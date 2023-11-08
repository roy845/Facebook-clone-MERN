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
import { createChat, sendNewChatMessage } from "../../../../Api/ServerAPI";
import toast from "react-hot-toast";
import { useSocket } from "../../../../context/socket/SocketContext";
import { useChat } from "../../../../context/chat/ChatContext";
import { messageSentSound } from "../../../../components/singleChat/SingleChat";

const PropertyDetailsSidebar = ({ property }) => {
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
    ? property?.description
    : `${property?.description?.slice(0, 150)}${
        property?.description?.length > 150 ? "..." : ""
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
          <Typography variant="h6">Apartment Details</Typography>
          <Divider />
          <Typography variant="subtitle1" mt={2}>
            <strong>Type:</strong> {property?.type}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Bedrooms:</strong> {property?.bedrooms}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Description:</strong> {descriptionToShow}
            {property?.description?.length > 150 && (
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
            <strong>Bathrooms:</strong> {property?.bathrooms}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Price:</strong>{" "}
            {formatPrice(property?.pricePerMonth, "Shekel")}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Address:</strong> {property?.address}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Date Available:</strong>{" "}
            {new Date(property?.dateAvailable).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Square Feet:</strong> {property?.propertySquareFeet}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Washing Machine:</strong> {property?.washingMachine}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Parking Type:</strong> {property?.parkingType}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Air Conditioning:</strong> {property?.airConditioning}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Heating Type:</strong> {property?.heatingType}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Cat Friendly:</strong>{" "}
            {property?.catFriendly ? "Yes" : "No"}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Dog Friendly:</strong>{" "}
            {property?.dogFriendly ? "Yes" : "No"}
          </Typography>

          {auth?.userInfo?._iproperty?.seller?._id && (
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
                <Link to={`/profile/${property?.seller?.username}`}>
                  <Avatar
                    src={
                      property?.seller?.profilePicture?.url || defaultProfilePic
                    }
                  />
                </Link>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  <strong>{property?.seller?.username}</strong>
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
                  {new Date(property?.seller?.createdAt).getFullYear()}
                </Typography>
              </Box>
            </Typography>
          )}
          {auth?.userInfo?._id !== property?.seller?._id && (
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
                  onClick={() => sendMessage(property?.seller?._id)}
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

export default PropertyDetailsSidebar;
