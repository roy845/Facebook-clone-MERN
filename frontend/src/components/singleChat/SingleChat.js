import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Button as ButtonMui } from "@mui/material";
import { ArrowBackIcon, SearchIcon, AttachmentIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../utils/chatLogics";
import "../styles/styles.css";
import ScrollableChat from "../scrollableChat/ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { SendIcon } from "../../icons/icons";
import toast from "react-hot-toast";
import { useUser } from "../../context/users/UsersContext";
import { useAuth } from "../../context/auth/AuthContext";
import { useChat } from "../../context/chat/ChatContext";
import EmptyChatBox from "../emptyChatBox/EmptyChatBox";
// import RemoveUserFromBlockDialog from "../removeUserFromBlockDialog/RemoveUserFromBlockDialog";
import {
  createChatNotification,
  getAllChatMessages,
  removeUsersFromBlockedList,
  sendNewChatMessage,
} from "../../Api/ServerAPI";
// import {
//   chatBackgroundImage,
//   emptyChatBoxImage,
// } from "../../context/chat/ChatConstants";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { Link } from "react-router-dom";
import { useSocket } from "../../context/socket/SocketContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export let selectedChatCompare;
export const messageReceivedSound = new Audio("/audio/message_received.mp3");
export const messageSentSound = new Audio(
  "/audio/Whatsapp Message - Sent - Sound.mp3"
);

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { auth } = useAuth();
  const { activeUsers } = useUser();
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const {
    chatMessages,
    setChatMessages,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    isSoundEnabled,
  } = useChat();
  const [open, setOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPressedSend, setIsPressedSend] = useState(false);
  const [file, setFile] = useState(null);
  const [isInputOpenChat, setIsInputOpenChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typing, setTyping] = useState(false);

  const { socket, isTyping, socketConnected } = useSocket();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toggleChatInput = () => {
    setIsInputOpenChat(!isInputOpenChat);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setNewMessage((prevMessage) => prevMessage + emoji);
  };

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await getAllChatMessages(selectedChat._id);
      setChatMessages(data);
      setLoading(false);
      socket.emit("join messenger chat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to get Messages");
    }
  };

  const sendMessage = async (e) => {
    if ((e?.key === "Enter" && newMessage) || isPressedSend) {
      socket.emit("stop typing", selectedChat._id);
      const formData = new FormData();
      formData.append("sender", auth?.userInfo?._id);
      formData.append("content", newMessage);
      formData.append("chatId", selectedChat._id);

      if (file) {
        formData.append("file", file);
      }

      try {
        setNewMessage("");
        setFile(null);
        const { data } = await sendNewChatMessage(formData);
        socket.emit("new message", data);
        setChatMessages([...chatMessages, data]);
        if (isSoundEnabled) {
          messageSentSound.play();
        }
      } catch (error) {
        console.log(error);
        if (error?.response.status === 403) {
          toast.error(error?.response?.data);
          setOpen(true);
        }
        if (error?.response.status === 401) {
          toast.error(error?.response?.data);
        }
      }
      setIsPressedSend(false);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //Typing Indicator Logic
    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // const createNotificationFunc = async (newMessageReceived) => {
  //   try {
  //     const { data } = await createChatNotification({
  //       chat: newMessageReceived.chat._id,
  //       content: newMessageReceived.content,
  //       sender: newMessageReceived.sender._id,
  //     });
  //     return data;
  //   } catch (error) {
  //     toast.error("Failed to create Notification");
  //   }
  // };

  // useEffect(() => {
  //   const handleMessageReceived = (newMessageReceived) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //       // give notification
  //       if (!notification.includes(newMessageReceived)) {
  //         createNotificationFunc(newMessageReceived).then((res) => {
  //           setNotification([res, ...notification]);
  //         });
  //         if (isSoundEnabled) {
  //           messageReceivedSound.play();
  //         }

  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageReceived]);
  //       messageReceivedSound.play();
  //     }
  //   };

  //   socket?.on("message received", handleMessageReceived);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     socket?.off("message received", handleMessageReceived);
  //   };
  // }, [selectedChatCompare, notification, messages, fetchAgain]);

  const removeUserFromBlock = async () => {
    const userToUnblock = selectedChat?.users?.find((user) =>
      user?.blockedUsers?.includes(auth?.userInfo?._id)
    );

    try {
      const { data } = await removeUsersFromBlockedList([userToUnblock]);
      toast.success(data.message);

      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setNewMessage((prev) => `${prev} ${selectedFile.name}`);
      setFile(selectedFile);
    }
  };

  const searchMessages = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat && (
              <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Work sans"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex alignItems="center">
                  {/* Left section */}
                  <Link
                    to={`/profile/${getSender(
                      auth?.userInfo,
                      selectedChat.users
                    )}`}
                  >
                    <Avatar
                      name={getSender(auth?.userInfo, selectedChat.users)}
                      w="48px"
                      h="48px"
                      src={
                        getSenderFull(auth?.userInfo, selectedChat.users)
                          ?.profilePicture?.url || defaultProfilePic
                      }
                    />
                  </Link>
                  <Text fontWeight="bold" ml={2} mb={3}>
                    {getSender(auth?.userInfo, selectedChat.users)}
                  </Text>
                </Flex>

                {activeUsers?.find(
                  (user) =>
                    user?.userInfo?._id ===
                    getSenderFull(auth?.userInfo, selectedChat.users)?._id
                ) ? (
                  <div className="status">
                    <span className="indicator online"></span>
                    Online
                  </div>
                ) : (
                  <div className="status">
                    <span className="indicator offline"></span>
                    Offline
                  </div>
                )}

                <Flex alignItems="center">
                  {/* Right section */}
                  {isInputOpenChat ? (
                    <>
                      <IconButton
                        icon={<SearchIcon />}
                        onClick={toggleChatInput}
                      />
                      <Input
                        style={{ width: "auto", border: "solid black 1px" }}
                        type="search"
                        onBlur={toggleChatInput}
                        placeholder="Search Messages"
                        onChange={(e) => searchMessages(e)}
                      />
                    </>
                  ) : (
                    <IconButton
                      icon={<SearchIcon />}
                      onClick={toggleChatInput}
                    />
                  )}
                </Flex>
              </Text>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            backgroundImage={
              "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"
            }
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <ScrollableChat
                messages={chatMessages}
                searchQuery={searchQuery}
              />
            )}
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  addEmoji(e);
                }}
              />
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Flex alignItems="center">
                <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  🙂
                </Button>

                <Box ml={2}>
                  <Input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-input">
                    <Button
                      style={{ cursor: "pointer" }}
                      as="span"
                      leftIcon={
                        <AttachmentIcon style={{ cursor: "pointer" }} />
                      }
                    />
                  </label>
                </Box>

                <Input
                  variant="filled"
                  bg="#ffffff"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  flex="1"
                  style={{
                    height: "45px",
                    borderRadius: "30px",
                    padding: "10px 20px",
                  }}
                />

                {newMessage && (
                  <Button
                    onClick={() => {
                      setIsPressedSend(true);
                      sendMessage();
                    }}
                  >
                    <SendIcon />
                  </Button>
                )}
              </Flex>
            </FormControl>
          </Box>
        </>
      ) : (
        <EmptyChatBox />
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Remove User From Block</DialogTitle>

        <DialogContent>
          This user is blocked, you need to cancel the block of this user in
          order to send him a message
          <DialogActions>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonMui
                style={{ backgroundColor: "blue", color: "white" }}
                onClick={removeUserFromBlock}
              >
                Cancel Block
              </ButtonMui>
              <ButtonMui
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => setOpen(false)}
              >
                Close
              </ButtonMui>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SingleChat;
