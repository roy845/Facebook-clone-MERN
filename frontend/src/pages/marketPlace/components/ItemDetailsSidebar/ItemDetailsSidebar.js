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
import { useChat } from "../../../../context/chat/ChatContext";
import toast from "react-hot-toast";
import { useSocket } from "../../../../context/socket/SocketContext";
import { messageSentSound } from "../../../../components/singleChat/SingleChat";

const ItemDetailsSidebar = ({ item }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [message, setMessage] = useState("");
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
    ? item?.description
    : `${item?.description?.slice(0, 150)}${
        item?.description?.length > 150 ? "..." : ""
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
          <Typography variant="h6">Product Details</Typography>
          <Divider />
          <Typography variant="subtitle1" mt={2}>
            <strong>Title:</strong> {item?.title}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Price:</strong> {formatPrice(item?.price, "Shekel")}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Description:</strong> {descriptionToShow}
            {item?.description?.length > 150 && (
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
            <strong>Category:</strong> {item?.category}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Sub Category:</strong> {item?.subcategory}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Condition:</strong> {item?.condition}
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            <strong>Location:</strong> {item?.location}
          </Typography>
          {auth?.userInfo?._id !== item?.seller?._id && (
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
                <Link to={`/profile/${item?.seller?.username}`}>
                  <Avatar
                    src={item?.seller?.profilePicture?.url || defaultProfilePic}
                  />
                </Link>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  <strong>{item?.seller?.username}</strong>
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
                  {new Date(item?.seller?.createdAt).getFullYear()}
                </Typography>
              </Box>
            </Typography>
          )}
          {auth?.userInfo?._id !== item?.seller?._id && (
            <Typography variant="subtitle1" mt={2}>
              <strong>
                <img src={messangerIcon} width="20px" height="20px" /> Send
                Message to Seller:
              </strong>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  placeholder={`שלום,${item?.seller?.username} האם פריט זה עדיין זמין?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                />
                <Button
                  variant="contained"
                  onClick={() => sendMessage(item?.seller?._id)}
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

export default ItemDetailsSidebar;
